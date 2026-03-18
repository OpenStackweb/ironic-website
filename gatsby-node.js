const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const axios = require('axios')

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type MarkdownRemarkFrontmatter {
      category: [BlogCategory]
      author: String
      templateKey: String
      date: Date @dateformat
      title: String
      subTitle: String
      company: String
    }

    type BlogCategory {
      label: String
      id: String
    }

    type IronicRelease implements Node {
      version: String!
      releaseNotesUrl: String!
      publishedAt: Date @dateformat
      htmlUrl: String!
    }
  `

  createTypes(typeDefs)
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              category {
                label
              }
              author
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug.replace('/pages', ''),
        category: edge.node.frontmatter.category,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // category pages:
    let categories = []
    // Iterate through each post, putting all found categories into `categories`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.category`)) {
        categories = categories.concat(edge.node.frontmatter.category[0].label)
      }
    })
    // Eliminate duplicate categories
    categories = _.uniq(categories)

    // Make category pages
    categories.forEach(category => {
      const categoriePath = `/category/${_.kebabCase(category)}/`

      createPage({
        path: categoriePath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          category,
        },
      })
    })

    // author pages:
    let authors = []
    // Iterate through each post, putting all found authors into `authors`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.author`)) {
        authors = authors.concat(edge.node.frontmatter.author)
      }
    })
    // Eliminate duplicate categories
    authors = _.uniq(authors)

    // Make category pages
    authors.forEach(author => {
      const authorPath = `/author/${_.kebabCase(author)}/`

      createPage({
        path: authorPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          author,
        },
      })
    })
  })
}

async function getSeriesStatusData() {
  try {
    console.log('📋 Fetching OpenStack series status data...')
    const response = await axios.get('https://raw.githubusercontent.com/openstack/releases/master/data/series_status.yaml')

    // Simple YAML parsing for series data
    const yamlContent = response.data
    const seriesMatches = yamlContent.match(/- name: ([^\s]+)\s+release-id: ([^\s]+)/g)

    if (!seriesMatches) {
      throw new Error('Could not parse series status data')
    }

    const seriesData = {}
    const seriesOrder = []

    seriesMatches.forEach(match => {
      const nameMatch = match.match(/name: ([^\s]+)/)
      const idMatch = match.match(/release-id: ([^\s]+)/)

      if (nameMatch && idMatch) {
        const name = nameMatch[1]
        const releaseId = idMatch[1]
        seriesData[name] = releaseId
        seriesOrder.push(name) // This gives us newest-first order from the YAML
      }
    })

    console.log(`✅ Found ${Object.keys(seriesData).length} series in OpenStack data`)
    return { seriesData, seriesOrder }
  } catch (error) {
    console.log('⚠️  Could not fetch series status, using fallback data')
    // Fallback to known series if API fails
    const fallbackOrder = [
      'hibiscus', 'gazpacho', 'flamingo', 'epoxy', 'dalmatian', 'caracal',
      'bobcat', 'antelope', 'zed', 'yoga', 'xena', 'wallaby', 'victoria', 'ussuri'
    ]
    const fallbackData = {
      'hibiscus': '2026.2', 'gazpacho': '2026.1', 'flamingo': '2025.2', 'epoxy': '2025.1',
      'dalmatian': '2024.2', 'caracal': '2024.1', 'bobcat': '2023.2', 'antelope': '2023.1',
      'zed': '2022.2', 'yoga': '2022.1', 'xena': '2021.2', 'wallaby': '2021.1',
      'victoria': '2020.2', 'ussuri': '2020.1'
    }
    return { seriesData: fallbackData, seriesOrder: fallbackOrder }
  }
}

async function getLatestReleaseSeries() {
  try {
    console.log('🔍 Auto-detecting latest OpenStack release series...')

    // Get dynamic series data from OpenStack
    const { seriesData, seriesOrder } = await getSeriesStatusData()
    let knownSeries = seriesOrder

    console.log(`📋 Checking series in order: ${knownSeries.slice(0, 5).join(', ')}${knownSeries.length > 5 ? '...' : ''}`)

    // Try each series until we find one with ironic.yaml
    for (const series of knownSeries) {
      try {
        await axios.head(`https://raw.githubusercontent.com/openstack/releases/master/deliverables/${series}/ironic.yaml`)
        console.log(`✅ Found Ironic releases in series: ${series}`)
        return { series, seriesData }
      } catch (error) {
        // Series doesn't have ironic.yaml, try next
        continue
      }
    }

    throw new Error('No ironic.yaml found in any release series')
  } catch (error) {
    console.log('⚠️  Auto-detection failed, using known fallbacks')
    // Return known good series as fallbacks with basic mapping
    const fallbackData = {
      'gazpacho': '2026.1', 'epoxy': '2025.1', 'dalmatian': '2024.2', 'caracal': '2024.1'
    }
    return {
      series: ['gazpacho', 'epoxy', 'dalmatian', 'caracal'],
      seriesData: fallbackData
    }
  }
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  try {
    // Auto-detect the latest release series with dynamic version mapping
    const detectionResult = await getLatestReleaseSeries()
    let response
    let releaseSeries
    let seriesVersionMap

    if (Array.isArray(detectionResult.series)) {
      // Fallback mode - try known series
      console.log('🔄 Trying fallback series...')
      seriesVersionMap = detectionResult.seriesData
      for (const series of detectionResult.series) {
        try {
          response = await axios.get(`https://raw.githubusercontent.com/openstack/releases/master/deliverables/${series}/ironic.yaml`)
          releaseSeries = series
          break
        } catch (error) {
          continue
        }
      }
      if (!response) {
        throw new Error('All fallback series failed')
      }
    } else {
      // Auto-detection succeeded
      releaseSeries = detectionResult.series
      seriesVersionMap = detectionResult.seriesData
      response = await axios.get(`https://raw.githubusercontent.com/openstack/releases/master/deliverables/${releaseSeries}/ironic.yaml`)
    }

    // Parse YAML content (simple parsing for releases section)
    const yamlContent = response.data
    const releaseMatches = yamlContent.match(/- version: ([\d.]+)/g)
    if (!releaseMatches || releaseMatches.length === 0) {
      throw new Error('No releases found in YAML')
    }

    // Get the latest version (last one in the list)
    const latestVersionMatch = releaseMatches[releaseMatches.length - 1]
    const version = latestVersionMatch.replace('- version: ', '')

    // Extract git hash for the latest version to get actual release date
    let publishedAt = null
    try {
      // Find the git hash for this version
      const hashPattern = new RegExp(`- version: ${version.replace(/\./g, '\\.')}[\\s\\S]*?hash: ([a-f0-9]+)`, 'i')
      const hashMatch = yamlContent.match(hashPattern)

      if (hashMatch && hashMatch[1]) {
        const gitHash = hashMatch[1]
        console.log(`🔍 Found git hash for ${version}: ${gitHash.substring(0, 8)}...`)

        // Get commit date from GitHub API
        const commitResponse = await axios.get(`https://api.github.com/repos/openstack/ironic/commits/${gitHash}`)
        publishedAt = commitResponse.data.commit.committer.date
        console.log(`📅 Release date for ${version}: ${publishedAt}`)
      }
    } catch (error) {
      console.log(`⚠️  Could not fetch release date for ${version}: ${error.message}`)
    }

    // Generate release notes URL using dynamic series mapping
    let seriesVersion = seriesVersionMap[releaseSeries]
    if (!seriesVersion) {
      console.log(`⚠️  Unknown series '${releaseSeries}', using generic release notes URL`)
      seriesVersion = 'latest'
    }

    const releaseNotesUrl = seriesVersion === 'latest'
      ? `https://docs.openstack.org/releasenotes/ironic/latest.html#relnotes-${version.replace(/\./g, '-')}`
      : `https://docs.openstack.org/releasenotes/ironic/${seriesVersion}.html#relnotes-${version.replace(/\./g, '-')}`

    const nodeData = {
      version,
      releaseNotesUrl,
      publishedAt,
      htmlUrl: `https://github.com/openstack/releases/blob/master/deliverables/${releaseSeries}/ironic.yaml`,
      releaseSeries,
    }

    const nodeContent = JSON.stringify(nodeData)

    const nodeMeta = {
      id: createNodeId('ironic-latest-release'),
      parent: null,
      children: [],
      internal: {
        type: 'IronicRelease',
        content: nodeContent,
        contentDigest: createContentDigest(nodeData),
      },
    }

    const node = Object.assign({}, nodeData, nodeMeta)
    createNode(node)

    console.log(`✅ Fetched latest Ironic release: ${version} (${releaseSeries} series)`)
  } catch (error) {
    console.error('❌ Failed to fetch latest Ironic release:', error.message)
    // Fallback to current known version if all APIs fail
    const fallbackData = {
      version: '34.0.0',
      releaseNotesUrl: 'https://docs.openstack.org/releasenotes/ironic/latest.html#relnotes-34-0-0',
      publishedAt: null,
      htmlUrl: 'https://docs.openstack.org/releasenotes/ironic/',
      releaseSeries: 'fallback',
    }

    const nodeContent = JSON.stringify(fallbackData)
    const nodeMeta = {
      id: createNodeId('ironic-latest-release'),
      parent: null,
      children: [],
      internal: {
        type: 'IronicRelease',
        content: nodeContent,
        contentDigest: createContentDigest(fallbackData),
      },
    }

    const node = Object.assign({}, fallbackData, nodeMeta)
    createNode(node)

    console.log('⚠️  Using fallback version: 34.0.0')
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
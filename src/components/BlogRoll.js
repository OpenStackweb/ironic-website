import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery, Link } from 'gatsby'
import { kebabCase } from 'lodash'

const BlogRoll = ({ data, customFilter }) => {
  const { edges: posts } = data.allMarkdownRemark;

  const filteredPosts = useMemo(() => {
    if (!Array.isArray(posts))
      return []

    return posts.filter(({ node: post }) => (
      !customFilter ||
      post.frontmatter?.author === customFilter ||
      (Array.isArray(post.frontmatter?.category) && post.frontmatter?.category[0]?.label === customFilter)
    ))
  }, [customFilter, posts]);

  const renderPost = (post) => (
    <div className="article-excerpt" metalink="https://www.google.com/" key={post.id}>
      <h5 className="article-excerpt-title">
        <a href={post.fields.slug} className="">{post.frontmatter?.title}</a>
      </h5>
      <div className="article-excerpt-entry">
        <div>
          <p>{post.excerpt}</p>
        </div>
      </div>
      <div className="article-excerpt-meta">
        <p>
          By&nbsp;
          <Link to={`/author/${kebabCase(post.frontmatter?.author)}/`}>{post.frontmatter?.author}</Link>
          &nbsp;on&nbsp;
          {post.frontmatter?.date}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {!filteredPosts.length ?
        <div>There don't seem to be any posts that match.</div>
        :
        filteredPosts.map(({ node: post }) => renderPost(post))}
    </>
  )
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  customFilter: PropTypes.string,
}

export default ({ customFilter }) => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { frontmatter: { date: DESC } }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 200)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date (formatString: "DD/MM/YYYY", locale: "en_us")
                author
                category {
                  label
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} customFilter={customFilter} />}
  />
)

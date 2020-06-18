import React from 'react'
import PropTypes from 'prop-types'
import { withPrefix, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

import metadata from '../content/site-metadata.json'

export const DefaultPageTemplate = ({ seo, title, subTitle, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (

    <main className="main">
      {seo && 
      <Helmet title={seo.title ? seo.title : metadata.siteMetadata.title} titleTemplate={metadata.siteMetadata.titleTemplate}>        
        {seo.description && <meta name="description" content={seo.description} />}
        {seo.image && <meta name="image" content={`${withPrefix('/')}${seo.image.publicURL}`} />}        
        {seo.url && <meta property="og:url" content={seo.url} />}
        {seo.title && <meta property="og:title" content={seo.title} />}
        {seo.description && (
          <meta property="og:description" content={seo.description} />
        )}
        {seo.image && <meta property="og:image" content={`${withPrefix('/')}${seo.image.publicURL}`} />}
        <meta name="twitter:card" content="summary_large_image" />
        {seo.twitterUsername && (
          <meta name="twitter:creator" content={seo.twitterUsername} />
        )}        
        {seo.title && <meta name="twitter:title" content={seo.title} />}
        {seo.description && (
          <meta name="twitter:description" content={seo.description} />
        )}
        {seo.image && <meta name="twitter:image" content={`${withPrefix('/')}${seo.image.publicURL}`} />}          
      </Helmet>
      }
      <div className="top-green-line"></div> 
      <section className="hero-intro is-primary hero">
        <div className="hero-body">
          <div className="container container-thin">
            <div className="hero-content">
              <h3 className="hero-title">{title}</h3>
              <div className="hero-entry"><p>{subTitle}</p></div>
            </div>
          </div>
        </div>
      </section> 
      <section className="section section-article-simple">
        <div className="container container-thin">
          <div className="section-body">
            <article className="article-simple default-page">
              <PageContent className="content" content={content} />
            </article>
          </div> 
        </div>
      </section>
    </main>
  )
}

DefaultPageTemplate.propTypes = {
  seo: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const DefaultPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <DefaultPageTemplate
        seo={post.frontmatter.seo}
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        subTitle={post.frontmatter.subTitle}      
        content={post.html}
      />
    </Layout>
  )
}

DefaultPage.propTypes = {
  data: PropTypes.object.isRequired,
} 

export default DefaultPage

export const defaultPageQuery = graphql`
  query DefaultPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subTitle
        seo {
          title
          description
          url
          image {
            childImageSharp {
              fluid(maxWidth: 640, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL            
          }
          twitterUsername
        }
      }
    }
  }
`

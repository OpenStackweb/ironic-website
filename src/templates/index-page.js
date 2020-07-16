import React from "react";
import PropTypes from "prop-types";
import { withPrefix, graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import SupportBanner from "../components/SupportBanner";
import Header from "../components/Header";

import metadata from "../content/site-metadata.json";
import Mainpitch from "../components/Mainpitch";
import Promo from "../components/Promo";
import Features from "../components/Features";
// import Reviews from '../components/Reviews' -> Testimonial/quotes section
import NewsletterSubscribe from "../components/NewsletterSubscribe";

export const IndexPageTemplate = ({
  seo,
  header,
  mainpitch,
  promo,
  features,
  // review
}) => (
  <div>
    {seo && (
      <Helmet
        title={seo.title ? seo.title : metadata.siteMetadata.title}
        titleTemplate={metadata.siteMetadata.titleTemplate}
      >
        {seo.description && (
          <meta name="description" content={seo.description} />
        )}
        {seo.image && (
          <meta
            name="image"
            content={`${withPrefix("/")}${seo.image.publicURL}`}
          />
        )}
        {seo.url && <meta property="og:url" content={seo.url} />}
        {seo.title && <meta property="og:title" content={seo.title} />}
        {seo.description && (
          <meta property="og:description" content={seo.description} />
        )}
        {seo.image && (
          <meta
            property="og:image"
            content={`${withPrefix("/")}${seo.image.publicURL}`}
          />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        {seo.twitterUsername && (
          <meta name="twitter:creator" content={seo.twitterUsername} />
        )}
        {seo.title && <meta name="twitter:title" content={seo.title} />}
        {seo.description && (
          <meta name="twitter:description" content={seo.description} />
        )}
        {seo.image && (
          <meta
            name="twitter:image"
            content={`${withPrefix("/")}${seo.image.publicURL}`}
          />
        )}
      </Helmet>
    )}
    <Header
      title={header.title}
      subTitle={header.subTitle}
      image={header.image}
      buttons={header.buttons}
      display={header.display}
    />
    <Mainpitch mainpitch={mainpitch} />
    <Promo promo={promo} />
    <Features features={features} />
  </div>
);

IndexPageTemplate.propTypes = {
  seo: PropTypes.object,
  header: PropTypes.object,
  mainpitch: PropTypes.object,
  promo: PropTypes.object,
  features: PropTypes.object,
  review: PropTypes.object,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        seo={frontmatter.seo}
        header={frontmatter.header}
        mainpitch={frontmatter.mainpitch}
        promo={frontmatter.promo}
        features={frontmatter.features}
        review={frontmatter.review}
      />
      <NewsletterSubscribe />
      <SupportBanner />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
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
        header {
          display
          title
          subTitle {
            text
          }
          buttons {
            text
            link
          }
        }
        mainpitch {
          display
          title
          description {
            text
          }
        }
        promo {
          display
          title
          description {
            text
          }
          button {
            text
            link
          }
        }
        features {
          display
          title
          rows {
            title
            text
          }
        }
        review {
          title
          text
          opinions {
            person
            title
            company
            opinion
          }
          bottom {
            text
            button {
              text
              link
            }
          }
          display
        }
      }
    }
  }
`;

import React from "react"
import PropTypes from 'prop-types'
import { graphql } from "gatsby"

import Img from "gatsby-image"

import Layout from "../components/layout"
import EcritPar from "../components/ecritPar"
import SEO from "../components/seo"

const AboutPageTemplate = ({ data }) => {

  const { title, image } = data.markdownRemark.frontmatter
  const __html = data.markdownRemark.html

  return (
    <Layout page="2">
      <SEO title={title} />
      <h1>{title}</h1>
      <Img fluid={image.childImageSharp.fluid} alt={title}></Img>
      <div dangerouslySetInnerHTML={{ __html }} />
      <EcritPar />
    </Layout>


  );
}

AboutPageTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export const pageQuery = graphql`
query AboutPage {
  markdownRemark(frontmatter: { slug: { eq: "about" } }) {
      html
      frontmatter {
        title
        heading
        image {
          childImageSharp {
            fluid(maxWidth: 1400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
  `
export default AboutPageTemplate

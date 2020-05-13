import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import EcritPar from "../components/ecritPar"
import SEO from "../components/seo"

const AboutPage = ({data}) => (
  
  <Layout page="2">
    <SEO title="À propos" />
    <h1>{data.markdownRemark.frontmatter.title}</h1>
    <p> Bonjour, je suis le créateur de ce blog, et voici mon histoire : <br/>
        ...Insérez ici une histoire stylée...
    </p>
    <EcritPar />
  </Layout>


)

AboutPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export const pageQuery = graphql`
query AboutPage {
  markdownRemark(frontmatter: { templateKey: { eq: "index" } }) {
      html
      frontmatter {
        title
        image
        heading
      }
    }
  }
  `
  export default AboutPage
  
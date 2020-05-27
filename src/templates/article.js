import React from 'react';

import Layout from "../components/layout"
import EcritPar from "../components/ecritPar"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"

import { Button, Divider } from "antd"
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const ButtonGroup = Button.Group

/**
 * Composant permettant d'afficher un article
 */

const Article = ({ data, pageContext }) => {
  const { title, date } = data.markdownRemark.frontmatter
  const __html = data.markdownRemark.html
  const { prev, next } = pageContext

  return (
    <Layout>
      <SEO title={title} description={data.markdownRemark.excerpt} />
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html }} />
      <EcritPar />
      <Divider />
      <ButtonGroup>
        {next && (
          <Button type="primary" size="large">
            <Link to={next.frontmatter.slug}>
              <LeftOutlined />
              {next.frontmatter.title}
            </Link>
          </Button>
        )}
        {prev && (
          <Button type="primary" size="large">
            <Link to={prev.frontmatter.slug}>
              {prev.frontmatter.title}
              <RightOutlined />
            </Link>
          </Button>
        )}
      </ButtonGroup>
    </Layout>
  );
}


export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
`

export default Article;
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { List, Divider } from "antd"

const IndexPage = ({ data }) => (
  <Layout page="1">
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

    {/* ça serait cool d'implementer une List avec Antd lorsque ça fonctionnera */}
    {/* {data.allMarkdownRemark.edges.map(({ node }) =>
      <div key={node.id}>
        <span style={{ fontSize: "2rem" }}>
          <Link to={node.frontmatter.slug}>{node.frontmatter.title}</Link>
        </span>
        <p style={{ paddingTop: "16px", lineHeight: "1.25" }}>{node.excerpt}</p>
        <Divider />
      </div>
    )} */}

    <List
      itemLayout="horizontal"
      dataSource={data.allMarkdownRemark.edges}
      renderItem={({ node }) => (
        <List.Item extra=<Link to={node.frontmatter.slug}>Lire plus</Link>>
          <List.Item.Meta
            title={
              <span style={{ fontSize: "2rem" }}>
                <Link to={node.frontmatter.slug}>{node.frontmatter.title}</Link>
              </span>
            }
            description={
              <p style={{ paddingTop: "16px", lineHeight: "1.25" }}>
                {node.excerpt}
              </p>
            }
          />
        </List.Item>
      )}
    />

  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage

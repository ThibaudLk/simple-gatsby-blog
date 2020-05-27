/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import StyledPlaceholder from "./placeholder"

import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, HeartTwoTone, CaretDownOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const { SubMenu } = Menu;

const LayoutPerso = ({ children, page }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author
        }
      }
      allMarkdownRemark(
        filter: { fileAbsolutePath: { glob: "**/mdArticles/*.md" } }
        sort: { fields: [frontmatter___date], order: DESC }
        ) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "DD MMMM, YYYY")
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Layout style={{ minHeight: "100vh" }}>

      <Header style={{ position: 'fixed', zIndex: 1000, width: '100%' }}>
        <Menu style={{ textAlign: "center" }} mode="horizontal" defaultSelectedKeys={[page]}>
          <Menu.Item key="1">
            <Link to="/">
              <HomeOutlined style={{ marginRight: 10 }} />
              <span>Accueil</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about">
              {<UserOutlined style={{ marginRight: 10 }} />}
              <span>À propos</span>
            </Link>
          </Menu.Item>
          <SubMenu icon={<CaretDownOutlined style={{ marginRight: 10 }} />} title="Articles">
            <Menu.ItemGroup title="Articles">
              {data.allMarkdownRemark.edges.map(({ node }) =>
                <Menu.Item key={node.id}><Link to={node.frontmatter.slug}>{node.frontmatter.title}</Link></Menu.Item>
              )}
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item style={{ float: "right" }}>
            <a href={`https://twitter.com/`} title="Mon compte Twitter" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined />
            </a>
          </Menu.Item>
          <Menu.Item style={{ float: "right" }}>
            <a href={`https://instagram.com/`} title="Mon compte Instagram" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined />
            </a>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ marginTop: 64 }}>
        <StyledPlaceholder>
          <p className="h1 text-white text-center">{data.site.siteMetadata.title}</p>
        </StyledPlaceholder>
        <div className="site-layout-background" style={{ padding: 24, backgroundColor: "white", minHeight: 360 }}>
          {children}
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Un Blog de type classique dirons-nous.<br />
        Made with <HeartTwoTone twoToneColor="#eb2f96" /> by {data.site.siteMetadata.author}.
      </Footer>
    </Layout>
  )
}

LayoutPerso.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutPerso

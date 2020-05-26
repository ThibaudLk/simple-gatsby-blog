// Ce fichier permet de générer les pages au build de Gatsby
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const articleTemplate = path.resolve(`./src/templates/article.js`)

  const articlesQuery = graphql(`
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { glob: "**/mdArticles/*.md" } }
          sort: { fields: [frontmatter___date], order: DESC }
          ) {
          edges {
            node {
              frontmatter {
                slug
                title
              }
            }
          }
        }
      }
  `).then(result => {
    console.log(JSON.stringify(result, null, 2))
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const prev = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.frontmatter.slug,
        component: articleTemplate,
        context: {
          slug: post.node.frontmatter.slug,
          next,
          prev,
        },
      })
    })
  })

  const pagesQuery = graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { glob: "**/mdPages/*.md" } }
        ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    console.log(JSON.stringify(result, null, 2))

    // Pour chaque markdown on créé la page qui lui est associée
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.slug)}.js`
        ),
        context: {}, // additional data can be passed via context
      })
    })
  })

  return Promise.all([articlesQuery, pagesQuery]);

}

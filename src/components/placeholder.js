import React from "react"
import { graphql, StaticQuery } from "gatsby"
import BackgroundImage from 'gatsby-background-image'
import styled from 'styled-components'

/**
 * Un placeholder qui prend toute la largeur de la page
 * Il prend l'image nommée placeholder.jpg du dossier images
 */


const Placeholder = ({ className, children }) => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: {eq: "placeholder.jpg"}) {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => (
      <BackgroundImage
        Tag="section"
        className={className}
        fluid={data.placeholderImage.childImageSharp.fluid}
      >
        {children}
      </BackgroundImage>
    )}
  />
)
const StyledPlaceholder = styled(Placeholder)`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: normal;
  flex-direction: column;
  justify-content: space-around;
  border: "1px solid black";
  z-index: 104;
`

export default StyledPlaceholder

// import PropTypes from "prop-types"
import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

import { List, Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

/** 
 * Component qui permet d'afficher l'auteur en fin d'article
 * => à rendre personalisable par la suite
**/
const EcritPar = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            author
          }
        }
      }
    `}
    render={data => (
      <div>
        <Divider orientation="left">
          Auteur
        </Divider>
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar size={64} icon={<UserOutlined />} />
            }
            title={<Link to="/about">{data.site.siteMetadata.author}</Link>}
            description="Dev JS | Créateur | Inspecteur"
          />
        </List.Item>
      </div>
    )}
  />
)


// EcritPar.propTypes = {
//   prenom: PropTypes.string,
//   nom: PropTypes.string,
// }

export default EcritPar

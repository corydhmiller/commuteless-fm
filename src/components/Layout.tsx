import React from "react"
import { Link } from "gatsby"
import "../styles/app.scss"
import "../styles/header.scss"
import styled from "styled-components"
// import { myContext } from "../../wrap-root-element";

const Header = styled.div``

interface LayoutProps {
  location: string
  title?: string
  children?: any
}

class Layout extends React.Component<LayoutProps> {
  render() {
    const {
      //  location,
      title,
      children,
    } = this.props

    return (
      <>
        <Header className="header-wrap">
          <div style={{ maxWidth: 1180 }}>
            <h1
              style={{
                marginTop: 0,
              }}
            >
              <Link
                style={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `inherit`,
                }}
                to={`/`}
              >
                {title}
              </Link>
            </h1>
          </div>
        </Header>
        <main>
          {children}
          <footer>© {new Date().getFullYear()}. All rights reserved.</footer>
        </main>
      </>
    )
  }
}

export default Layout

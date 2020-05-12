import React from "react"
import "../styles/app.scss"
import "../styles/header.scss"

interface LayoutProps {
  location: string
  title?: string
  children?: any
}

class Layout extends React.Component<LayoutProps> {
  render() {
    const { children } = this.props

    return (
      <>
        <main>
          {children}
          <footer>© {new Date().getFullYear()}. All rights reserved.</footer>
        </main>
      </>
    )
  }
}

export default Layout

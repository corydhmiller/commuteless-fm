import React from 'react'
import styled from 'styled-components'

export default styled(Footer)`
  text-align: center;
`

function Footer(props: any) {
  return (
    <footer {...props}>
      <p>All content for Commuteless &copy; {(new Date().getFullYear())}. All rights reserved.</p>
      <p>
        <a
          href="https://github.com/corydhmiller/commuteless-fm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contribute on GitHub
        </a>
      </p>
    </footer>
  )
}

import React from 'react'
import styled from 'styled-components'

export default styled(Footer)`
  text-align: center;
`

function Footer(props: any) {
  return (
    <footer {...props}>
      <p style={{opacity:.6}}>
        All content for Commuteless &copy; {new Date().getFullYear()} - Present. All
        rights reserved.
      </p>
    </footer>
  )
}

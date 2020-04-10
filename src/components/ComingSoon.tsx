import React, { Component } from 'react'
import styled from 'styled-components'
// import { render } from 'react-dom'

const CSDiv = styled('div')`
  max-width: 720px;
  padding: 0 2rem;
`
const AHeader = styled('header')`
  flex-wrap: wrap;
  display: flex;
`
const Paragraph = styled('p')``

const ScriptDiv = styled('div')`
  margin: 3rem 0;
`

class ComingSoon extends Component {
  componentDidMount() {
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://kyle-adams.ck.page/6410ba2622/index.js'
    script.setAttribute('data-uid', '6410ba2622')
    document.getElementById('script_div').appendChild(script)
  }
  render() {
    return (
      <AHeader>
        <CSDiv id="coming_soon">
          <Paragraph>
            Welcome to Commuteless, 
            <strong>
              a show about working from home with less stress and more freedom
              so you can live life on your terms.
            </strong>
          </Paragraph>
          <Paragraph>
            We're still in the recording phase of this podcast, but we'll be
            launching our first few episodes very soon!
          </Paragraph>
          <Paragraph>
            Until then, we've put together some resources for you to help
            improve your working from home experience.
          </Paragraph>
          <ScriptDiv id="script_div"></ScriptDiv>
        </CSDiv>
      </AHeader>
    )
  }
}

export default ComingSoon

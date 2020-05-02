import React, { Component } from 'react'
import styled from 'styled-components'

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
    return <ScriptDiv id="script_div"></ScriptDiv>
  }
}

export default ComingSoon

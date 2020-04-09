import React from 'react'
import styled from 'styled-components'

export default ComingSoon


const CSDiv = styled('div')`
max-width: 720px;
`
const AHeader = styled('header')`
  flex-wrap: wrap;
  display: flex;
`
function ComingSoon() {
  return (
    <AHeader>
      <CSDiv>
        <p>Welcome to Commuteless, <strong>a show about working from home with less stress and more freedom so you can live life on your terms.</strong></p>
        <p>We're still in the recording phase of this podcast, but we'll be launching our first few episodes very soon!</p>
        <p>Until then, we've put together some resources for you to help improve your working from home experience.</p>
        <p><em>Insert form here...</em></p>
      </CSDiv>
    </AHeader>
  )
}

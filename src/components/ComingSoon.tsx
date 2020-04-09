import React from 'react'
import styled from 'styled-components'

export default ComingSoon



const CSDiv = styled('div')`
max-width: 720px;
padding:0 2rem;
`
const AHeader = styled('header')`
  flex-wrap: wrap;
  display: flex;
`
const Paragraph = styled('p')``

function ComingSoon() {
  return (
    <AHeader>
      <CSDiv>
        <Paragraph>Welcome to Commuteless, <strong>a show about working from home with less stress and more freedom so you can live life on your terms.</strong></Paragraph>
        <Paragraph>We're still in the recording phase of this podcast, but we'll be launching our first few episodes very soon!</Paragraph>
        <Paragraph>Until then, we've put together some resources for you to help improve your working from home experience.</Paragraph>
        <Paragraph><em>Insert form here...</em></Paragraph>
      </CSDiv>
    </AHeader>
  )
}

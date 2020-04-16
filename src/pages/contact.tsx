import React from 'react'

import { withSiteData } from 'react-static'
import Footer from '@src/components/Footer'

import styled from 'styled-components'

const Main = styled('main')`
  display: flex;
  flex-wrap: wrap;
  padding:0 1rem;
`

export default withSiteData(
  ({}) => {
    return (
      <>
        
        <Main>
          HERRO
        </Main>
        <Footer />
      </>
    )
  },
)

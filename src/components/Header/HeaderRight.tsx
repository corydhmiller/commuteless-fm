import React from 'react'
import styled from 'styled-components'

const HRDiv = styled('div')`
  flex: 1 1 0;
  display: flex;
  padding: 1rem 2rem;
  flex-direction: column;
  justify-content: center;
  img {
    max-width: 80px;
    max-height: 80px;
    border-radius: 50%;
    float: left;
    margin-right: 20px;
    border: 3px solid #fff;
  }
  * {
    margin: 0;
  }
`

const HostDiv = styled('div')`
display: flex; 
flex-grow: 1; 
align-items: center;
justify-content: center;
padding: 20px
`
export default function HeaderRight() {
  return (
    <HRDiv>
      <div id="hosts" style={{ display: 'flex' }}>
        <HostDiv>
          <img
            src="https://pbs.twimg.com/profile_images/1198467933221064704/IoP19MdS_400x400.jpg"
            alt="Kyle Adams"
          />
          <div>
            <h3>Kyle Adams</h3>
            <a
              target="_blank"
              href="https://twitter.com/itskyleadams"
              rel="noopener noreferrer"
            >
              @itskyleadams
            </a>
          </div>
          </HostDiv>

        <HostDiv>
          <img
            src="https://pbs.twimg.com/profile_images/834494800837672968/mEcsko5C_400x400.jpg"
            alt="Cory Miller"
          />
          <div>
            <h3>Cory Miller</h3>
            <a
              target="_blank"
              href="https://twitter.com/corydhmiller"
              rel="noopener noreferrer"
            >
              @corydhmiller
            </a>
          </div>
        </HostDiv>
      </div>
    </HRDiv>
  )
}

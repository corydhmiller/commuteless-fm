import React from 'react'
import styled from 'styled-components'

const HRDiv = styled('div')`
  padding: 1rem 2rem;
  flex-direction: column;
  justify-content: center;
  * {
    margin: 0;
  }
  `
  
  const HostsDiv = styled('div')`
    img {
      max-width: 80px;
      max-height: 80px;
      border-radius: 50%;
      float: left;
      margin-right: 20px;
      border: 3px solid #fff;
    }
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`

const HostDiv = styled('div')`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`
export default function HeaderRight() {
  return (
    <HRDiv>
        <p style={{ textAlign: 'center' }}>Hosted By</p>
      <HostsDiv id="hosts">
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
      </HostsDiv>
    </HRDiv>
  )
}

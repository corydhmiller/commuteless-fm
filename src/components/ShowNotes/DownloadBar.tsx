import React from 'react'
import styled from 'styled-components'
import { Episode } from '../../types'
import { withSiteData } from 'react-static'

const StyledDiv = styled('div')`
  display: flex;
  font-size: 0.8rem;
  justify-content: space-between;
  @media (max-width: 650px) {
    flex-direction: column-reverse;
  }
  .button {
    border: 0;
    background: #f9f9f9;
    color: #1d1d1d;
    line-height: 1;
    padding: 1rem;
    display: inline-block;
    transition: all 0.2s;
  }
  .icon {
    border-right: 1px solid #e4e4e4;
    padding-right: 0.5rem;
    margin-right: 0.5rem;
  }
  #date {
    margin-top: 0;
    text-align: right;
    color: #666;
    font-size: 1.2rem;
  }
`

export type DownloadBarProps = { curEp: Episode }
export const DownloadBar: React.FC<DownloadBarProps> = ({ curEp }) => {
  const formattedDate = new Date(
    Date.parse(curEp.frontmatter.date),
  ).toLocaleDateString('en-US', { timeZone: 'Etc/UTC' })

  //   const [Bool, setBool] = React.useState(true)
  //   React.useEffect(() => {}, [])
  return (
    <StyledDiv>
      <a className="button" download="" href={curEp.frontmatter.libsynURL}>
        Download MP3
      </a>
      <p id="date">{formattedDate}</p>
    </StyledDiv>
  )
}

export default withSiteData(DownloadBar)

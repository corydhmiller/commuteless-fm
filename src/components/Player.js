import React, { Component } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import '../styles/_player.scss'

const formatTime = timeInSeconds => {
  const hours = Math.floor(timeInSeconds / (60 * 60))
  timeInSeconds -= hours * 60 * 60
  const minutes = Math.floor(timeInSeconds / 60)
  timeInSeconds -= minutes * 60

  // If the number is less than 10, add a 0 to the beginning using padStart
  const leftPad = num => `${num}`.padStart(2, '0')
  const str =
    (hours ? `${leftPad(hours)}:` : '') +
    // (minutes ? `${leftPad(minutes)}:` : '00') +
    `${leftPad(minutes)}:` +
    leftPad(Math.round(timeInSeconds))
  return str
}

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      audioLoaded: false,
      progressTime: 0,
      playing: false,
      duration: 0,
      currentTime: 0,
      // playbackRate: 1,
      showTooltip: false,
      tooltipPosition: 0,
      tooltipTime: '0:00',
      volumeLevel: 100,
    }
    this.audio = React.createRef()
    this.progress = React.createRef()

    // Handle event binds
    this.togglePlayPause = this.togglePlayPause.bind(this)
    this.timeUpdate = this.timeUpdate.bind(this)
    this.scrub = this.scrub.bind(this)
    this.changeVolume = this.changeVolume.bind(this)
  }

  togglePlayPause() {
    // This is a toggle, so we're going to invert the existing isPlaying state
    this.setState(prevState => ({
      isPlaying: !prevState.isPlaying,
    }))
    // Now we need to call the pause or play method on the audio element depending on the state.
    const status = this.state.isPlaying ? 'pause' : 'play'
    this.audio.current[status]()
  }

  timeUpdate() {
    // Set up current time and duration vars against the audio element
    const { currentTime = 0, duration = 1 } = this.audio.current

    // Progress time ends up being a percentage, so we'll do the math to figure out where we land
    const progressTime = (currentTime / duration) * 100

    // If all of this isn't returning a number, get out.
    if (Number.isNaN(progressTime)) return

    // Otherwise, update componenet state with current time, duration, and progress
    this.setState(() => ({
      audioLoaded: true,
      currentTime: this.audio.current.currentTime,
      duration: this.audio.current.duration,
      progressTime: progressTime,
    }))
  }

  scrub(event) {
    this.audio.current.currentTime = +this.scrubTime(event)
  }

  scrubTime(eventData) {
    return (
      (eventData.nativeEvent.offsetX / this.progress.current.offsetWidth) *
      this.audio.current.duration
    )
  }
  changeVolume(event) {
    const __Slider = event.currentTarget
    const volume = +__Slider.value / 100
    this.setState(() => ({
      volumeLevel: +__Slider.value
    }))
    this.audio.current.volume = volume
  }

  render() {
    // Store episode as var
    const episode = this.props.episode

    return (
      
      <div className="player">
        <div className="player__section player__section--left">
          <button
            onClick={this.togglePlayPause}
            aria-label={this.state.isPlaying ? 'pause' : 'play'}
            type="button"
            className={`${this.state.isPlaying ? 'playing' : 'paused'}`}
          >
            <div className="player__icon">
              {this.state.isPlaying ? <FaPause /> : <FaPlay />}
            </div>
          </button>

          <audio
            ref={this.audio}
            onTimeUpdate={this.timeUpdate}
            onLoadedMetadata={this.timeUpdate}
            src={episode.audiourl}
            preload="metadata"
          />
        </div>

        <div className="player__section player__section--middle">
          <div style={{ opacity: 0.7, marginBottom: '10px' }}>
            {episode.title}
          </div>
          <div
            className={`progress ${
              this.state.isPlaying ? 'playing' : 'paused'
            }`}
            onClick={this.scrub}
            // onMouseMove={seekTime}
            // onMouseEnter={() => {
            //   setState({ showTooltip: true })
            // }}
            // onMouseLeave={() => {
            //   setState({ showTooltip: false })
            // }}
            ref={this.progress}
          >
            <div
              className="progress__time"
              style={{ width: `${this.state.progressTime}%` }}
            />
          </div>
          <div style={{ opacity: 0.7 }}>
            {// Simple ternary: has the audio loaded yet?
            this.state.audioLoaded
              ? // If so, display the time as `XX:XX | YY:YY`
                `${formatTime(this.state.currentTime)} | ${formatTime(
                  this.state.duration
                )}`
              : // If not loaded yet, indicate we're loading
                'loading...'}
          </div>
        </div>

        <div className="player__section player__section--right">
          <div className="player__volume">
            <svg
              width="38"
              height="30"
              viewBox="0 0 38 31"
              style={{
                display: 'inline-block',
                width: 38,
                height: 25,
                strokeWidth: 0,
              }}
            >
              <path
                className="path1"
                d="M22.485 25.985c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 4.094-4.094 4.094-10.755 0-14.849-0.586-0.586-0.586-1.536 0-2.121s1.536-0.586 2.121 0c2.55 2.55 3.954 5.94 3.954 9.546s-1.404 6.996-3.954 9.546c-0.293 0.293-0.677 0.439-1.061 0.439v0zM17.157 23.157c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 2.534-2.534 2.534-6.658 0-9.192-0.586-0.586-0.586-1.536 0-2.121s1.535-0.586 2.121 0c3.704 3.704 3.704 9.731 0 13.435-0.293 0.293-0.677 0.439-1.061 0.439z"
              ></path>
              <path
                className="path2"
                d="M13 30c-0.26 0-0.516-0.102-0.707-0.293l-7.707-7.707h-3.586c-0.552 0-1-0.448-1-1v-10c0-0.552 0.448-1 1-1h3.586l7.707-7.707c0.286-0.286 0.716-0.372 1.090-0.217s0.617 0.519 0.617 0.924v26c0 0.404-0.244 0.769-0.617 0.924-0.124 0.051-0.254 0.076-0.383 0.076z"
              ></path>
            </svg>
            <div className="slider-container">
              <input
                onChange={this.changeVolume}
                className="volume-slider"
                type="range"
                name="volume"
                min="0"
                max="100"
                step="1"
                value={this.state.volumeLevel}
                id="range-slider-input"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Player

// import React from 'react'
// import { FaPlay, FaPause } from 'react-icons/fa'
// // import { formatTime } from '../utils/formatTime'
// import { Episode } from '../types'

// import { withRouteData } from 'react-static'

// function usePrevious<T>(value: T) {
//   const ref = React.useRef(value)
//   React.useEffect(() => {
//     ref.current = value
//   })
//   return ref.current
// }
// type ShowProps = {
//   number: number
//   displayNumber: string
//   title: string
//   /** url of the mp3 of the show */
//   url: string
// }

// export default ({ mostRecentEpisode }: { mostRecentEpisode: Episode }) => {
//   const Comp = withRouteData(Player(mostRecentEpisode))
//   return <Comp />
// }

// type Props = { content?: Episode }

// const Player = (mostRecentEpisode: Episode) => ({ content }: Props) => {
//   const curEp = content || mostRecentEpisode
//   if (!curEp) return 'no content'
//   const show: ShowProps = {
//     number: curEp.frontmatter.episode,
//     displayNumber: '' + curEp.frontmatter.episode,
//     title: curEp.frontmatter.title,
//     url: `${curEp.frontmatter.audiourl}`,
//   }
//   let lastPlayed = 0

// const timeUpdate = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
//   const { timeWasLoaded } = state
//   // Check if the user already had a current time
//   if (timeWasLoaded) {
//     const lp = localStorage.getItem(`lastPlayed${show.number}`)
//     if (lp) {
//       e.currentTarget.currentTime = JSON.parse(lp).lastPlayed
//     }
//     setState({ timeWasLoaded: false })
//   } else {
//     const { currentTime = 0, duration = 1 } = e.currentTarget

//     const progressTime = (currentTime / duration) * 100
//     if (Number.isNaN(progressTime)) return
//     setState({ progressTime, currentTime, duration })
//   }
// }

// const togglePlay = () => {
//   const method = playing ? 'pause' : 'play'
//   audio.current[method]()
// }

//   const scrubTime = (eventData: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
//     (eventData.nativeEvent.offsetX / progress.current.offsetWidth) *
//     audio.current.duration

//   const scrub = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     audio.current.currentTime = +scrubTime(e)
//   }

//   const seekTime = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     setState({
//       tooltipPosition: e.nativeEvent.offsetX,
//       tooltipTime: formatTime(scrubTime(e)),
//     })
//   }

//   const volume: React.ChangeEventHandler<HTMLInputElement> = (e) => {
//     const __Slider = e.currentTarget
//     const volume = +__Slider.value / 100
//     setState({ volumeLevel: +__Slider.value })
//     audio.current.volume = volume
//   }

//   return (
//     <div className="player">
//       <div className="player__section player__section--left">
//         <button
//           onClick={togglePlay}
//           aria-label={playing ? 'pause' : 'play'}
//           type="button"
//           className={`${playing ? 'playing' : 'paused'}`}
//         >
//           <p className="player__icon">{playing ? <FaPause /> : <FaPlay />}</p>
//         </button>
//       </div>

//       <div className="player__section player__section--middle">
//         <div style={{ opacity: 0.7, marginBottom: '10px', marginLeft: '10px' }}>
//           <em>Playing Now:</em> {curEp.frontmatter.title}
//         </div>
//         {/* eslint-disable */}
//         <div
//           className={`progress ${playing ? 'playing' : 'paused'}`}
//           onClick={scrub}
//           onMouseMove={seekTime}
//           onMouseEnter={() => {
//             setState({ showTooltip: true })
//           }}
//           onMouseLeave={() => {
//             setState({ showTooltip: false })
//           }}
//           ref={progress}
//         >
//           {/* eslint-enable */}
//           <div
//             className="progress__time"
//             style={{ width: `${progressTime}%` }}
//           />
//         </div>
//         <div
//           className="player__tooltip"
//           style={{
//             left: `${tooltipPosition}px`,
//             opacity: showTooltip ? 1 : 0,
//           }}
//         >
//           {tooltipTime}
//         </div>
//         <div style={{ opacity: 0.7, marginTop: '10px', marginLeft: '10px' }}>
//           {formatTime(currentTime)} / {formatTime(duration)}
//         </div>
//       </div>

//       {/* eslint-disable */}
//       <audio
//         ref={audio}
//         onPlay={togglePlayPause}
//         onPause={togglePlayPause}
//         onTimeUpdate={timeUpdate}
//         onLoadedMetadata={timeUpdate}
//         onDurationChange={
//           (e) => console.log('duration', e.currentTarget.duration)
//           // this never seems to get called
//         }
//         src={show.url}
//         preload="none"
//       />
//       {/* eslint-enable */}
//     </div>
//   )
// }

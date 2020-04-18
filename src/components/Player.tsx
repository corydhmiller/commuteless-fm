import React from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
// import { formatTime } from '../utils/formatTime'
import { Episode } from '../types'

import { withRouteData } from 'react-static'

function usePrevious<T>(value: T) {
  const ref = React.useRef(value)
  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}
type ShowProps = {
  number: number
  displayNumber: string
  title: string
  /** url of the mp3 of the show */
  url: string
}

export default ({ mostRecentEpisode }: { mostRecentEpisode: Episode }) => {
  const Comp = withRouteData(Player(mostRecentEpisode))
  return <Comp />
}

type Props = { content?: Episode }

const Player = (mostRecentEpisode: Episode) => ({ content }: Props) => {
  const curEp = content || mostRecentEpisode
  if (!curEp) return 'no content'
  const show: ShowProps = {
    number: curEp.frontmatter.episode,
    displayNumber: '' + curEp.frontmatter.episode,
    title: curEp.frontmatter.title,
    url: `${curEp.frontmatter.libsynURL}`,
  }
  let lastPlayed = 0
  // // for SSR
  // if (typeof window !== 'undefined') {
  //   const { show } = this.props
  //   const lp = localStorage.getItem(`lastPlayed${show.number}`)
  //   // eslint-disable-next-line
  //   if (lp) lastPlayed = JSON.parse(lp).lastPlayed
  // }
  const [state, _setState] = React.useState({
    progressTime: 1,
    playing: false,
    duration: 1,
    currentTime: lastPlayed,
    playbackRate: 1,
    timeWasLoaded: lastPlayed !== 0,
    showTooltip: false,
    tooltipPosition: 0,
    tooltipTime: '0:00',
    sliderValue: 100,
  })
  const {
    playing,
    progressTime,
    currentTime,
    duration,
    showTooltip,
    tooltipPosition,
    tooltipTime,
    sliderValue,
  } = state

  const setState = (obj: Partial<typeof state>) =>
    _setState({ ...state, ...obj })
  let audio = React.createRef<HTMLAudioElement>()
  let progress = React.createRef<HTMLDivElement>()
  let prevShow = usePrevious(show)
  React.useEffect(() => {
    audio.current.playbackRate = state.playbackRate
    if (show.number !== prevShow.number) {
      const lp = localStorage.getItem(`lastPlayed${show.number}`)
      if (lp) {
        const data = JSON.parse(lp)
        // eslint-disable-next-line
        setState({
          currentTime: data.lastPlayed,
        })
        audio.current.currentTime = data.lastPlayed
      }
      audio.current.play()
    } else {
      localStorage.setItem(
        `lastPlayed${show.number}`,
        JSON.stringify({ lastPlayed: currentTime }),
      )
    }
  })

  const timeUpdate = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const { timeWasLoaded } = state
    // Check if the user already had a current time
    if (timeWasLoaded) {
      const lp = localStorage.getItem(`lastPlayed${show.number}`)
      if (lp) {
        e.currentTarget.currentTime = JSON.parse(lp).lastPlayed
      }
      setState({ timeWasLoaded: false })
    } else {
      const { currentTime = 0, duration = 1 } = e.currentTarget

      const progressTime = (currentTime / duration) * 100
      if (Number.isNaN(progressTime)) return
      setState({ progressTime, currentTime, duration })
    }
  }

  const togglePlay = () => {
    const method = playing ? 'pause' : 'play'
    audio.current[method]()
  }

  const scrubTime = (eventData: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    (eventData.nativeEvent.offsetX / progress.current.offsetWidth) *
    audio.current.duration

  const scrub = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    audio.current.currentTime = +scrubTime(e)
  }

  const seekTime = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setState({
      tooltipPosition: e.nativeEvent.offsetX,
      tooltipTime: formatTime(scrubTime(e)),
    })
  }

  const playPause = () => {
    setState({ playing: !audio.current.paused })
  }

  const volume: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const __Slider = e.currentTarget
    const volume = +__Slider.value / 100
    setState({ sliderValue: +__Slider.value })
    audio.current.volume = volume
  }

  // const speed = (change: number) => {
  //   const playbackRateMax = 2.5
  //   const playbackRateMin = 0.75
  //   // eslint-disable-next-line
  //   let playbackRate = state.playbackRate + change

  //   if (playbackRate > playbackRateMax) {
  //     playbackRate = playbackRateMin
  //   }

  //   if (playbackRate < playbackRateMin) {
  //     playbackRate = playbackRateMax
  //   }

  //   setState({ playbackRate })
  // }
  // const speedUp = () => speed(0.25)

  // const speedDown = () => speed(-0.25)

  // // currently this is a bug only in produciton - duration is always infinity in git LFS
  // const playerTime = `${formatTime(currentTime)}`
  // const playerTime = `${formatTime(currentTime)} / ${formatTime(duration)}`

  return (
    <div className="player">
      <div className="player__section player__section--left">
        <button
          onClick={togglePlay}
          aria-label={playing ? 'pause' : 'play'}
          type="button"
          className={`${playing ? 'playing' : 'paused'}`}
        >
          <p className="player__icon">{playing ? <FaPause /> : <FaPlay />}</p>
        </button>
      </div>

      <div className="player__section player__section--middle">
        <div style={{ opacity: 0.7, marginBottom: '10px', marginLeft: '10px' }}>
          <em>Playing Now:</em> {curEp.frontmatter.title}
        </div>
        {/* eslint-disable */}
        <div
          className={`progress ${playing ? 'playing' : 'paused'}`}
          onClick={scrub}
          onMouseMove={seekTime}
          onMouseEnter={() => {
            setState({ showTooltip: true })
          }}
          onMouseLeave={() => {
            setState({ showTooltip: false })
          }}
          ref={progress}
        >
          {/* eslint-enable */}
          <div
            className="progress__time"
            style={{ width: `${progressTime}%` }}
          />
        </div>
        <div
          className="player__tooltip"
          style={{
            left: `${tooltipPosition}px`,
            opacity: showTooltip ? 1 : 0,
          }}
        >
          {tooltipTime}
        </div>
        <div style={{ opacity: 0.7, marginTop: '10px', marginLeft: '10px' }}>
          {formatTime(currentTime)} / {formatTime(duration)}
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
              onChange={volume}
              className="volume-slider"
              type="range"
              name="volume"
              min="0"
              max="100"
              step="1"
              value={sliderValue}
              id="range-slider-input"
            />
          </div>
        </div>
      </div>
      {/* eslint-disable */}
      <audio
        ref={audio}
        onPlay={playPause}
        onPause={playPause}
        onTimeUpdate={timeUpdate}
        onLoadedMetadata={timeUpdate}
        onDurationChange={
          (e) => console.log('duration', e.currentTarget.duration)
          // this never seems to get called
        }
        src={show.url}
        preload="auto"
      />
      {/* eslint-enable */}
    </div>
  )
}

function formatTime(timeInSeconds: number) {
  const hours = Math.floor(timeInSeconds / (60 * 60))
  timeInSeconds -= hours * 60 * 60
  const minutes = Math.floor(timeInSeconds / 60)
  timeInSeconds -= minutes * 60

  // left pad number with 0
  const leftPad = (num: number) => `${num}`.padStart(2, '0')
  const str =
    (hours ? `${leftPad(hours)}:` : '') +
    // (minutes ? `${leftPad(minutes)}:` : '00') +
    `${leftPad(minutes)}:` +
    leftPad(Math.round(timeInSeconds))
  return str
}

import React from 'react'
import Video from 'react-video-renderer'

import {useSeekBar} from '../../hooks/seek-bar-hook'
import {useHighlights} from '../../hooks/highlights-hook'
import {formatTime} from '../../util'

import SeekBar from './seek-bar/seek-bar'
import HighlightMarker from './highlight-marker/highlight-marker'

function setActions(actions) {
  window.actions = actions
  return ''
}

function VideoPlayer(props) {
  const [seekState, seekActions] = useSeekBar({showPopover: false})
  const [highlights, highlightActions] = useHighlights([])

  return (
    <div style={{paddingBottom: '200px'}}>
      <Video src='http://localhost:8000/public/video.mkv'>
        {(video, state, actions) => {
          const position = seekState.isSeeking ? seekState.position : ((state.currentTime / state.duration) * 100)
          console.log(state)

          return (
            <div>
              {video}
              {setActions(actions)}
              <div>{parseFloat(state.currentTime).toFixed(2)} / {parseFloat(state.duration).toFixed(2)}</div>
              <button onClick={actions.play}>Play</button>
              <button onClick={actions.pause}>Pause</button>
              <button onClick={actions.requestFullScreen}>Fullscreen</button>
              <SeekBar
                {...seekState}
                {...seekActions}
                leftCircle={{
                  position,
                }}
                seek={actions.navigate}
                videoState={state}
                fullLength={state.duration}
                highlights={highlights}
              />
              <button onClick={() => {
                highlightActions.addHighlight(state.currentTime)
              }}>Make Highlight</button>
              <div>
                {highlights.map((highlight, i: number) => (
                  <p key={i}>
                    <HighlightMarker
                      highlight={highlight}
                      left={0}
                      seek={actions.navigate}
                    />
                  </p>
                ))}
              </div>
            </div>
          )
        }}
      </Video>
    </div>
  )
}

export default VideoPlayer

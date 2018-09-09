declare module 'react-player-controls' {
  import React from 'react'

  export type ProgressBarProps = {
    totalTime: number,
    currentTime: number,
    bufferedTime: number,
    isSeekable: boolean,
    lastSeekStart: number,
    lastIntent: number,
    lastSeekEnd: number,
    onSeekStart: (time: number) => void,
    onSeekEnd: (time: number) => void,
    onIntent: (time: number) => void,
  }

  export class ProgressBar extends React.Component<ProgressBarProps> {}

  type PauseButtonProps = {
    onClick: () => void,
  }
  export class PauseButton extends React.Component<PauseButtonProps> {}

  type PlayButtonProps = {
    onClick: () => void,
    isEnabled: boolean,
  }
  export class PlayButton extends React.Component<PlayButtonProps> {}
}

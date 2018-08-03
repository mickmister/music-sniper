export type ProgressBarProps = {
  totalTime: number,
  currentTime: number,
  bufferedTime: number,
  isSeekable: boolean,
  lastSeekStart: number,
  lastIntent: number,
  lastSeekEnd: number,
  onSeek: (time: number) => void,
  onSeekStart: (time: number) => void,
  onSeekEnd: (time: number) => void,
  onIntent: (time: number) => void,
}

export type ReactHowlerProps = {
  src: string,
  playing: boolean,
  seek: number,
}

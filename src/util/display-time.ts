export const displayTime = (timeMillis: number) => {
  const time = timeMillis
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  const minutesStr = minutes > 9 ? minutes : `0${minutes}`
  const secondsStr = seconds > 9 ? seconds : `0${seconds}`
  return `${minutesStr}:${secondsStr}`
}

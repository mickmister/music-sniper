import { SpriteInformation, Seconds, Section, TimeIntervalMilliseconds, Percentage } from 'types/music-types'
import { IHowl } from '../interfaces/IHowl'

export class Sprite {
  howl: IHowl
  started = false

  constructor(
    public filePath: string,
    public section: Section,
  ) {
    if (!section.end) {
      setTimeout(() => {
        this.howl.once('load', () => section.end = this.howl.duration())
      })
    }
  }

  play = () => {}

  getSpriteInfo = () => {
    if(!this.started) return this.getDefaultInfo()
    return {
      songPosition: this.songPosition(),
      spritePosition: this.spritePosition(),
      spriteProgress: this.spriteProgress(),
      length: this.getLength(),
    } as SpriteInformation
  }

  getDefaultInfo = () => {
    return {
      songPosition: 0,
      spritePosition: this.section.start,
      spriteProgress: 0,
      length: this.getLength(),
    } as SpriteInformation
  }

  getSegment = () => {
    const {start, end} = this.section
    return [start * 1000, (end - start) * 1000] as TimeIntervalMilliseconds
  }

  seek(seekSeconds: Seconds) {
    this.howl.seek(seekSeconds)
  }

  songPosition = () => {
    return this.howl.seek() as Seconds
  }

  getLength = () => {
    const {start, end} = this.section
    return end - start
  }

  spritePosition = () => {
    return this.songPosition() - this.section.start
  }

  spriteProgress = () => {
    const ratio = this.spritePosition() / this.getLength()
    return ratio
  }

  windowProgress(win: Section) {
    return (this.spriteProgress() - win.start) / (win.end - win.start)
  }

  getStartPercentage() {
    const ratio = this.section.start / this.howl.duration()
    return ratio
  }

  getEndPercentage() {
    const ratio = this.section.end / this.howl.duration()
    return ratio
  }

  setStartPercentage(start: Percentage) {
    this.section.start = start * this.howl.duration()
  }

  setEndPercentage(end: Percentage) {
    this.section.end = end * this.howl.duration()
  }

  seekPercentage(percent: number) {
    const targetPosition = this.getLength() * percent
    const relativeToSong = this.section.start + targetPosition
    this.seek(relativeToSong)
  }

  pause = () => { this.howl.pause() }
}

export class DynamicSprite extends Sprite {
  howl = (() => {
    const howl = new Howl({
      src: [this.filePath],
      html5: true,
    })
    return howl
  })()

  play = () => {
    this.howl.play()
    if (!this.started) {
      this.howl.seek(this.section.start)
      this.started = true
    }
  }
}

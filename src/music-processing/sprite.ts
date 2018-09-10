import { SpriteInformation, Seconds, Milliseconds, Section, TimeIntervalMilliseconds } from 'types/music-types'
import { IHowl } from '../interfaces/IHowl'

export class Sprite {
  howl: IHowl
  started = false

  constructor(
    public filePath: string,
    public section: Section,
  ) {
  }

  play = () => {}

  getSpriteInfo = () => {
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
    const position = this.howl.seek() as Milliseconds
    return position / 1000 as Seconds
  }

  getLength = () => {
    const {start, end} = this.section
    return end - start
  }

  spritePosition = () => {
    return this.songPosition() - this.section.start
  }

  spriteProgress = () => {
    return this.spritePosition() / this.getLength()
  }

  windowProgress(win: Section) {
    return (this.spriteProgress() - win.start) / (win.end - win.start)
  }

  seekPercentage(percent: number) {
    const targetPosition = this.getLength() * (percent / 100)
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
    howl.seek(this.section.start)
    return howl
  })()

  play = () => {
    this.howl.play()
  }
}

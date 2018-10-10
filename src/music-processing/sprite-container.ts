import {Subject, Observable} from 'rxjs'
import { takeUntil, filter } from 'rxjs/operators'
import { Sprite, DynamicSprite } from './sprite'
import { SpriteInformation } from '../types/music-types'
import { StaticSprite } from './static-sprite';

const INTERVAL_PERIOD = 250
const NUM_CYCLES = 1000
let currentCycle = 0

export class SpriteContainer {
  private cancelSubject: Subject<boolean>
  private subject: Subject<SpriteInformation>
  private observable: Observable<SpriteInformation>
  private interval: number

  constructor(
    public sprite: StaticSprite | DynamicSprite,
  ) {
    this.cancelSubject = new Subject<boolean>()
    this.subject = new Subject<SpriteInformation>()
    this.observable = this.subject
      .pipe(takeUntil(this.cancelSubject.pipe(filter(x => x))))
    this.interval = setInterval(this.sendUpdates, INTERVAL_PERIOD)
  }

  getObsvervableForInterval = () => this.observable

  cleanUp = () => {
    clearInterval(this.interval)
    const defaultValue = this.sprite.getDefaultInfo()
    this.subject.next(defaultValue)
    this.cancelSubject.next(true)
  }

  sendUpdates = () => {
    if (this.sprite.howl.playing() && this.sprite.spriteProgress() >= 1) {
      this.sprite.howl.stop()
      this.sprite.started = false
      this.sprite.stopped = true
    }
    const payload = this.sprite.getSpriteInfo()
    this.subject.next(payload)
    if (currentCycle++ >= NUM_CYCLES) {
      this.cleanUp()
    }
  }

  duration = () => {
    return this.sprite.howl.duration()
  }
}

import {BehaviorSubject, Subject, Observable} from 'rxjs'
import { takeUntil, filter } from 'rxjs/operators'
import { Sprite } from './sprite'
import { SpriteInformation } from '../types/music-types'

const INTERVAL_PERIOD = 1000
const NUM_CYCLES = 1000
let currentCycle = 0

export class SpriteContainer {
  private cancelSubject: Subject<boolean>
  private subject: BehaviorSubject<SpriteInformation>
  private observable: Observable<SpriteInformation>
  private interval: number

  constructor(
    public sprite: Sprite,
  ) {
    this.cancelSubject = new Subject<boolean>()
    this.subject = new BehaviorSubject<SpriteInformation>(this.sprite.getSpriteInfo())
    this.observable = this.subject
      .pipe(takeUntil(this.cancelSubject.pipe(filter(x => x))))
    // this.interval = setInterval(this.sendUpdates, INTERVAL_PERIOD)
  }

  getObsvervableForInterval = () => this.observable

  cleanUp = () => {
    clearInterval(this.interval)
    const defaultValue = this.sprite.getDefaultInfo()
    this.subject.next(defaultValue)
    this.cancelSubject.next(true)
  }

  sendUpdates = () => {
    const payload = this.sprite.getSpriteInfo()
    this.subject.next(payload)
    if (currentCycle++ >= NUM_CYCLES) {
      this.cleanUp()
    }
  }
}

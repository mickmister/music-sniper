import {Subject, Observable} from 'rxjs'
import {takeUntil, filter} from 'rxjs/operators'

import {SpriteInformation, Section} from '../types/music-types'

import {Sprite, DynamicSprite} from './sprite'
import {StaticSprite} from './static-sprite'

const INTERVAL_PERIOD = 250
const NUM_CYCLES = 1000
let currentCycle = 0

let holdingDownSpace = false

export class SpriteContainer {
    private cancelSubject: Subject<boolean>
    private subject: Subject<SpriteInformation>
    private observable: Observable<SpriteInformation>
    private interval: number
    private lastProgress: number

    constructor(
        public sprite: StaticSprite | DynamicSprite,
        public sections: Section[]
    ) {
        this.cancelSubject = new Subject<boolean>()
        this.subject = new Subject<SpriteInformation>()
        this.observable = this.subject.
            pipe(takeUntil(this.cancelSubject.pipe(filter((x) => x))))
        this.interval = setInterval(this.sendUpdates, INTERVAL_PERIOD)

        this.createSpaceBarListener()
    }

    getObsvervableForInterval = () => this.observable

    createSpaceBarListener = () => {
        document.addEventListener('keydown', this.spaceBarListenerDown)
        document.addEventListener('keyup', this.spaceBarListenerUp)
    }

    spaceBarListenerDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        if (e.key !== ' ') {
            return
        }

        if (e.target !== document.body) {
            return
        }

        if (holdingDownSpace) {
            return
        }

        holdingDownSpace = true

        if (this.sprite.howl.playing()) {
            this.sprite.pause()
        } else {
            this.sprite.play()
        }
    }

    spaceBarListenerUp = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        if (e.key !== ' ') {
            return
        }

        if (e.target !== document.body) {
            return
        }

        holdingDownSpace = false
    }

    cleanUp = () => {
        document.removeEventListener('keydown', this.spaceBarListenerDown)
        document.removeEventListener('keyup', this.spaceBarListenerUp)
        clearInterval(this.interval)
        const defaultValue = this.sprite.getDefaultInfo()
        this.subject.next(defaultValue)
        this.cancelSubject.next(true)
    }

    sendUpdates = () => {
        if (currentCycle++ >= NUM_CYCLES) {
            // this.cleanUp()
        }

        if (this.sprite.stopped) {
            return
        }

        if (this.sprite.spriteProgress() === 0 || (this.sprite.howl.playing() && (this.sprite.spriteProgress() >= 1))) {
            this.sprite.stop()
        }
        const payload: SpriteInformation = this.sprite.getSpriteInfo()
        if (!payload.playing && this.lastProgress === payload.spriteProgress) {
            return
        }

        this.lastProgress = payload.spriteProgress
        this.subject.next(payload)
    }

    duration = () => {
        return this.sprite.howl.duration()
    }
}

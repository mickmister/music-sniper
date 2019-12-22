import {SpriteInformation, Seconds, Section, TimeIntervalMilliseconds, Percentage} from 'types/music-types'

import {IHowl} from '../interfaces/IHowl'
import {Clip} from '../types/music-types'

export class Sprite {
    howl: IHowl
    started = false
    stopped = true

    constructor(
        public filePath: string,
        public clip: Clip,
    ) {
        if (!clip.end_time) {
            setTimeout(() => {
                this.howl.once('load', () => clip.end_time = this.howl.duration())
            })
        }
    }

    afterLoad = (cb: () => void) => {
        setTimeout(() => {
            if (this.howl.state() === 'loaded') {
                cb()
            } else {
                this.howl.once('load', cb)
            }
        })
    }

    play = () => {
        this.stopped = false
        this.started = true
    }

    getSpriteInfo = () => {
        if (!this.started) {
            return this.getDefaultInfo()
        }
        return {
            songPosition: this.songPosition(),
            spritePosition: this.spritePosition(),
            spriteProgress: this.spriteProgress(),
            length: this.getLength(),
            playing: this.howl.playing(),
            section: this.clip,
        } as SpriteInformation
    }

    getDefaultInfo = () => {
        return {
            songPosition: 0,
            spritePosition: this.clip.start_time,
            spriteProgress: 0,
            length: this.getLength(),
            playing: false,
            section: this.clip,
        } as SpriteInformation
    }

    getSegment = () => {
        const {start_time, end_time} = this.clip
        return [start_time * 1000, (end_time - start_time) * 1000] as TimeIntervalMilliseconds
    }

    seek(seekSeconds: Seconds) {
        this.howl.seek(seekSeconds)
    }

    songPosition = () => {
        return this.howl.seek() as Seconds
    }

    getLength = () => {
        const {start_time, end_time} = this.clip
        return end_time - start_time
    }

    spritePosition = () => {
        return this.songPosition() - this.clip.start_time
    }

    spriteProgress = () => {
        const ratio = this.spritePosition() / this.getLength()
        return ratio
    }

    windowProgress(win: Section) {
        return (this.spriteProgress() - win.start_time) / (win.end_time - win.start_time)
    }

    getStartPercentage() {
        const ratio = this.clip.start_time / this.howl.duration()
        return ratio
    }

    getEndPercentage() {
        const ratio = this.clip.end_time / this.howl.duration()
        return ratio
    }

    setStartPercentage(start: Percentage) {
        this.clip.start_time = start * this.howl.duration()
    }

    setEndPercentage(end: Percentage) {
        this.clip.end_time = end * this.howl.duration()
    }

    seekPercentage(percent: number) {
        const targetPosition = this.getLength() * percent
        const relativeToSong = this.clip.start_time + targetPosition
        this.seek(relativeToSong)
    }

    pause = () => {
        this.howl.pause()
        return this
    }
    stop = () => {
        this.howl.stop()
        this.started = false
        this.stopped = true
        return this
    }
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
        if (this.howl.playing()) {
            this.howl.seek(this.clip.start_time)
            return
        }
        if (this.stopped) {
            this.howl.seek(this.clip.start_time)
        }
        this.howl.play()
        if (this.stopped) {
            this.howl.seek(this.clip.start_time)
        }
        this.stopped = false
        this.started = true
        return this
    }
}

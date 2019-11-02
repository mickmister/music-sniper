
import {throwIfEmpty} from 'rxjs/operators'

import {Section} from '../types/music-types'

import {Sprite} from './sprite'

export class StaticSprite extends Sprite {
    howl = new Howl({
        src: [this.filePath],
        html5: true,
        sprite: {
            segment: this.getSegment(),
        },
        format: 'mp3',
    })

    constructor(name: string, section: Section) {
        super(name, section)
    }

    play = () => {
        if (this.started) {
            this.howl.play()
            return this
        }
        this.howl.play('segment')
        this.stopped = false
        this.started = true

        return this
    }
}

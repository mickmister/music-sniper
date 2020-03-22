
import {Howl} from 'howler'

import {Sprite} from './sprite'

export class StaticSprite extends Sprite {
    howl = new Howl({
        src: [this.filePath.replace('http://localhost:3000', '')],
        // html5: true,
        html5: process.env.NODE_ENV === 'production',
        sprite: {
            segment: this.getSegment(),
        },
        format: 'mp3',
        // loop: true,
    })

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

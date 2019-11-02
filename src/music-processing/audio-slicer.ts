import {Howl, Howler} from 'howler'

import {Section, Song} from '../types/props'

type FilePath = string

class AudioSlicer {
    currentSprite: Sprite
    constructor(private song: Song) {}

    run = () => {
        this.sound = new Howl({
            src: [this.filePath],
            html5: true,

            // onplay: console.log,
            // onpause: console.log,
            // onstop: console.log,
        })
    }

    playSegment = async (seg: Segment) => {
        this.currentSprite = new Sprite(song.filePath, seg)
    }

    //   this.sound.stop()
    //   this.sound = new Howl({
    //     src: [this.filePath],
    //     html5: true,
    //     sprite: {
    //       segment: [s.begin * 1000, (s.end - s.begin) * 1000],
    //     },
    //   })
    //   // this.sound.play('segment')
    // }
}

export default AudioSlicer

// window.addEventListener('load', () => {
//   const slicer = new AudioSlicer('sound.mp3')
//   slicer.run()
// })

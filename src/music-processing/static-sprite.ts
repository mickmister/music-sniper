import { Sprite } from './sprite'
import { throwIfEmpty } from "rxjs/operators";

export class StaticSprite extends Sprite {
  howl = new Howl({
    src: [this.filePath],
    html5: true,
    sprite: {
      segment: this.getSegment(),
    },
    format: 'mp3',
  })

  play = () => {
    if (this.started) {
      this.howl.play()
      return
    }
    this.started = true
    this.howl.play('segment')
  }
}
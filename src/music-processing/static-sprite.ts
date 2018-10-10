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
    this.howl.play('segment')
  }
}

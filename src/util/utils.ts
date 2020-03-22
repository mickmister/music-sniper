import {Clip} from '../types/music-types'

export function clipsAreEqual(c1: Clip, c2: Clip) {
    return c1 === c2 || (c1.id && (
        c1.id === c2.id && c1.updated_at === c2.updated_at
    ))
}

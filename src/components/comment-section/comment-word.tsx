import React from 'react'
import {useStoreActions, Actions, useStoreState, State} from 'easy-peasy'

import {Comment, Clip} from '../../types/music-types'
import {IGlobalStore} from '../../store/store-types'

const timestampParse = (word: string) => {
    return word && word.match('([0-9]*):([0-9]*)')
}

type Props = {
    comment: Comment
    word: string
}

export default function CommentWord({comment, word}: Props) {
    const playClip = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.songs.playClip)
    const audioFiles = useStoreState((dispatch: State<IGlobalStore>) => dispatch.songs.audioFiles)
    const f = audioFiles.find((f) => f.id === comment.commentable_id)

    if (!timestampParse(word)) {
        return <span>{' '} {word} {' '}</span>
    }

    const playAndSeek = async () => {
        const parts = timestampParse(word)
        const minutes = parseInt(parts[1])
        const seconds = parseInt(parts[2])
        const total = minutes * 60 + seconds

        const clip: Clip = {
            id: 0,
            name: '',
            audio_file_id: f.id,
            user_id: 0,
            start_time: 0,
            end_time: f.audio_length || 100000,
            force: true,
        }

        const sprite = await playClip(clip)
        if (!sprite) {
            return
        }
        sprite.howl.load()
        sprite.afterLoad(async () => {
            const h = sprite.howl
            h.volume(0)
            await new Promise(r => setTimeout(r, 500))
            sprite.play()
            await new Promise(r => setTimeout(r, 500))
            sprite.seek(total)
            h.volume(1)
        })
    }

    return (
        <a onClick={playAndSeek}>
            <span>
                {' '}
                {word}
                {' '}
            </span>
        </a>
    )
}

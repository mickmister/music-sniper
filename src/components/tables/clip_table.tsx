import React from 'react'
import {Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {PlayButton} from 'react-player-controls'
import {useStoreActions, Actions} from 'easy-peasy'

import {Clip} from '../../types/music-types'
import {IGlobalStore} from '../../store/store-types'

import TableComponent from './table'

type Props = {
    clips: Clip[]
}

export default function ClipTable({clips}: Props) {
    const headers = ['', 'Name']

    const playClip = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.songs.playClip)

    const play = async (clip: Clip) => {
        const sprite = await playClip(clip)

        if (sprite) {
            sprite.play()
        }
    }

    const rows = clips.map((clip) => [
        (
            <PlayButton
                key={'play'}
                isEnabled={true}
                onClick={() => play(clip)}
            />
        ),
        (
            <>
                <Icon
                    name={'file'}
                />
                {clip.name}
            </>
        ),
    ])

    const numPages = 2
    const activePage = 1

    return (
        <TableComponent
            headers={headers}
            rows={rows}
            numPages={numPages}
            activePage={activePage}
        />
    )
}

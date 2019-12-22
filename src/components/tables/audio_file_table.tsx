import React from 'react'
import {Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {PlayButton} from 'react-player-controls'

import {AudioFile} from '../../types/music-types'

import TableComponent from './table'

type Props = {
    audioFiles: AudioFile[]
}

export default function AudioFileTable({audioFiles}: Props) {
    const headers = ['', 'Name']

    const rows = audioFiles.map((f) => [
        (
            <PlayButton
                key={'play'}
                isEnabled={true}
                onClick={() => {}}
            />
        ),
        (
            <>
                <Icon
                    name={'file'}
                />
                <Link to={`/songs/${f.id}/play`}>{f.file_name}</Link>
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

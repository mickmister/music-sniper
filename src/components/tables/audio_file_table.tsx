import React from 'react'
import {Icon, Table} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {PlayButton} from 'react-player-controls'

import {AudioFile} from '../../types/music-types'

import TableComponent from './table'

type Props = {
    audioFiles: AudioFile[]
}

export default function AudioFileTable({audioFiles}: Props) {
    const headers = ['', 'Name']

    const rows = audioFiles.map((f) => (
        <Table.Row key={f.id}>
            <Table.Cell>
                <PlayButton
                    key={'play'}
                    isEnabled={true}
                    onClick={() => {}}
                />
            </Table.Cell>

            <Table.Cell>
                <Icon
                    name={'file'}
                />
                <Link to={`/songs/${f.id}/play`}>{f.file_name}</Link>
            </Table.Cell>
        </Table.Row>
    ))


    const numPages = 1
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

import React from 'react'
import {Table, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import {AudioFile} from '../../types/music-types'
import SongPlayerHTML5 from '../song-player/song-player-html5'

type Props = {
    file: AudioFile
}

export default function AudioFileRow(props: Props) {
    const f = props.file

    return (
        <Table.Row key={f.id}>
            <Table.Cell>
                <Icon
                    name={'file'}
                />
                <Link to={`/songs/${f.id}/play`}>{f.file_name}</Link>
                {/* instead, call a store function that will render the html5 player at the top of the page? idk*/}
            </Table.Cell>

            <Table.Cell>
                <SongPlayerHTML5
                    file={f}
                    audioProps={{style: {
                        width: '100%',
                        minWidth: '300px',
                        height: '2.0em',
                    }}}
                />
            </Table.Cell>
        </Table.Row>
    )
}

import React from 'react'
import {Table, Icon} from 'semantic-ui-react'
import {useStoreActions, Actions, useStoreState, State} from 'easy-peasy'

import {AudioFile} from '../../types/music-types'
import {IGlobalStore} from '../../store/store-types'
import {AttachProps} from '../../types/props'

import TableComponent from './table'
import AudioFileRow from './audio_file_row'

type Props = {
    audioFiles: AudioFile[]
    attachProps: AttachProps
}

const sortByMostRecent = (f1: AudioFile, f2: AudioFile) => {
    if (f1.created_at < f2.created_at) {
        return 1
    } else if (f1.created_at > f2.created_at) {
        return -1
    }

    return 0
}

export default function AudioFileTable({audioFiles, attachProps}: Props) {
    const openAttachModalAction = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.modals.openAttachModal)
    const allAudioFiles = useStoreState((state: State<IGlobalStore>) => state.songs.audioFiles)

    const headers = ['Name', '']

    const sorted = [...audioFiles].sort(sortByMostRecent)
    const rows = sorted.map((f) => (
        <AudioFileRow
            key={f.id}
            file={f}
        />
    ))

    const openAttachModal = () => {
        openAttachModalAction({
            ...attachProps,
            items: allAudioFiles.filter((f) => !audioFiles.find((f2) => f2.id === f.id)),
        })
    }

    const numPages = 1
    const activePage = 1

    let topRow
    if (attachProps) {
        topRow = (
            <Table.Row>
                <Table.Cell>
                    <Icon
                        name={'file'}
                        onClick={openAttachModal}
                    />
                    {'Attach'}
                </Table.Cell>
                <Table.Cell>

                </Table.Cell>
            </Table.Row>
        )
    }

    return (
        <TableComponent
            topRow={topRow}
            headers={headers}
            rows={rows}
            numPages={numPages}
            activePage={activePage}
        />
    )
}

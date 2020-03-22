import React from 'react'
import {useStoreActions, Actions} from 'easy-peasy'

import {Clip} from '../../types/music-types'
import {IGlobalStore} from '../../store/store-types'

import TableComponent from './table'
import ClipRow from './clip_row'

type Props = {
    clips: Clip[]
}

export default function ClipTable({clips}: Props) {
    const headers = ['Name', 'Audio File']

    const rows = clips.map((clip) => (
        <ClipRow
            key={clip.id}
            clip={clip}
        />
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

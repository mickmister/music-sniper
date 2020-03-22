import React from 'react'
import {Icon, Menu, Table} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import {Folder, FolderItemWithEntity, ModelNames, AudioFile, Clip} from '../../types/music-types'

import TableComponent from './table'
import ClipRow from './clip_row'
import AudioFileRow from './audio_file_row'

type Props = {
    folder?: Folder
    parentFolder?: Folder
    childFolders: Folder[]
    folderItems: FolderItemWithEntity[]
    setFolderId: (id: number) => void
}

const renderFolderItemRow = (item: FolderItemWithEntity) => {
    if (item.item_type === ModelNames.AudioFile) {
        const entity = item.entity as AudioFile
        return (
            <AudioFileRow
                key={item.item_type + item.item_id}
                file={entity}
            />
        )
    } else if (item.item_type === ModelNames.Clip) {
        const entity = item.entity as Clip
        return (
            <ClipRow
                key={item.item_type + item.item_id}
                clip={entity}
            />
        )
    }
    return (
        <Table.Row key={item.item_type + item.item_id}>
            <Table.Cell>
                {'Unsupported folder item: '}
                {item.item_type}
            </Table.Cell>
        </Table.Row>
    )
}

export default function FolderTable({folder, folderItems, childFolders, setFolderId, parentFolder}: Props) {
    let parentRow
    if (parentFolder) {
        parentRow = (
            <Table.Row>
                <Table.Cell>
                    {'< '}
                    <Icon
                        name={'folder open'}
                    />
                    <a onClick={() => setFolderId(folder.parent_id)}>
                        {parentFolder.name}
                    </a>
                </Table.Cell>

                <Table.Cell>
                    {parentFolder.description}
                </Table.Cell>
            </Table.Row>
        )
    }

    const headers = ['Name', 'Description']

    const rows = childFolders.map((f) => (
        <Table.Row
            key={`folder${f.id}`}
            active={true}
        >
            <Table.Cell>
                <Icon
                    name={'folder open'}
                />
                <a onClick={() => setFolderId(f.id)}>{f.name}</a>
            </Table.Cell>

            <Table.Cell>
                {f.description}
            </Table.Cell>
        </Table.Row>
    )).concat(folderItems.map(renderFolderItemRow))

    const numPages = 1
    const activePage = 1

    return (
        <TableComponent
            headers={headers}
            rows={rows}
            topRow={parentRow}
            numPages={numPages}
            activePage={activePage}
        />
    )
}

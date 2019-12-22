import React from 'react'
import {Icon, Menu, Table} from 'semantic-ui-react'

import {Link} from 'react-router-dom'

import {Folder} from '../../types/music-types'
import {Entity} from '../../store/shared-store-logic'
import TableComponent from './table'

type Props = {
    folder?: Folder
    parentFolder?: Folder
    childFolders: Folder[]
    folderItems: Entity[]
    setFolderId: (id: number) => void
}

export default function FolderTable({folder, folderItems, childFolders, setFolderId, parentFolder}: Props) {
    let parentRow
    if (parentFolder) {
        parentRow = [
            (
                <>
                    {'< '}
                    <Icon
                        name={'folder open'}
                    />
                    <a onClick={() => setFolderId(folder.parent_id)}>
                        {parentFolder.name}
                    </a>
                </>
            ),
            parentFolder.description,
            ([]).length,
        ]
    }

    const headers = ['Name', 'Description', 'Contents']

    const rows = childFolders.map((f) => [
        (
            <>
                <Icon
                    name={'folder open'}
                />
                <a onClick={() => setFolderId(f.id)}>{f.name}</a>
            </>
        ),
        f.description,
        ([]).length,
    ]).concat(folderItems.map((item) => [
        (
            <>
                <Icon
                    name={'file'}
                />
                <Link to={`/songs/${item.id}/play`}>
                    {item.file_name}
                </Link>
            </>
        ),

        item.name,
        ([]).length,
    ]))

    const numPages = 2
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

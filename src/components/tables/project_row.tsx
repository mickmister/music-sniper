import React from 'react'
import {Link} from 'react-router-dom'
import {Icon, Table} from 'semantic-ui-react'

import {Project} from '../../types/music-types'
import {IGlobalStore} from '../../store/store-types'
import {State, useStoreState} from 'easy-peasy'

type Props = {
    project: Project
}

export default function ProjectRow({project}: Props) {
    const getProjectAttachments = useStoreState((state: State<IGlobalStore>) => state.projects.getProjectAttachments)
    const attachments = getProjectAttachments(project.id)

    return (
        <Table.Row>
            <Table.Cell>
                <Link to={`/projects/${project.id}`}>
                    <Icon
                        name={'file'}
                    />
                    {project.name}
                </Link>
            </Table.Cell>
            <Table.Cell>
                {attachments.length}
            </Table.Cell>
        </Table.Row>
    )
}

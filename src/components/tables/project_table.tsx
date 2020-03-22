import React from 'react'

import {Project} from '../../types/music-types'

import TableComponent from './table'
import ProjectRow from './project_row'

type Props = {
    projects: Project[]
}

export default function ProjectTable({projects}: Props) {
    const headers = ['Name', 'Attachments']

    const rows = projects.map((project) => (
        <ProjectRow
            key={project.id}
            project={project}
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

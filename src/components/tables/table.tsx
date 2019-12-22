import React from 'react'
import {Icon, Menu, Table} from 'semantic-ui-react'

type Props = {
    headers: React.ReactNode[]
    rows: React.ReactNode[][]
    topRow?: React.ReactNode[]
    numPages: number
    activePage: number
}

export default function TableComponent({headers, rows, topRow, numPages, activePage}: Props) {
    const header = (
        <Table.Header>
            <Table.Row>
                {headers.map((header, i) => (
                    <Table.HeaderCell key={i}>
                        {header}
                    </Table.HeaderCell>
                ))}
            </Table.Row>
        </Table.Header>
    )

    const body = (
        <Table.Body>
            {topRow && (
                <Table.Row active={true}>
                    {topRow.map((cell, j) => (
                        <Table.Cell key={j}>
                            {cell}
                        </Table.Cell>
                    ))}
                </Table.Row>
            )}
            {rows.map((row, i) => (
                <Table.Row key={i}>
                    {row.map((cell, j) => (
                        <Table.Cell key={j}>
                            {cell}
                        </Table.Cell>
                    ))}
                </Table.Row>
            ))}
        </Table.Body>
    )

    const pages = []

    for (let i = 0; i < numPages; i++) {
        pages.push(i + 1)
    }

    const footer = (
        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan='3'>
                    <Menu
                        floated='right'
                        pagination={true}
                    >
                        <Menu.Item
                            as='a'
                            icon={true}
                        >
                            <Icon name='chevron left'/>
                        </Menu.Item>

                        {pages.map((i) => (
                            <Menu.Item key={i}>{i}</Menu.Item>
                        ))}
                        <Menu.Item
                            as='a'
                            icon={true}
                        >
                            <Icon name='chevron right'/>
                        </Menu.Item>
                    </Menu>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    )

    return (
        <Table celled={true}>
            {header}
            {body}
            {footer}
        </Table>
    )
}

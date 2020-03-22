import React from 'react'
import {Icon, Menu, Table} from 'semantic-ui-react'

type Props = {
    headers: React.ReactNode[]
    rows: React.ReactNode[]
    topRow?: React.ReactNode
    numPages: number
    activePage: number
}

export default function TableComponent({headers, rows, topRow, activePage}: Props) {
    const [currentPage, setCurrentPage] = React.useState(1)

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

    const PER_PAGE = 10
    const numPages = Math.ceil(rows.length / PER_PAGE)
    const pages = []
    for (let i = 0; i < numPages; i++) {
        pages.push(i + 1)
    }

    const pagedRows = rows.slice(PER_PAGE * (currentPage - 1), PER_PAGE * currentPage)

    const body = (
        <Table.Body>
            {topRow}
            {pagedRows}
        </Table.Body>
    )

    const nextPage = () => {
        if (currentPage === numPages) {
            return
        }
        setCurrentPage(currentPage + 1)
    }

    const previousPage = () => {
        if (currentPage === 1) {
            return
        }
        setCurrentPage(currentPage - 1)
    }

    const gotoPage = (pageNumber) => {
        setCurrentPage(pageNumber)
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
                            onClick={previousPage}
                        >
                            <Icon name='chevron left'/>
                        </Menu.Item>

                        {pages.map((i) => (
                            <Menu.Item onClick={() => gotoPage(i)} active={currentPage === i} key={i}>{i}</Menu.Item>
                        ))}
                        <Menu.Item
                            as='a'
                            icon={true}
                            onClick={nextPage}
                        >
                            <Icon name='chevron right'/>
                        </Menu.Item>
                    </Menu>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    )

    return (
        <Table
            celled={true}
            unstackable={true}
        >
            {header}
            {body}
            {(numPages > 1) && footer}
        </Table>
    )
}

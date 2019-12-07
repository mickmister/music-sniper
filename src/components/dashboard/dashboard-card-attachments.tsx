import React from 'react'
import {Accordion, Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import styles from './dashboard.module.scss'

type Item = {name: string, id: number}

type Props = {
    items: Item[]
}

export default function DashboardCardAttachments(props: Props) {
    const [state, setState] = React.useState({activeIndex: -1})
    const {activeIndex} = state

    const {items} = props

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, titleProps: {index: number}) => {
        const {index} = titleProps
        const newIndex = activeIndex === index ? -1 : index

        setState({activeIndex: newIndex})
    }

    const audioFileList = (
        <ul>
            {items.map((item: Item) => (
                <li
                    key={item.id}
                    className={styles.attachmentItem}
                >
                    <Link to={`/songs/${item.id}/play`}>
                        {item.file_name}
                    </Link>
                </li>
            ))}
        </ul>
    )

    return (
        <Menu.Item>
            <Accordion.Title
                active={activeIndex === 0}
                content={`Audio Files (${items.length})`}
                index={0}
                onClick={handleClick}
            />
            <Accordion.Content
                active={activeIndex === 0}
                content={audioFileList}
            />
        </Menu.Item>
    )
}

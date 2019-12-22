import React from 'react'
import {Card, Icon, Accordion, Menu} from 'semantic-ui-react'

import {useStoreState, State} from 'easy-peasy'

import {IGlobalStore} from '../../store/store-types'
import {Folder} from '../../types/music-types'

import styles from './dashboard.module.scss'

import DashboardCardAttachments from './dashboard-card-attachments'

type Props = {folder: Folder[]}

export default function DashboardCard(props: Props) {
    const {folder} = props

    const audioFiles = useStoreState((state: State<IGlobalStore>) => state.songs.audioFiles).filter((f) => folder.audio_files.includes(f.id))

    return (
        <Card className={styles.card}>
            <Card.Content>
                <Card.Header>{folder.name}</Card.Header>
                {/* <Card.Meta>
                    <span>{'Created 10/11/19'}</span>
                </Card.Meta> */}
                <Card.Description>
                    {folder.description}
                </Card.Description>
            </Card.Content>
            <Card.Content>
                <Accordion
                    fluid={true}
                    as={Menu}
                    vertical={true}
                >
                    <DashboardCardAttachments items={audioFiles}/>
                </Accordion>
            </Card.Content>

        </Card>
    )
}

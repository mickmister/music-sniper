import React, { useCallback } from 'react'
import {Link} from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ListItemText from '@material-ui/core/ListItemText'

import styles from './styles.module.scss'
import {Field} from './props'
import { useStore } from 'easy-peasy';
import { AudioFile } from '../../types/music-types';

type Props = {
  field: Field,
  handleClick: (field: Field) => void,
  fieldState: {open: boolean},
  topElement?: React.ReactElement<{}>,
}

export default function Accordion(props: Props) {
  const {field, handleClick, fieldState, topElement} = props

  const CollectionIcon = field.collectionIcon
  const Icon = field.icon

  const audioFiles = useStore(state => state.songs.audioFiles) as AudioFile[]

  return (
    <React.Fragment>
      <ListItem button onClick={useCallback(() => handleClick(field))}>
        <ListItemIcon>
        <CollectionIcon />
        </ListItemIcon>
        <ListItemText primary={`${field.name}s`} />
        {fieldState.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={fieldState.open} timeout='auto' unmountOnExit>
        <List disablePadding>
          {topElement}
          {audioFiles.map((audioFile) => (
            <Link to={`/songs/${audioFile.id}/play`}>
              <ListItem button className={styles.nested}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={`${audioFile.file_name}`} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  )
}

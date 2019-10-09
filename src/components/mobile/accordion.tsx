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
import { useStoreState, State } from 'easy-peasy';
import { AudioFile, Project } from '../../types/music-types';
import { IGlobalStore } from '../../store/store-types'

type Item = Project | AudioFile

type Props = {
  field: Field,
  handleClick: (field: Field) => void,
  fieldState: {open: boolean},
  topElement?: React.ReactElement<{}>,
  getName: (item: Item) => string
  items: Item[]
  getUrl: (item: Item) => string
}

export default function Accordion(props: Props) {
  const {field, handleClick, fieldState, topElement} = props

  const CollectionIcon = field.collectionIcon
  const Icon = field.icon

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
          {props.items.map((item: Item) => (
            <Link to={props.getUrl(item)}>
              <ListItem button className={styles.nested}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={props.getName(item)} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  )
}

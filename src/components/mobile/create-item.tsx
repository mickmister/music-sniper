import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryAdd from '@material-ui/icons/LibraryAdd';

import styles from './styles.module.scss'
import {Field} from './props'

type Props = {
  field: Field
  onClick: () => {}
}

export default function CreateItem(props: Props) {
  const {field} = props

  return (
    <ListItem button className={styles.nested} onClick={props.onClick}>
      <ListItemIcon>
        <LibraryAdd />
      </ListItemIcon>
      <ListItemText primary={`Create new ${field.name}`} />
    </ListItem>
  )
}

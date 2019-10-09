import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'

import Folder from '@material-ui/icons/Folder'
import FolderOpen from '@material-ui/icons/FolderOpen'
import LibraryMusic from '@material-ui/icons/LibraryMusic'
import MusicNote from '@material-ui/icons/MusicNote'

import {Field} from './props'
import Accordion from './accordion'
import CreateItem from './create-item'

import styles from './styles.module.scss'

type State = {
  [field: string]: {open: boolean}
}

const fields: Field[] = [
  {
    name: 'Project',
    icon: FolderOpen,
    collectionIcon: Folder,
  },
  {
    name: 'Audio File',
    icon: MusicNote,
    collectionIcon: LibraryMusic,
  },
  {
    name: 'Clip',
    icon: MusicNote,
    collectionIcon: LibraryMusic,
  },
]


export default function NestedList() {
  const initialState = fields.reduce((hash, field) => {
    hash[field.name] = {open: false};
    return hash;
  }, {} as State)

  const [state, setState] = React.useState(initialState);

  function handleClick(field: Field) {
    const oldState = state[field.name]
    setState({
      ...state,
      [field.name]: {
        ...oldState,
        open: !oldState.open,
      },
    });
  }

  const createAccordion = (field: Field) => {
    const topElement = (
      <CreateItem field={field} />
    )

    return (
      <Accordion
        key={field.name}
        topElement={topElement}
        field={field}
        fieldState={state[field.name]}
        handleClick={handleClick}
      />
    )
  }

  console.log(styles.root)

  return (
    <List
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          Nested List Items
        </ListSubheader>
      }
      className={styles.root}
    >
      {fields.map(createAccordion)}
    </List>
  );
}

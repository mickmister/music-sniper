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
import { useStoreState, State, Actions, useStoreActions } from 'easy-peasy';
import { IGlobalStore } from '../../store/store-types';
import { AudioFile, Project } from '../../types/music-types';

type FormState = {
  [field: string]: {open: boolean}
}

const fields = {
  projects: {
    name: 'Project',
    icon: FolderOpen,
    collectionIcon: Folder,
  },
  audioFiles: {
    name: 'Audio File',
    icon: MusicNote,
    collectionIcon: LibraryMusic,
  },
  clips: {
    name: 'Clip',
    icon: MusicNote,
    collectionIcon: LibraryMusic,
  },
}

export default function NestedList() {
  const initialState = Object.values(fields).reduce((hash, field) => {
    hash[field.name] = {open: false};
    return hash;
  }, {} as FormState)

  const [state, setState] = React.useState(initialState)

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

  const audioFiles = useStoreState((state: State<IGlobalStore>) => state.songs.audioFiles)
  const projects = useStoreState((state: State<IGlobalStore>) => state.projects.projects)

  const openCreateProjectModal = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.modals.openCreateProjectModal)

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
        <Accordion
            key={fields.projects.name}
            items={projects}
            getName={(p: Project) => p.name}
            getUrl={(p: Project) => `/projects/${p.id}`}
            topElement={<CreateItem field={fields.projects} onClick={openCreateProjectModal} />}
            field={fields.projects}
            fieldState={state[fields.projects.name]}
            handleClick={handleClick}
        />
        <Accordion
            key={fields.audioFiles.name}
            items={audioFiles}
            getName={(f: AudioFile) => f.file_name}
            getUrl={(f: AudioFile) => `/songs/${f.id}/play`}
            topElement={<CreateItem field={fields.audioFiles} />}
            field={fields.audioFiles}
            fieldState={state[fields.audioFiles.name]}
            handleClick={handleClick}
        />
    </List>
  );
}

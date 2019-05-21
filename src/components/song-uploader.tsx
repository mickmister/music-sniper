import React, {useRef, useState, HtmlHTMLAttributes} from 'react'
import useRouter from 'use-react-router'
import axios from 'axios'
import {useAction, useStore, State} from 'easy-peasy'

import { AudioFile, Tag } from '../types/music-types'
import Modal, { HideModalFunction } from './modal/modal'
import BackendSelect from './backend-select/backend-select'
import { FormLabel, RadioGroup, FormControlLabel, FormControl, Radio, Button, TextField } from '@material-ui/core'
import { IGlobalStore } from '../store/store-types';

type TagRadioChoice = 'existing' | 'create'

type SongUploadState = {
  tagRadio: TagRadioChoice,
  selectedTag: Tag,
  newTagName: string,
  files: File[],
  submitting: boolean,
}

type SongUploadActions = {
  setTagRadio: (event: React.ChangeEvent<HTMLInputElement>) => void,
  setNewTagName: (event: React.ChangeEvent<HTMLInputElement>) => void,
  setFiles: (event: React.ChangeEvent<HTMLInputElement>) => void,
  submit: (event: React.MouseEvent<HTMLElement>) => void,
}

export interface SongUploadProps {
  hideModal: () => void,
}

const useSongUploadState = (hideModal: HideModalFunction): [SongUploadState, SongUploadActions] => {
  const [state, setState] = useState<SongUploadState>({
    tagRadio: 'existing',
    selectedTag: null,
    newTagName: '',
    files: [],
    submitting: false,
  })

  const {history} = useRouter()
  const uploadFile = useAction(dispatch => dispatch.songs.uploadFile)
  const tags = useStore((state: State<IGlobalStore>) => state.tags.items)

  const actions: SongUploadActions = {
    setTagRadio: (e) => {
      const value = e.target.value as TagRadioChoice
      setState({
        ...state,
        tagRadio: value,
      })
    },

    setNewTagName: (e) => {
      const value = e.target.value
      setState({
        ...state,
        newTagName: value,
      })
    },

    setFiles: (e) => {
      const files = e.target.files
      setState({
        ...state,
        files: Array.from(files),
      })
    },

    submit: async () => {
      const {files} = state
      const uploadedFiles = []

      let tag
      if (state.tagRadio === 'existing') {
        tag = tags.find(t => t.id === t.id)
        // tag = tags.find(t => t.id === state.selectedTag.id)
      }
      else {
        tag = {id: null, name: state.newTagName}
      }

      if (files && files.length) {
        for (const file of Array.from(files)) {
          const uploaded: AudioFile = await uploadFile({file, tag})
          uploadedFiles.push(uploaded)
        }

        hideModal()

        if (files.length === 1) {
          history.push(`/songs/${uploadedFiles[0].id}/play`)
        }
        else {
          // history.push(`/tags/${stat}`)
        }
      }
    },
  }

  return [state, actions]
}

export function SongUpload(props: SongUploadProps) {
  const [state, actions] = useSongUploadState(props.hideModal)

  const pickFile = () => {
    hiddenFileInput.current.click()
  }

  const hiddenFileInput = useRef(null)

  const selectingExistingTag = state.tagRadio === 'existing'

  return (
    <div>
      <div>
        <FormControl>
          {/* <FormLabel>Gender</FormLabel> */}
          <RadioGroup
            aria-label="tag-radio"
            name="tag-radio"
            // className={classes.group}
            value={state.tagRadio}
            onChange={actions.setTagRadio}
            style={{display: 'flex', flexDirection: 'row'}}
          >
            <FormControlLabel value='existing' control={<Radio />} label='Select Existing' />
            <FormControlLabel value='create' control={<Radio />} label='Create New' />
          </RadioGroup>
        </FormControl>
      </div>
      {selectingExistingTag ?
        <BackendSelect
          label='Tag'
          apiName='tags'
        />
        :
        <TextField
          id='tag-name'
          label='Tag Name'
          // className={classes.textField}
          value={state.newTagName}
          onChange={actions.setNewTagName}
          margin="normal"
        />
      }
      <input ref={hiddenFileInput} type='file' style={{display: 'none'}} onChange={actions.setFiles} multiple />
      <div>
        <Button onClick={pickFile}>Select Songs</Button>
      </div>

      <Button onClick={actions.submit} disabled={state.submitting}>
        Submit
      </Button>
    </div>
  )
}

export default function SongUploadModal() {
  return (
    <Modal label='Upload Song'>
      {(hide: () => void) => (
        <SongUpload hideModal={hide} />
      )}
    </Modal>
  )
}

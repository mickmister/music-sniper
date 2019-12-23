import React, { useState } from 'react'

import TextField from '@material-ui/core/TextField'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import { IGlobalStore } from '../../store/store-types';
import { State, useStoreActions, Actions } from 'easy-peasy';
import {Project} from '../../types/music-types';
import {Clip} from '../../../types/music-types';


type FormState = Clip

type Props = {
  closeModal: () => {}
  clip: Clip
}

export function CreateClipModalInner(props: Props) {
    const clip = props.clip
     const [formState, setFormState] = useState<FormState>(clip || {
        name: '',
    } as Clip)

    const {closeModal} = props

    const [serverError, setServerError] = useState('')

    const handleChange = (name: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [name]: event.target.value });
    };

    const createProject = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.projects.createOrUpdateProject)
    const submitForm = async () => {
      try {
        await createProject(formState)
        closeModal()
      } catch (e) {
        setServerError(e.message)
      }
    }

    let error
    if (serverError) {
      error = (
        <span>{serverError}</span>
      )
    }

    return (
        <form noValidate autoComplete='off'>
            <TextField
                id='standard-name'
                label='Name'
                value={formState.name}
                onChange={handleChange('name')}
                margin='normal'
            />
            <div>
                <Button onClick={submitForm}>Submit</Button>
                <Button onClick={closeModal}>Cancel</Button>
            </div>
            {error}
        </form>
    )
)

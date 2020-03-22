import React, { useState } from 'react'

import TextField from '@material-ui/core/TextField'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import { IGlobalStore } from '../../../store/store-types';
import { State, useStoreActions, Actions } from 'easy-peasy';
import { Project } from '../../../types/music-types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  }),
);

type FormState = Project

type Props = {
  closeModal: () => {}
  project?: Project
}

export default function CreateProjectModalInner(props: Props) {
    const project = props.project
    const classes = useStyles('')
    const [formState, setFormState] = useState<FormState>(project || {
        name: '',
    } as Project)

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
        <form className={classes.container} noValidate autoComplete='off'>
            <TextField
                id='standard-name'
                label='Name'
                className={classes.textField}
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

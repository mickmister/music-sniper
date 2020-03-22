import React, {useState} from 'react'

import {Button} from 'semantic-ui-react'

import {Clip} from '../../types/music-types'
import {displayTime} from '../../util/display-time'

import styles from './clip-form.module.scss'

type FormProps = {
    audio_file_id: number
    createClip: (clip: Clip) => Promise<Clip>
}

const emptyClip: Partial<Clip> = {
    name: '',
    start_time: 0,
    end_time: 0,
}

export default function ClipForm(props: FormProps) {
    const [formState, setFormState] = useState(emptyClip)

    const submitForm = (e) => {
        e.preventDefault()

        if (!formState.name) {
            return
        }

        if (formState.start_time >= formState.end_time) {
            return
        }

        const clip = {...formState, audio_file_id: props.audio_file_id}
        props.createClip(clip).then(() => {
            setFormState(emptyClip)
        })
    }

    const changedFormValue = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()

        let value: string | number = e.target.value
        if (name === 'start_time' || name === 'end_time') {
            value = parseInt(value)
        }
        setFormState({...formState, [name]: value})
    }

    return (
        <form
            onSubmit={submitForm}
            className={styles.clipForm}
        >
            <div>
                <input
                    onChange={changedFormValue('name')}
                    value={formState.name}
                />
                <label>{'Name'}</label>
            </div>
            <div>
                <input
                    onChange={changedFormValue('start_time')}
                    value={formState.start_time}
                    type='number'
                />
                <label>{'Start Time'}</label>
                <span>{displayTime(formState.start_time)}</span>
            </div>
            <div>
                <input
                    onChange={changedFormValue('end_time')}
                    value={formState.end_time}
                    type='number'
                />
                <label>{'End Time'}</label>
                <span>{displayTime(formState.end_time)}</span>
            </div>
            <Button type='submit'>{'Create New Clip'}</Button>
        </form>
    )
}

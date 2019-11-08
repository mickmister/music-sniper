import React, {useState, useEffect} from 'react'
import {useStore, State, useStoreState} from 'easy-peasy'

import {Comment} from '../../types/music-types'
import Button from '../button/button'

import {IGlobalStore} from '../../store/store-types'

import styles from './comment-section.module.scss'

type SavedCommentProps = {
    comment: Partial<Comment>,
    saveComment: (comment: Comment) => any,
    deleteComment: (comment: Comment) => any,
}

type DraftState = {
    draft: string,
    editing: boolean,
    error: Error | null,
}

type DraftActions = {
    setDraft: (draft: string) => void,
    setEditing: (editing: boolean) => void,
    resetDraft: () => void,
    setError: (e: Error) => void,
    set: (payload: any) => void,
}

const useDraft = (draft: string) => {
    const [state, setState] = useState({draft, editing: false, error: null})

    const set = (slice) => setState((state) => ({...state, ...slice}))

    return [state, {
        setDraft: (draft: string) => set({draft}),
        setEditing: (editing: boolean) => set({editing}),
        resetDraft: () => set({draft: draft || '', editing: false}),
        setError: (error: Error) => set({error}),
        set,
    }] as [DraftState, DraftActions]
}

const isTimeStamp = (word: string) => {
    return false
}

const getUser = (id: number) => (state: State<IGlobalStore>) => state.users.users.find((user: any) => user.id === id)

export default function SavedComment(props: SavedCommentProps) {
    const {comment} = props

    const userId = comment.user_id
    const user = useStoreState(getUser(userId))

    const [draftState, draftActions] = useDraft(comment.text || '')
    const {draft, editing, error} = draftState
    const {setDraft, setEditing, resetDraft, set, setError} = draftActions

    const saveDraft = async () => {
        set({editing: false, error: null})
        try {
            const newComment = await props.saveComment({...comment, text: draft})
            if (comment.id) {
                setDraft(newComment.text)
            } else {
                resetDraft()
            }
        } catch (e) {
            console.log(e)
            if (e.response && e.response.data && e.response.data.exception) {
                set({error: e.response.data.exception, editing: true})
            } else {
                set({error: e.message, editing: true})
            }
        }
    }

    const deleteComment = () => {
        props.deleteComment(comment)
    }

    const userBlock = user && (
        <div className={styles.commentUser}>
            <span className={styles.username}>
                {user.username}
            </span>
            <img
                src={user.image_url}
                width={140}
                height={140}
                className={styles.userImage}
            />
        </div>
    )

    let textBody
    if (editing) {
        textBody = (
            <textarea
                className={styles.commentText}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
            />
        )
    } else {
        textBody = (
            <p
                className={styles.commentText}
                style={{whiteSpace: 'pre'}}
            >
                {draft.split(' ').map((word, i) => {
                    if (isTimeStamp) {
                        return <span key={i}>{word} </span>
                    }

                    return <span key={i}>{word} </span>
                })}
            </p>
        )
    }

    let actionButtons
    if (editing) {
        actionButtons = (
            <div className={styles.actionButtons}>
                <Button
                    className={styles.cancelButton}
                    onClick={resetDraft}
                >{'Cancel'}</Button>
                <Button
                    disabled={!draft}
                    className={styles.saveButton}
                    onClick={saveDraft}
                >{'Save'}</Button>
            </div>
        )
    } else {
        actionButtons = (
            <div className={styles.actionButtons}>
                <Button
                    className={styles.editButton}
                    onClick={() => setEditing(true)}
                >{'Edit'}</Button>
                {comment.id && (
                    <Button
                        className={styles.editButton}
                        onClick={deleteComment}
                    >
                        {'Delete'}
                    </Button>)}
            </div>
        )
    }

    return (
        <div className={styles.savedComment}>
            <div className={styles.leftSide}>
                {userBlock}
                {actionButtons}
            </div>
            <div className={styles.textContainer}>
                {textBody}
                <span>
                    {error}
                </span>
            </div>
        </div>
    )
}

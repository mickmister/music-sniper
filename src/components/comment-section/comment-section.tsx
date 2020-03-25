import React, {FormEvent} from 'react'
import {useStoreActions, Actions, useStoreState, State} from 'easy-peasy'

import {Form} from 'semantic-ui-react'

import {AudioFile, Comment} from '../../types/music-types'
import {IGlobalStore} from '../../store/store-types'

import SavedComment from './saved-comment'
import CommentFeed from './comment-feed'

type CommentSectionProps = {
    audioFile: AudioFile,
}

const commentFromAudioFile = (audioFile: AudioFile): Partial<Comment> => ({
    commentable_type: 'AudioFile',
    commentable_id: audioFile.id,
})

export default function CommentSection(props: CommentSectionProps) {
    const {audioFile} = props

    const comments = useStoreState((state: State<IGlobalStore>) => state.comments.commentsForAudioFile(audioFile)) as Comment[]

    const saveAction = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.comments.saveComment)
    const deleteAction = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.comments.deleteComment)

    const [commentText, setCommentText] = React.useState('')
    const editComment = (e: FormEvent<HTMLTextAreaElement>) => {
        setCommentText(e.target.value)
    }

    const addComment = async () => {
        if (!confirm('Save comment?')) {
            return
        }

        const newComment = commentFromAudioFile(audioFile) as Comment
        newComment.text = commentText

        await saveAction(newComment)
        setCommentText('')
    }

    return (
        <>
            <Form
                reply={true}
                style={{width: '100%', marginBottom: '60px'}}
            >
                <Form.TextArea
                    onChange={editComment}
                    value={commentText}
                    style={{backgroundColor: 'black', width: '100%', color: 'white'}}
                    rows={6}

                    // value={editing[comment.id.toString()]}
                />
                {/* <button onClick={() => saveComment(comment.id)}>{'Save'}</button> */}
                {/* <button onClick={() => cancelEdit(comment.id)}>{'Cancel'}</button> */}
                <div>
                    <button onClick={addComment} disabled={!commentText} style={{position: 'absolute', right: '0'}}>{'Add Comment'}</button>
                </div>
            </Form>

            <CommentFeed
                comments={comments}
                saveComment={saveAction}
                deleteComment={deleteAction}
            />

        </>
    )
}

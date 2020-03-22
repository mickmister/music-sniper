import React from 'react'
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

    const newComment = commentFromAudioFile(audioFile)

    return (
        <>
            <Form
                reply={true}
                style={{width: '100%'}}
            >
                <Form.TextArea

                    // onChange={(e) => editComment(comment.id, e.target.value)}
                    style={{backgroundColor: 'black', width: '500px', color: 'white'}}
                    rows={6}

                    // value={editing[comment.id.toString()]}
                />
                {/* <button onClick={() => saveComment(comment.id)}>{'Save'}</button> */}
                {/* <button onClick={() => cancelEdit(comment.id)}>{'Cancel'}</button> */}

            </Form>

            <CommentFeed
                comments={comments}
                saveComment={saveAction}
                deleteComment={deleteAction}
            />

            <SavedComment
                key={'new'}
                comment={newComment}
                saveComment={saveAction}
                deleteComment={deleteAction}
            />

        </>
    )
}

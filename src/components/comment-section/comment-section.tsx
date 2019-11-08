import React from 'react'
import {useStoreActions, Actions, useStoreState, State} from 'easy-peasy'

import {AudioFile, Comment} from '../../types/music-types'
import {IGlobalStore} from '../../store/store-types'

import SavedComment from './saved-comment'

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
        <div>
            <h1>
                {'Comments'}
            </h1>
            <SavedComment
                key={'new'}
                comment={newComment}
                saveComment={saveAction}
                deleteComment={deleteAction}
            />
            {comments.map((comment) => (
                <SavedComment
                    key={comment.id}
                    comment={comment}
                    saveComment={saveAction}
                    deleteComment={deleteAction}
                />
            ))}
        </div>
    )
}

import React from 'react'
import {useStore, useAction} from 'easy-peasy'

import {AudioFile, Comment} from '../../types/music-types'

import SavedComment from './saved-comment'

type CommentSectionProps = {
  audioFile: AudioFile,
}

export default function CommentSection(props: CommentSectionProps) {
  const {audioFile} = props

  const comments = useStore(state => state.comments.items)
    .filter((com: Comment) => com.audio_file_id === audioFile.id)
    .sort((com1, com2) => (com1.created_at < com2.created_at) - (com1.created_at > com2.created_at))

  const saveAction = useAction(dispatch => dispatch.comments.saveComment)
  const deleteAction = useAction(dispatch => dispatch.comments.deleteComment)

  const saveComment = (comment: Comment) => saveAction(comment)
  const deleteComment = (comment: Comment) => deleteAction(comment)

  return (
    <div>
      <h1>
        Comments
      </h1>
      <SavedComment
        key={'new'}
        comment={{user_id: 1, audio_file_id: 1}}
        saveComment={saveComment}
        deleteComment={deleteComment}
        />
      {comments.map(comment => (
        <SavedComment
          key={comment.id}
          comment={comment}
          saveComment={saveComment}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  )
}

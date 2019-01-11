import React from 'react'

import {Comment} from '../../types/music-types'

import SavedComment from './saved-comment'

type CommentSectionProps = {
  comments: Comment[],
}

export default function CommentSection(props: CommentSectionProps) {
  return (
    <div>
      <h1>
        Comments
      </h1>
      {props.comments.map(comment => (
        <SavedComment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

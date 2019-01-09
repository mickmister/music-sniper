import React from 'react'

type CommentSectionProps = {
  comments: string[],
}

export default function CommentSection(props: CommentSectionProps) {
  return (
    <div>
      <h1>
        Comment Section
      </h1>
      {props.comments.map(comment => (
        <div key={comment}>
          {comment}
        </div>
      ))}
    </div>
  )
}

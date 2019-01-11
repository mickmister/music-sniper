import React from 'react'
import {useStore} from 'easy-peasy'

import {Comment} from '../../types/music-types'

import styles from './comment-section.module.scss'

type SavedCommentProps = {
  comment: Comment,
}

const getUser = (id: number) => (state: any) => state.users.users.find((user: any) => user.id === id)

export default function SavedComment(props: SavedCommentProps) {
  const userId = props.comment.user_id
  const user = useStore(getUser(userId))

  const userBlock = user && (
    <React.Fragment>
      <span className={styles.username}>
        {user.username}
      </span>
      <img
        src={user.image_url}
        width={140}
        height={140}
        className={styles.userImage}
      />
    </React.Fragment>
  )

  return (
    <div className={styles.savedComment}>
      <div className={styles.commentUser}>
        {userBlock}
      </div>
      <div className={styles.textContainer}>
        <p className={styles.commentText}>
          {props.comment.text}
        </p>
      </div>
    </div>
  )
}

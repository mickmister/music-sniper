import React, {useRef} from 'react'
import {Link} from 'react-router-dom'
import useRouter from 'use-react-router'
import {useStore} from 'easy-peasy'

import SongUploader, {SongUploaderProps} from '../song-uploader'
import styles from './navbar.module.scss'
import Avatar from '../avatar/avatar';

export default function Navbar() {
  const {location} = useRouter()

  const user = useStore(state => state.users.currentUser)
  const avatar = user && (
    <Avatar
      user={user}
      shouldUpload
    />
  )

  if (location.pathname === '/login') {
    return <div className={styles.navbar} />
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.leftSideContainer}>
        <Link className='btn btn-primary' to={`/songs`}>
          Home
        </Link>
        <SongUploader />
      </div>
      <div className={styles.avatarContainer}>
        {avatar}
      </div>
    </div>
  )
}

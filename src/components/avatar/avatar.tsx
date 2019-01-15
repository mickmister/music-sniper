import React, {useRef} from 'react'
import {useAction} from 'easy-peasy'

import { User } from '../../store/user/user-store.types'

const styles = {

}

type Props = {
  user: User,
  shouldUpload: boolean,
}

export default function Avatar(props: Props) {
  const {user, shouldUpload} = props

  const uploadAvatar = useAction(dispatch => dispatch.users.uploadAvatar)
  const fileRef = useRef(null)

  const pickFile = () => {
    if (!shouldUpload) {
      return
    }

    fileRef.current.click()
  }

  const didChooseFile = (e: any) => {
    const {files} = e.target
    if (files && files[0]) {
      uploadAvatar(files[0])
    }
  }

  return (
    <div>
      <p>{user.username}</p>
      <img
        src={user.image_url}
        width={140}
        height={140}
        className={styles.userImage}
        onClick={pickFile}
      />
      <input ref={fileRef} type='file' style={{display: 'none'}} onChange={didChooseFile} />
    </div>
  )
}

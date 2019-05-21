import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'

import styles from './modal.module.scss'

export type HideModalFunction = () => void,

type Props = {
  children: (fn: HideModalFunction) => React.ReactNode,
  label: string,
}

export default function ModalButton(props: Props) {
  const [visible, setVisible] = useState(false)

  const show = () => setVisible(true)
  const hide = () => setVisible(false)

  return (
    <>
      <Button onClick={show} variant='contained' color='primary'>
        {props.label}
      </Button>
      <Modal
        open={visible}
        onClose={hide}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div className={styles.modal}>
          {props.children(hide)}
        </div>
      </Modal>
    </>
  )
}

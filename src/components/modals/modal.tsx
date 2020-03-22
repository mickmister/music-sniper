import React from 'react'
import Modal from '@material-ui/core/Modal'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'

type Props = {
    opened: boolean
    closeModal: () => void
}

const modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
)

export default function Modal(props: Props) {
    const classes = useStyles()

    return (
        <Modal
            style={modalStyle}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
            open={props.opened}
            onClose={props.closeModal}
        >
            <div
                className={classes.paper}
            >
                {props.children}
            </div>
        </Modal>
    )
}

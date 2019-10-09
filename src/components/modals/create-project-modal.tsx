import React from 'react'
import Modal from '@material-ui/core/Modal'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import modalStyles from './modals.module.scss'
import Button from '@material-ui/core/Button';
import { CreateProjectModalInner } from './create-project-modal-inner';
import { IGlobalStore } from '../../store/store-types';
import { useStoreActions, Actions } from 'easy-peasy';

type Props = {
    open: boolean,
}

const modalStyle = {
    top: `50%`,
    left: `0%`,
    // transform: `translate(-${top}%, -${left}%)`,
  };

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
);


export default function CreateProjectModal (props: Props) {
    const handleClose = () => {}
    const classes = useStyles()
    const closeModal = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.modals.closeCreateProjectModal)

    return (
        <Modal
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
            open={props.open}
            onClose={handleClose}
        >
            <div style={modalStyle} className={classes.paper}>
                <h1>Create Project</h1>
                <CreateProjectModalInner closeModal={closeModal} />
            </div>
      </Modal>
    )
};

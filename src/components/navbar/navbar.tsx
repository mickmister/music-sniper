import React, {useRef} from 'react'
import {Link} from 'react-router-dom'
import useRouter from 'use-react-router'
import {useStore} from 'easy-peasy'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import SongUploader, {SongUploaderProps} from '../song-uploader'
import styles from './navbar.module.scss'
import Avatar from '../avatar/avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function Navbar() {
  const {location} = useRouter()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  }

  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <div>
          <IconButton
            edge="start"
            className={'classes.menuButton'}
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link to={`/`}>
                Home
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <SongUploader />
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )

  return (
    <div className={styles.navbar}>
      <div className={styles.leftSideContainer}>
        <Link to={`/`}>
          <Button variant='contained'>
            Home
          </Button>
        </Link>
        <SongUploader />
      </div>
      <div className={styles.avatarContainer}>
        {avatar}
      </div>
    </div>
  )
}

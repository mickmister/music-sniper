import React, {useRef} from 'react'
import {Link} from 'react-router-dom'
import useRouter from 'use-react-router'
import {useStoreState, State} from 'easy-peasy'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import {useSongUpload} from '../../hooks/hooks'
import styles from './navbar.module.scss'
import Avatar from '../avatar/avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IGlobalStore } from '../../store/store-types'

export default function Navbar() {
  const {location} = useRouter()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const user = useStoreState((state: State<IGlobalStore>) => state.users.currentUser)
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

  const [SongUpload, chooseAudioFile] = useSongUpload()

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
              <div>
                <span onClick={chooseAudioFile}>Upload Song</span>
                {SongUpload}
              </div>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

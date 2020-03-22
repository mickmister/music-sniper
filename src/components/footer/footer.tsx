import React from 'react'
import {useStoreState, State, useStoreActions, Actions} from 'easy-peasy'

import SongPlayer from '../song-player/song-player'
import {IGlobalStore} from '../../store/store-types'

import styles from './footer.module.scss'

export default function Footer() {
    const spriteInfo = useStoreState((state: State<IGlobalStore>) => state.songs.activeSpriteInfo)
    const seekActiveSprite = useStoreActions((state: Actions<IGlobalStore>) => state.songs.seekActiveSprite)
    const activeSprite = useStoreState((state: State<IGlobalStore>) => state.songs.activeSpriteContainer)

    const [show, setShow] = React.useState(true)

    if (location.pathname === '/login') {
        return <div className={styles.footer}/>
    }

    return null

    const buttonText = show ? 'Hide' : 'Show'
    const showButton = (
        <button onClick={() => setShow(!show)}>
            {buttonText}
        </button>
    )

    const style = {}
    if (!show) {
        style.display = 'none'
    }

    return (
        <div className={styles.footer}>
            <div style={style}>
                <SongPlayer
                    spriteInfo={spriteInfo}
                    onSeek={seekActiveSprite}
                    activeSpriteContainer={activeSprite}
                />
            </div>
            {showButton}
        </div>
    )
}

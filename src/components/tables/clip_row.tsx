import React from 'react'
import {useStoreActions, Actions, useStoreState, State} from 'easy-peasy'

import {Link} from 'react-router-dom'
import {Icon, Table} from 'semantic-ui-react'
import {PlayButton, PauseButton} from 'react-player-controls'

import {Clip} from '../../types/music-types'
import {IGlobalStore} from '../../store/store-types'
import {clipsAreEqual} from '../../util/utils'
import SongPlayer from '../song-player/song-player'
import {displayTime} from '../../util/display-time'

type Props = {
    clip: Clip
}

export default function ClipRow({clip}: Props) {
    const playClip = useStoreActions((dispatch: Actions<IGlobalStore>) => dispatch.songs.forcePlayClip)
    const play = () => playClip(clip)

    const spriteInfo = useStoreState((state: State<IGlobalStore>) => state.songs.activeSpriteInfo)
    const seekActiveSprite = useStoreActions((state: Actions<IGlobalStore>) => state.songs.seekActiveSprite)
    const activeSprite = useStoreState((state: State<IGlobalStore>) => state.songs.activeSpriteContainer)

    let button = (
        <PlayButton
            isEnabled={true}
            onClick={play}
        />
    )

    if (spriteInfo && clipsAreEqual(spriteInfo.section, clip) && spriteInfo.playing) {
        button = <PauseButton onClick={play}/>
    }

    let player = (
        <div>
            {button}
            <p>
                {displayTime(clip.start_time)}
                {' - '}
                {displayTime(clip.end_time)}
            </p>
        </div>
    )
    if (spriteInfo && clipsAreEqual(spriteInfo.section, clip)) {
        player = (
            <SongPlayer
                show={true}
                spriteInfo={spriteInfo}
                onSeek={seekActiveSprite}
                activeSpriteContainer={activeSprite}
            />
        )
    }
    const audioFile = useStoreState((state: State<IGlobalStore>) => state.songs.audioFiles).find((f) => f.id === clip.audio_file_id)

    return (
        <Table.Row>
            <Table.Cell>
                <p>{clip.name}</p>
                {player}
            </Table.Cell>
            <Table.Cell>
                <Link to={`/songs/${clip.audio_file_id}/play`}>
                    <Icon
                        name={'file'}
                    />
                    {audioFile && audioFile.file_name}
                </Link>
            </Table.Cell>
        </Table.Row>
    )
}

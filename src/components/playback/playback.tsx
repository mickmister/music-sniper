import React from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'

import '../../styles/styles'
import '../../music-processing/audio-slicer'
import {Percentage, Section} from 'types/music-types'

import SongLoader from '../../services/song-loader'
import SeekBarContainter from '../../components/seek-bar-container'

import {StaticSprite} from '../../music-processing/static-sprite'
import {SpriteContainer} from '../../music-processing/sprite-container'
import {DynamicSprite} from '../../music-processing/sprite'
import {SpriteInformation} from '../../types/music-types'
import {displayTime} from '../../util/display-time'

export interface PlaybackProps {
    spriteContainer: SpriteContainer | null;
    setSpriteContainer: (spriteContainer: SpriteContainer) => {};
    setSpriteStart: (num: number) => {};
    setSpriteEnd: (num: number) => {};
}

export default class PlaybackComponent extends React.PureComponent<PlaybackProps> {
    songLoader = new SongLoader()
    state = {
        songs: [],
        currentSeek: 0,
        currentFullSeek: 0,
        startPercent: 0,
        endPercent: 0,
        refresh: false,
    }
    componentDidMount() {
        this.fetchSongData()
    }

    onSeek = (seekValue: Percentage) => {
        const {spriteContainer} = this.props
        if (spriteContainer) {
            spriteContainer.sprite.seekPercentage(seekValue)
        }
        this.setState({currentSeek: seekValue})
    }

    fetchSongData = async () => {
        const {data} = await axios.get('/public/data/song-data.json')
        const fileName = data.songs[0].fileName
        const blobUrl = await this.songLoader.fetch(fileName)
        this.makeSprite(blobUrl, data)
    }

    makeSprite = (blobUrl: string, data: any) => {
        const section = data.songs[0].sections[0] as Section
        const sprite = new DynamicSprite(blobUrl, {...section})
        const spriteContainer = new SpriteContainer(sprite, data.songs[0].sections)
        spriteContainer.getObsvervableForInterval().subscribe((spriteInfo: SpriteInformation) => {
            this.setState({currentSeek: spriteInfo.spriteProgress})
        })
        this.props.setSpriteContainer(spriteContainer)
    }

    changeSpriteStart = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.setSpriteStart(parseFloat(e.target.value))
    }

    changeSpriteEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.setSpriteEnd(parseFloat(e.target.value))
    }

    setStartToCurrentSeek = () => {
        const newValue = this.props.spriteContainer.sprite.getSpriteInfo().songPosition
        this.props.setSpriteStart(newValue)
    }

    setEndToCurrentSeek = () => {
        const newValue = this.props.spriteContainer.sprite.getSpriteInfo().songPosition
        this.props.setSpriteEnd(newValue)
    }

    render() {
        const seekProps = {
            onSeek: this.onSeek,
            seekValue: this.state.currentSeek,
            currentPercent: this.state.currentSeek,
        }
        const {spriteContainer} = this.props
        const {sprite} = spriteContainer || {}

        return (
            <div>
                <SeekBarContainter {...seekProps}/>
                <Button onClick={() => sprite.play()}>Play</Button>
                <Button onClick={() => sprite.pause()}>Pause</Button>
                <Button onClick={() => sprite.stop()}>Stop</Button>
                <Button onClick={this.setStartToCurrentSeek}>Set Begin</Button>
                <Button onClick={this.setEndToCurrentSeek}>Set End</Button>
                <div>
                    <div>
                        <input
                            type='number'
                            step={0.1}
                            style={{fontSize: '20px'}}
                            onChange={this.changeSpriteStart}
                            value={(sprite && sprite.section.start.toFixed(2)) || ''}
                        />
                        <input
                            style={{fontSize: '20px'}}
                            value={(sprite && displayTime(sprite.section.start)) || ''}
                        />
                    </div>
                    <div>
                        <input
                            type='number'
                            step={0.1}
                            style={{fontSize: '20px'}}
                            onChange={this.changeSpriteEnd}
                            value={(sprite && sprite.section.end.toFixed(2)) || ''}
                        />
                        <input
                            style={{fontSize: '20px'}}
                            value={(sprite && displayTime(sprite.section.end)) || ''}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

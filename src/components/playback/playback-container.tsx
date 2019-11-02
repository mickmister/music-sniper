import * as React from 'react'

import Playback from './playback'

export interface PlaybackContainerProps {
}

export interface PlaybackContainerState {
}

export default class PlaybackContainerComponent extends React.PureComponent<PlaybackContainerProps, PlaybackContainerState> {
    constructor(props: PlaybackContainerProps) {
        super(props)
        this.state = {
        }
    }

    public render() {
        return (
            <Playback {...this.props}/>
        )
    }
}

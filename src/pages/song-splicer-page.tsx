import React from 'react'

export interface SongSplicerPageProps {
}

export interface SongSplicerPageState {
}

export default class SongSplicerPage extends React.PureComponent<SongSplicerPageProps, SongSplicerPageState> {
    constructor(props: SongSplicerPageProps) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <p>SongSplicerPage Component</p>
            </div>
        )
    }
}

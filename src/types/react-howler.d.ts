declare module 'react-howler' {
    import React from 'react'
    export type ReactHowlerProps = {
        src: string,
        playing: boolean,
        seek: number,
        html5?: boolean,
        onPlay?: (...args: any[]) => void,
        onPause?: (...args: any[]) => void,
        onStop?: (...args: any[]) => void,
        ref?: (...args: any[]) => void,
    }
    export default class ReactHowler extends React.PureComponent<ReactHowlerProps> {}
}

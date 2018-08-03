declare module 'react-howler' {
  import React from 'react'
  export type ReactHowlerProps = {
    src: string,
    playing: boolean,
    seek: number,
  }
  export default class ReactHowler extends React.Component<ReactHowlerProps> {}
}

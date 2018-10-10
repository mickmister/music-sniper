import * as React from 'react';
import './styles/styles'
import DoubleSeekBarContainer from './components/double-seek-bar/double-seek-bar-container'

export interface ScratchProps {
}

export interface ScratchState {
}

export default class ScratchComponent extends React.Component<ScratchProps, ScratchState> {
  constructor(props: ScratchProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <div>
        <DoubleSeekBarContainer />
      </div>
    );
  }
}

import * as React from 'react';

import './styles/styles';
import DoubleSeekBarContainer from './components/double-seek-bar/double-seek-bar-container';

export type ScratchProps = {}

export type ScratchState = {}

export default class ScratchComponent extends React.PureComponent<ScratchProps, ScratchState> {
    constructor(props: ScratchProps) {
        super(props);
        this.state = {
        };
    }

    public render() {
        return (
            <div>
                <DoubleSeekBarContainer/>
            </div>
        );
    }
}

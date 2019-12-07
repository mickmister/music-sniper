import React from 'react'
import {shallow} from 'enzyme'
import {StoreProvider} from 'easy-peasy'

import store, {StoreInit} from '../../../src/store/store'

import ShowSongPage from '../../../src/pages/show-song-page'

function Wrap({children}) {
    return (
        <StoreProvider store={store}>
            {children}
        </StoreProvider>
    )
}

describe('ShowSongPage', () => {
    it('should match snapshot', () => {
        const wrapper = shallow(
            <Wrap>
                <ShowSongPage match={{params: {id: '1'}}}/>
            </Wrap>
        )

        expect(wrapper).toMatchSnapshot()
    })
})

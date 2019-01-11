import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import {StoreProvider} from 'easy-peasy'

import './config'
import './styles/styles'

import store, {StoreInit} from './store/store'

import Main from './main'
import ChooseSongPage from './pages/choose-song/choose-song-page'
import SongSplicerPage from './pages/song-splicer/song-splicer-page'
import ShowSongPage from './pages/show-song/show-song-page'
// import Scratch from './scratch'

import AllContexts from './contexts/all-contexts'

const root = document.getElementById('main')

ReactDOM.render(
  // @ts-ignore
  <BrowserRouter>
    <StoreProvider store={store}>
      <StoreInit>
        <AllContexts>
          <Route exact path="/" component={() => <Redirect exact from="/" to="/songs" />} />
          <Route path="/songs" exact component={ChooseSongPage} />
          <Route path="/songs/:id/splice" component={SongSplicerPage} />
          <Route path="/songs/:id/play" component={ShowSongPage} />
        </AllContexts>
      </StoreInit>
    </StoreProvider>
  </BrowserRouter>,
  root,
)

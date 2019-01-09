import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import './config'
import './styles/styles'

import Main from './main'
import ChooseSongPage from './pages/choose-song/choose-song-page'
import SongSplicerPage from './pages/song-splicer/song-splicer-page'
import ShowSongPage from './pages/show-song/show-song-page'
// import Scratch from './scratch'

import {SongChooserProvider} from './contexts/song-chooser-context'

const root = document.getElementById('main')

ReactDOM.render(
  // @ts-ignore
  <BrowserRouter>
    <SongChooserProvider>
      <div>
        <Route path="/choose-song" component={ChooseSongPage} />
        <Route path="/song-splicer" component={SongSplicerPage} />
        <Route path="/show-song/:id" component={ShowSongPage} />
        <Route exact path="/" component={() => <Redirect exact from="/" to="/choose-song" />} />
      </div>
    </SongChooserProvider>
  </BrowserRouter>,
  root,
);

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Main from './main'
import SongChooserPage from './pages/song-chooser/song-chooser-page';
import SongSplicerPage from './pages/song-splicer/song-splicer-page';
// import Scratch from './scratch'

const root = document.getElementById('main')

ReactDOM.render(
  // @ts-ignore
  <BrowserRouter>
    <div>
      <Route path="/song-chooser" component={SongChooserPage} />
      <Route path="/song-splicer" component={SongSplicerPage} />
      <Route exact path="/" component={() => <Redirect exact from="/" to="/song-chooser" />} />
    </div>
  </BrowserRouter>,
  root,
);

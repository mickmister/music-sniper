import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import {StoreProvider} from 'easy-peasy'

import JavascriptTimeAgo from 'javascript-time-ago'

// The desired locales.
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'


import './config'
import './styles/styles'

import store, {StoreInit} from './store/store'

import LoginPage from './pages/login-page'
import ChooseSongPage from './pages/choose-song-page'
import SongSplicerPage from './pages/song-splicer-page'
import ShowSongPage from './pages/show-song-page'
import ShowProjectPage from './pages/show-project-page'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import Mobile from './components/mobile/mobile'
import AllModals from './components/modals/all-modals'
import DashboardPage from './pages/dashboard-page'

// Initialize the desired locales.
JavascriptTimeAgo.locale(en)
JavascriptTimeAgo.locale(ru)

const root = document.getElementById('main')

ReactDOM.render(
    <BrowserRouter>
        <StoreProvider store={store}>
            <StoreInit>
                <Navbar/>
                <Route
                    exact={true}
                    path='/'
                    component={(): JSX.Element => (
                        <Redirect
                            exact={true}
                            from='/'
                            to='/dashboard'
                        />
                    )}
                />
                <Route
                    path='/dashboard'
                    exact={true}
                    component={DashboardPage}
                />
                <Route
                    path='/login'
                    exact={true}
                    component={LoginPage}
                />
                <Route
                    path='/songs'
                    exact={true}
                    component={ChooseSongPage}
                />
                <Route
                    path='/songs/:id/splice'
                    component={SongSplicerPage}
                />
                <Route
                    path='/songs/:id/play'
                    component={ShowSongPage}
                />
                <Route
                    path='/projects/:id'
                    component={ShowProjectPage}
                />
                <Footer/>
                <AllModals/>
            </StoreInit>
        </StoreProvider>
    </BrowserRouter>,
    root,
)

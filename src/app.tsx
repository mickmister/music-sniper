import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import {StoreProvider} from 'easy-peasy'

import JavascriptTimeAgo from 'javascript-time-ago'

// The desired locales.
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

import {loadProgressBar} from 'axios-progress-bar'
loadProgressBar()

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
import DesignPage from './pages/design-page'

import LeftSidebar from './components/sidebars/left-sidebar'
import RightSidebar from './components/sidebars/right-sidebar'
import sidebarStyles from './components/sidebars/sidebars.module.scss'

// Initialize the desired locales.
JavascriptTimeAgo.locale(en)
JavascriptTimeAgo.locale(ru)

const root = document.getElementById('main')

ReactDOM.render(
    <BrowserRouter>
        <StoreProvider store={store}>
            <StoreInit>
                <div className='container-fluid'>
                    <div>
                        <Navbar/>
                        <div className='row' style={{height: 'calc(100% - 67px)'}}>
                            <LeftSidebar/>
                            <div className={sidebarStyles.mainContent}>

                                <Route
                                    exact={true}
                                    path='/'
                                    component={(): JSX.Element => (
                                        <Redirect
                                            exact={true}
                                            from='/'
                                            to='/design'
                                        />
                                    )}
                                />
                                <Route
                                    path='/dashboard'
                                    exact={true}
                                    component={DashboardPage}
                                />
                                <Route
                                    path='/design'
                                    exact={true}
                                    component={DesignPage}
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
                            </div>
                            <RightSidebar/>
                        </div>
                        <Footer/>
                        <AllModals/>
                    </div>
                </div>
            </StoreInit>
        </StoreProvider>
    </BrowserRouter>,
    root,
)

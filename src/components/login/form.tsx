import React from 'react'

import {withStyles} from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Card from '@material-ui/core/Card'
import Fade from '@material-ui/core/Fade'

// import TabContent from './components/TabContent'
// import Login from './Login'
// import Register from './Register'

// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center'
//   },
//   card: {
//     flexGrow: 1,
//     [theme.breakpoints.up('sm')]: {
//       flexBasis: '25rem',
//       flexGrow: 0
//     }
//   }
// })

enum TabStates {
  LOGIN_TAB = 0,
  REGISTER_TAB = 1,
}

type State = {
  selectedTab: number;
}

class LoginRegister extends React.PureComponent {
  state = {
    selectedTab: TabStates.LOGIN_TAB,
  }

  getInnerForm = () => {
    const {selectedTab} = this.state

    switch (selectedTab) {
      case TabStates.LOGIN_TAB:
        return (
          <div>
            <h1>Login</h1>
          </div>
        )

      case REGISTER_TAB:
        return (
          <div>

          </div>
        )
    }
  }

  handleTabChange = (event: Event, value: number) => {
    this.setState({tab: value});
  }

  render() {
    const {selectedTab} = this.state

    const activeTab = this.getInnerForm()

    return (
      <div className={classes.root}>
        <Card className={classes.card}>

          {
            (!disableLocal && !disableRegister) &&
            <Tabs
              value={this.state.selectedTab}
              onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Login"/>
              <Tab label="Register"/>
            </Tabs>
          }

          {
            transitionTimeout > 0 ?
              <Fade key={tab} in={true} timeout={transitionTimeout}>
                {activeTab}
              </Fade>
              : activeTab
          }

        </Card>
      </div>
    )
  }

  // handleTabChange = (event, value) => {
  //   this.setState({tab: value})
  // }
}

// export default withStyles(styles)(LoginRegister)

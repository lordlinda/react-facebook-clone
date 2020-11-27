import './App.css';
import Header from './components/Header'
import Login from './components/Login';
import { connect } from 'react-redux'
import { getUserData } from './redux/actions/UserActions'
import { SET_AUTHENTICATED } from './redux/actions/types'
import store from './redux/store'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home';
import ProfilePage from './components/ProfilePage';
if (localStorage.token) {
  store.dispatch({ type: SET_AUTHENTICATED })
  store.dispatch(getUserData())
}
function App(props) {
  const { auth } = props
  return (
    <div className="app">
      {!auth ? <Login /> : (
        <Router>
          {/**Header */}
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/:user' component={ProfilePage} />
          </Switch>

        </Router>
      )}


    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.user.authenticated
  }
}

export default connect(mapStateToProps)(App);

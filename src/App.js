import React,{Component} from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import AppNew from './App_new'
import firebase from './Firebase'
import LogIn from './components/Login'
import SignUp from './components/Signup'
import PrivateRoute from './PrivateRoute'
import Edit from './components/Edit_new'
import Show from './components/Show'
import ShowNew from './components/Show_new'
import Create from './components/Create_new'

class App extends Component {
  state = { loading: true, authenticated: false, user: null };

  render() {
    const { authenticated, loading } = this.state;

    if (loading) {
      return <p>Loading..</p>;
    }

    return (
      <Router>
        <div>
          <PrivateRoute
            exact
            path="/"
            component={AppNew}
            authenticated={authenticated}
          />  
          <Route path='/edit/:id' component={Edit} />
          <Route path='/create' component={Create} />
          <Route path='/show/:id' component={ShowNew} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    );
  }


componentWillMount() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      this.setState({
        authenticated: true,
        currentUser: user,
        loading: false
      });
    } else {
      this.setState({
        authenticated: false,
        currentUser: null,
        loading: false
      });
    }
  });
}
}

export default App;
import React , {useReducer} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getUser } from "./Utils/Common";
import Login from "./components/login";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import AddHabit from "./components/AddHabit";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Container} from "reactstrap"
import reducer from  "./context/reducer"
import { HabitContext } from "./context/Context"
import {ViewHabit } from  "./components/viewHabit"
import {removeUserSession} from "./Utils/Common"
function App() {
    
  let User = getUser();
  const initialState = {
    habits: [],
    habit: {},
    habitToUpdate: null,
    habitToUpdateKey: null,
    isLoading: false
  };

  const ApplyLogOut = () => {
      return removeUserSession();
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Habit-Builder</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
            {User ? (
             <li className="nav-item">
            <Link className="nav-link" to={"/sign-in"} onClick = {ApplyLogOut}>Log-out</Link>
            </li>) : (
              <>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
              </>
               ) }
            </ul>
          </div>
        </div>
      </nav>

      <div className="outer">
        <div className="inner">
        <ToastContainer />
        <HabitContext.Provider value={{state,dispatch}}>
         <Container>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path = "/home" component = {Home} />
            <Route path = "/habit-form" component = {AddHabit} />
            <Route path = "/habit-view" component = {ViewHabit} />
          </Switch>
        </Container>
        </HabitContext.Provider> 
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
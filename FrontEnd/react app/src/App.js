import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import history from './history';
import Login from './views/login';
import Service from './views/service';
import Dashboard from './views/Dashboard';
import register from './views/register';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch> 
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/service' component={Service}></Route>
          <Route exact path='/dashboard' component={Dashboard}></Route>
          <Route exact path='/register' component={register}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

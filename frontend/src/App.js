import React, { Suspense, useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './Components/layout/Layout';
import LoadingSpinner from './Components/UI/LoadingSpinner';
import './App.css';

const Home = React.lazy(() => import ('./Pages/Home'));
const Login = React.lazy(() => import ('./Pages/Login'));
const Register = React.lazy(() => import ('./Pages/Register'));
const Profile = React.lazy(() => import ('./Pages/Profile'));
const NotFound = React.lazy(() => import ('./Pages/NotFound'));
const EcstaApp = React.lazy(() => import ('./EcstaStream/EcstaApp.js'));

function App() {

  const [isAuth, setIsAuth] = useState(false);   
    useEffect(() => {     
      if (localStorage.getItem('token') !== null) {        
        setIsAuth(true); 
    }    
  }, [isAuth]);
  console.log(`Auth: ${isAuth}`)

  return (
    <Layout>
      <Suspense 
        fallback={
          <LoadingSpinner />
        }
      >
        <Switch>
          <Route path='/' exact>
            <Redirect to='/fahrenheit' />  
          </Route>
          <Route path='/fahrenheit' exact>
            <Home /> 
          </Route>
          <Route path='/fahrenheit/user/login/'>
            <Login />
          </Route>    
          <Route path='/fahrenheit/user/register/'>
            <Register />
          </Route>
          <Route path='/fahrenheit/user-profile/'>
            <Profile />
          </Route>
          <Route path='/fahrenheit/ecstastream'>
            <EcstaApp />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;

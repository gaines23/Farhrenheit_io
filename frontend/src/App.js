import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './Components/layout/Layout';
import LoadingSpinner from './Components/UI/LoadingSpinner';

import './App.css';

const Home = React.lazy(() => import ('./Pages/Home'));
const Login = React.lazy(() => import ('./Pages/Login'));
const NotFound = React.lazy(() => import ('./Pages/NotFound'));
const EcstaApp = React.lazy(() => import ('./EcstaStream/EcstaApp.js'));

function App() {
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
          <Route path='/fahrenheit/login'>
            <Login />
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

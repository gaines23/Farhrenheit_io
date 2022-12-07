import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './Components/layout/Layout';
import LoadingSpinner from './Components/UI/LoadingSpinner';

import './App.css';

const Home = React.lazy(() => import ('./Pages/Home'));
const NotFound = React.lazy(() => ('./Pages/NotFound'));

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
          <Route path='/ecstastream'>

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

import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

import './App.css';

const Home = React.lazy(() => import ('./Pages/Home'));
// const SearchResults = React.lazy(() => import ('./Pages/SearchResults'));
// const Profile = React.lazy(() => import ('./Pages/Profile'));
// const MovieDetails = React.lazy(() => import ('./Pages/MovieDetails'));
// const TvDetails = React.lazy(() => import ('./Pages/TvDetails'));
// const CreditDetails = React.lazy(() => import ('./Pages/CreditDetails'));
// const Playlist = React.lazy(() => ('./Pages/Playlists'));
// const News = React.lazy(() => ('./Pages/News'));
// const NotFound = React.lazy(() => ('./Pages/NotFound'));

function App() {
  return (
    <Layout>
      <Suspense 
        fallback={
          <LoadingSpinner />
        }
      >
        <Switch>
          <Route path='/fahrenheit/ecstastream' exact>
            <Home />
          </Route>
          {/* <Route path='/ecstastream/search/:query'>
            <SearchResults />
          </Route>
          <Route path='/details/:id/:media_type(movie)'>
            <MovieDetails />
          </Route>
          <Route path='/details/:id/:media_type(tv)'>
            <TvDetails />
          </Route>
          <Route path='/credit-details/:tmdbId/:imdbId'>
            <CreditDetails />
          </Route>
          <Route path='/playlist/:userId/:title'>
            <Playlist />
          </Route>
          <Route path='/Profile/:userId/:username'>
            <Profile />
          </Route>
          <Route path='/ecstastream/news'>
            <News />
          </Route> */}
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;

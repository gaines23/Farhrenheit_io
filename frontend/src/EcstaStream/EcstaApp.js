import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import LoadingSpinner from '../Components/UI/LoadingSpinner';

const Home = React.lazy(() => import ('./Pages/Home'));
const SearchResults = React.lazy(() => import ('./Pages/SearchResults'));
const MovieDetails = React.lazy(() => import ('./Pages/MovieDetails'));
const TvDetails = React.lazy(() => import ('./Pages/TvDetails'));
const CreditDetails = React.lazy(() => import ('./Pages/CreditDetails'));
const Playlists = React.lazy(() => import ('./Pages/Playlists'));
const PlaylistDetails = React.lazy(() => import ('./Pages/PlaylistDetails'));
const WatchList = React.lazy(() => import ('./Pages/Watchlist'));
const Favorites = React.lazy(() => import ('./Pages/Favorites'));
// const News = React.lazy(() => ('./Pages/News'));

function EcstaApp() {
  return (
    <Layout>
      <Suspense 
        fallback={
          <LoadingSpinner />
        }
      >
        <Switch>
          <Route path='/fahrenheit/ecstastream' exact>
            <Redirect to='/fahrenheit/ecstastream/home' />
          </Route>
          <Route path='/fahrenheit/ecstastream/home'>
            <Home />
          </Route>
          <Route path='/fahrenheit/ecstastream/search/:query'>
            <SearchResults />
          </Route>
           <Route path='/fahrenheit/ecstastream/details/:id/:media_type(movie)'>
            <MovieDetails />
          </Route>
          <Route path='/fahrenheit/ecstastream/details/:id/:media_type(tv)'>
            <TvDetails />
          </Route>
          <Route path='/fahrenheit/ecstastream/credit-details/:tmdbId/:imdbId'>
            <CreditDetails />
          </Route>
          <Route path='/fahrenheit/ecstastream/user-playlists'>
            <Playlists />
          </Route>
          <Route path='/fahrenheit/ecstastream/playlist/details/:id/:title/:user'>
            <PlaylistDetails />
          </Route>
          <Route path='/fahrenheit/ecstastream/playlist/watchlist/details'>
            <WatchList />
          </Route>   
          <Route path='/fahrenheit/ecstastream/playlist/favorites/details'>
            <Favorites />
          </Route>   
      {/*
          <Route path='/ecstastream/news'>
            <News />
          </Route> 
      */}
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default EcstaApp;

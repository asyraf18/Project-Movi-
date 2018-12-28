import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import Movies from './Movies';
import Confirmation from './Confirmation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { apiMiddleware, reducer } from './redux';

const store = createStore(reducer, {}, applyMiddleware(apiMiddleware));

store.dispatch({type: 'GET_MOVIE_DATA'});

Navigation.registerComponent('Movies.Confirmation', () => Confirmation, store, Provider);
Navigation.registerComponent('Movies.Main', () => Movies, store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'Movies.Main', 
    navigatorStyle: {
      navBarHidden: true
    }, 
    navigatorButtons: {} 
  },
  passProps: {}, 
  animationType: 'slide-up'
});

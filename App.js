import React, { Component } from 'react';
import { ScreenOrientation } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import Router from './src/Router';
import reducers from './src/reducers';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

console.disableYellowBox = true;

class App extends Component {

  componentWillMount() {
    ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);

    var config = {
      apiKey: "AIzaSyBRGWMcm4x7COgdFjKvFaTuBg2JQntKoCA",
      authDomain: "digital-marketing-9c024.firebaseapp.com",
      databaseURL: "https://digital-marketing-9c024.firebaseio.com",
      projectId: "digital-marketing-9c024",
      storageBucket: "digital-marketing-9c024.appspot.com",
      messagingSenderId: "579944537136"
    };

    !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }

}

export default App;
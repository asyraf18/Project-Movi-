import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator } from 'react-navigation'
import Loading from './src/Loading'
import SignUp from './src/SignUp'
import Login from './src/Login'
import Main from './src/Main'
const App = SwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
)
export default App
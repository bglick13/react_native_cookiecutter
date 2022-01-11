import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import * as SplashScreen from 'expo-splash-screen';
import my_app, {setClientToken} from './constants';
import { Appbar } from 'react-native-paper';


const Drawer = createDrawerNavigator();

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import merge from 'deepmerge';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const initialState = {
  bearer_token: '',
  settings: {
    last_page: "Home",

  }
}

export const Context = React.createContext(initialState);

const Reducer = (prevState, action) => {
    switch (action.type) {
      case 'SET_BEARER_TOKEN':
        setClientToken(action.payload);
        return {
          ...prevState,
          bearer_token: action.payload
        }
      case "SET_SETTINGS":
        return {
          ...prevState,
          settings: action.payload,
        }
      default:
        return prevState;
    }
  };


export default function App() {
  const [state, dispatch] = React.useReducer(Reducer, initialState);
  const [appIsReady, setAppIsReady] = React.useState(false);


  React.useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here

        await my_app.get('/settings/')
        .then((res) => {
          dispatch({type: 'SET_SETTINGS', payload: res.data});
        })
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, [state.bearer_token]);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Context.Provider value={[state, dispatch]}>
      <PaperProvider theme={CombinedDarkTheme}>
        <NavigationContainer theme={CombinedDarkTheme}>
          <Drawer.Navigator
            initialRouteName={state.settings.last_page}
            screenOptions={
              {drawerType: "permanent",
            header: (props) => <div />}
            }
          >
            {state.bearer_token === '' ?
            (<>
              <Drawer.Screen name="Login" component={LoginScreen}/>
            </>) :
            (<>
            <Drawer.Screen name="Home" component={HomeScreen} options={
              {title: "Home"}
              } />
            <Drawer.Screen name="Settings" component={SettingsScreen} options={
              {title: "Settings"}
              } />
            </>)}
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Context.Provider>
    
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});

import React from 'react';
import { Redirect } from 'expo-router';

import "../global.css";
import {useFonts} from "expo-font";

const App = () => {
  useFonts({
    Geologica: require('../assets/fonts/Geologica-Regular.ttf'),
  });

  return <Redirect href="/home" />;
};

export default App;

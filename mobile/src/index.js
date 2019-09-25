import React from 'react';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);


// importanto páginas
import Routes from './routes';

export default function App() {
  return (
    <Routes />
  );
}
// File: /src/App.js
import React from 'react';
import { SafeAreaView } from 'react-native';
import UserProfile from './UserProfile';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UserProfile />
    </SafeAreaView>
  );
};

export default App;

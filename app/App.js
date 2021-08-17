import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { QueryClientProvider, QueryClient } from 'react-query';
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <View></View>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({});

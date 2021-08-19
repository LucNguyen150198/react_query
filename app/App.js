import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { QueryClientProvider, QueryClient } from 'react-query';
import RootNavigation from './navigation/RootNavigation';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: 'always',
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <RootNavigation />
      </View>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

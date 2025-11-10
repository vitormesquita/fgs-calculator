import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FGTSForm } from '../screens/FGTSForm';
import { FGTSProvider } from '../context/FGTSContext';
import { FGTSResult } from '../screens/FGTSResult';
import { getFGTSInfo } from "../storage/fgtsStorage";
import { useState, useEffect  } from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

export function RootStack() {
  const [initialRoute, setInitialRoute] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function boot() {
      const saved = await getFGTSInfo();
      if (saved) {
        setInitialRoute("FGTSResult");
      } else {
        setInitialRoute("FGTSForm");
      }
    }
    boot();
  }, []);

  if (initialRoute === null || initialRoute === undefined) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="primary" />
        <Text className="text-primary text-base font-normal">Carregando...</Text>
      </View>
    );
  }
  
  return (
    <FGTSProvider>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FGTSForm" component={FGTSForm} />
        <Stack.Screen name="FGTSResult" component={FGTSResult} />
      </Stack.Navigator>
    </FGTSProvider>
  );
}

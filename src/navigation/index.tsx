import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FGTSForm } from '../screens/FGTSForm';
import { FGTSProvider } from '../context/FGTSContext';
import { FGTSResult } from '../screens/FGTSResult';

const Stack = createNativeStackNavigator();

export function RootStack() {
  return (
    <FGTSProvider>
      <Stack.Navigator initialRouteName="FGTSForm" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FGTSForm" component={FGTSForm} />
        <Stack.Screen name="FGTSResult" component={FGTSResult} />
      </Stack.Navigator>
    </FGTSProvider>
  );
}

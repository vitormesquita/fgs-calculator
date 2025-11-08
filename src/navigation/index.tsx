import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FGTSForm } from '../screens/FGTSForm';

const Stack = createNativeStackNavigator();

export function RootStack() {
  return (
    <Stack.Navigator initialRouteName="FGTSForm" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FGTSForm" component={FGTSForm} />
    </Stack.Navigator>
  );
}

import { View, Text, Image, Pressable, Alert } from "react-native";
import Logo from '../assets/icons/logo.svg';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "../utils/extensions/stringExtensions";
import { useFGTS } from "../context/FGTSContext";
import { calculateFGTSWithdrawalUseCase } from "../useCases/calculateFGTSWithdrawalUseCase";
import { centsToReais, formatCurrency } from "../utils/formatters/currency";
import { Ellipsis } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import { clearFGTS } from "../storage/fgtsStorage";
import { FGTSInfo } from "../models";

export function FGTSResult() {
  const { info, setInfo } = useFGTS();
  const navigation = useNavigation();
  const bgResult = require('../assets/images/bg-result.jpeg');
  const insets = useSafeAreaInsets();

  const withdrawalAmount = calculateFGTSWithdrawalUseCase(info?.balanceInCents ?? 0);
  const withdrawalAmountFormatted = formatCurrency(centsToReais(withdrawalAmount));

  const handleGoBack = () => {
    Alert.alert('Deseja fazer outra simulação?', 'Essa simulação será perdida.', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          handleGoBackToForm();
        },
      },
    ]);
  }

  const handleGoBackToForm = async () => {
    await clearFGTS();
    setInfo({} as FGTSInfo);
    navigation.dispatch(StackActions.replace('FGTSForm'));
  }

  return (
    <View className="relative flex-1">
      <View className="relative h-3/5 z-0" >
        <Pressable
          style={{ top: insets.top, right: 16 }}
          className="absolute z-10 rounded-full px-4 py-4 active:bg-primary/30"
          onPress={handleGoBack}
        >
          <Ellipsis color="white" />
        </Pressable>

        <Image 
          source={bgResult} 
          className="w-full h-full object-cover z-0" 
          resizeMode="cover" 
          />
          <View className="w-full h-full absolute bg-black/50 z-1"/>
          <View className="absolute bottom-0 left-0 right-0 z-1 px-8 py-4">
            <View className="flex-row gap-x-4 items-center justify-start">
              <Logo width={32} height={32} fill="white"/>
              <Text className="text-white text-base font-thin">SMILE Co.</Text>
            </View>
          </View>
      </View>

      <View className="flex-1 p-8" style={{ paddingBottom: insets.bottom + 16 }}>
        <View className="flex-1 flex-col justify-between">
          <View className="flex-1 gap-y-4">
            <Text className="text-black text-3xl font-bold pt-2">
              Olá {(info?.name ?? '').capitalize()}!
            </Text>
            <Text className="text-gray-500 text-2xl font-normal">
              Você pode receber até
            </Text>
            <Text className="text-primary text-4xl font-bold">
              {withdrawalAmountFormatted}
            </Text>
          </View>
          <Text className="text-gray-500 text-sm font-normal">
            *Esta simulação traz valores aproximados. Para calcular o valor exato, entre em contato com o Smile Co. ou consulte seu saldo no app do FGTS.
          </Text>
        </View>
      </View>
    </View>
  );
}
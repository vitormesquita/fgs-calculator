import { View, Text, Image } from "react-native";
import Logo from '../assets/icons/logo.svg';
import { SafeAreaView } from "react-native-safe-area-context";
import "../utils/extensions/stringExtensions";
import { useFGTS } from "../context/FGTSContext";
import { calculateFGTSWithdrawalUseCase } from "../useCases/calculateFGTSWithdrawalUseCase";
import { centsToReais, formatCurrency } from "../utils/formatters/currency";

export function FGTSResult() {
  const { info } = useFGTS();
  const bgResult = require('../assets/images/bg-result.jpeg');

  const withdrawalAmount = calculateFGTSWithdrawalUseCase(info?.balanceInCents ?? 0);
  const withdrawalAmountFormatted = formatCurrency(centsToReais(withdrawalAmount));

  return (
    <View className="relative flex-1">
      <View className="relative h-3/5 z-0" >
        <Image 
          source={bgResult} 
          className="w-full h-full object-cover " 
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

      <SafeAreaView className="flex-1 p-8" edges={['bottom']}>
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
      </SafeAreaView>
    </View>
  );
}
import { View, Text, Animated } from "react-native";
import { Button } from "../components/button/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../components/input/Input";
import { Controller, useForm } from "react-hook-form";
import Logo from "../assets/icons/logo.svg";

type FGTSFormData = {
  name: string;
  phone: string;
  balance: number;
  birthdayMonth: number;
}

export function FGTSForm() {
  
  const {control, handleSubmit, register} = useForm<FGTSFormData>({
    defaultValues: {
      name: '',
      phone: '',
      balance: 0,
      birthdayMonth: 0,
    },
  });

  return (
    <View className="relative flex-1">
      <View className="absolute top-0 left-0 right-0 h-1/2 bg-primary z-0" />

      <Animated.ScrollView className="relative flex-1 z-10 p-6 h-full" bounces={true}> 
        <SafeAreaView>          
          <View className="flex-1 flex-col gap-y-4">            
            <View className="items-center justify-start text-center">
              <Logo width={32} height={32} fill="white"/>
              <Text className="text-4xl font-bold text-white text-center pt-6">Antecipe seu</Text>
              <Text className="text-4xl font-bold text-white text-center pb-6">Saque-Aniversário</Text>
              <Text className="text-base text-white text-center font-normal">Use uma grana que já é sua e saia do aperto</Text>
            </View>

            <View className="flex-col gap-y-4 shadow-sm rounded-lg bg-white p-6">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input 
                    label="Qual o seu nome?" 
                    placeholder="Digite seu nome" 
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <Input 
                    type="phone"  
                    label="Qual o seu telefone?" 
                    placeholder="(00) 00000-0000" 
                    value={field.value}
                    onChangeText={(text) => field.onChange(text)}
                  />
                )}
              />
              <Controller
                control={control}
                name="balance"
                render={({ field }) => (
                  <Input 
                    label="Qual o seu saldo?" 
                    placeholder="Digite seu saldo" 
                    value={field.value.toString()}
                    onChangeText={field.onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="birthdayMonth"
                render={({ field }) => (
                  <Input 
                    label="Qual o seu mês de aniversário?" 
                    placeholder="01" 
                    value={field.value.toString()}
                    onChangeText={field.onChange}
                  />
                )}
              />
              <Button text="Ver proposta" variant="primary" onPress={() => {}} />
            </View>
          </View>
        </SafeAreaView>
      </Animated.ScrollView>
    </View>
  );
}
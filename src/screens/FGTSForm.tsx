import { useState } from "react";
import { View, Text, Animated, Alert } from "react-native";
import { Button, Input, CurrencyInput } from "../utils/components";
import BottomSheetInput from "../utils/components/input/BottomSheetInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import Logo from "../assets/icons/logo.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { stringToCents } from "../utils/formatters/currency";
import { getMonths } from "../utils/formatters/date";
import "../utils/extensions/stringExtensions";
import { CalendarIcon } from "lucide-react-native";
import { PhoneRoutes } from "../api/routes/phoneRoutes";

type FGTSFormData = {
  name?: string;
  phone?: string;
  balanceInCents?: number;
  birthdayMonth?: Month;
}

interface Month {
  name: string;
  value: number;
}

export function FGTSForm() {
  const months = getMonths();
  
  const [isLoading, setIsLoading] = useState(false);
  const {control, watch, trigger, handleSubmit, formState: {errors, isValid}} = useForm<FGTSFormData>({
    defaultValues: {
      name: undefined,
      phone: undefined,
      balanceInCents: undefined,
      birthdayMonth: undefined,
    },
  });
  
  async function handleSubmitForm(data: FGTSFormData) {
    trigger();

    if (!isValid || !data.phone) return;

    setIsLoading(true);

    try {
      const response = await PhoneRoutes.validatePhone('+55' + data.phone);

      if (!response.phone_validation.is_valid) {
        Alert.alert('Telefone inválido.', 'Verifique se o número está correto.');
        return;
      }

      console.log('Balance in cents: ', data.balanceInCents);
      
    } catch (error) {
      Alert.alert('Opss...', 'Erro ao validar telefone, tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className="relative flex-1">
      <View className="absolute top-0 left-0 right-0 h-1/2 bg-primary z-0" />

      <SafeAreaView className="flex-1">          
        <KeyboardAwareScrollView 
          className="relative z-10 p-6 h-full" 
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          bottomOffset={32}
        > 
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
                rules={{ required: 'Nome é obrigatório'}}
                render={({ field }) => (
                  <View className="flex-col gap-y-1">
                  <Input 
                    label="Qual o seu nome?" 
                    placeholder="Digite seu nome" 
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                  {errors.name && (
                    <Animated.Text className="font-montserrat text-red-500 text-sm">
                      {errors.name.message}
                    </Animated.Text>
                  )}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="phone"
                rules={{ 
                  required: 'Telefone é obrigatório', 
                  validate: (value: string | undefined) => {
                    if (value && value.length !== 11) {
                    return 'Telefone inválido';
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <View className="flex-col gap-y-1">                    
                    <Input 
                      type="phone"  
                      label="Qual o seu telefone?" 
                      placeholder="(00) 00000-0000" 
                      value={field.value}
                      onChangeText={(text) => field.onChange(text)}
                    />

                    {errors.phone && (
                      <Animated.Text className="font-montserrat text-red-500 text-sm">
                        {errors.phone.message}
                      </Animated.Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="balanceInCents"
                rules={{ 
                  required: 'Saldo é obrigatório', 
                  validate: (value: number | undefined) => {
                    if (value === undefined || value <= 0) {
                      return 'Saldo deve ser maior que 0';
                    }
                    return undefined;
                  },
                }}
                render={({ field }) => (
                  <View className="flex-col gap-y-1">
                  <CurrencyInput 
                    label="Qual o seu saldo?" 
                    placeholder="Digite seu saldo" 
                    value={field.value?.toString()}
                    onChangeText={(text) => {
                      const finalValue = stringToCents(text);
                        field.onChange(finalValue);
                      }}
                    />
                    {errors.balanceInCents && (
                      <Animated.Text className="font-montserrat text-red-500 text-sm">
                        {errors.balanceInCents.message}
                      </Animated.Text>
                    )}
                  </View>
                )}
              />
              
              <Controller
                control={control}
                name="birthdayMonth"
                rules={{ required: 'Mês de aniversário é obrigatório' }}
                render={({ field }) => (
                  <View className="flex-col gap-y-1">
                  <BottomSheetInput 
                    placeholder="Selecione uma opção"
                    label="Qual o seu mês de aniversário?"
                    value={field.value?.name.capitalize() || undefined}
                    icon={<CalendarIcon size={16} color="gray" />}
                    data={months.map((month) => month.name.capitalize())} 
                    onChange={(value) => {
                      const month = months.find((month) => month.name.toLowerCase() === value.toLowerCase());
                      if (month) {
                        field.onChange(month);
                      }
                      }} 
                    />
                    {errors.birthdayMonth && (
                      <Animated.Text className="font-montserrat text-red-500 text-sm">
                        {errors.birthdayMonth.message}
                      </Animated.Text>
                    )}
                  </View>
                )}
              />
              <Button 
                text="Ver proposta" 
                variant="primary" 
                isLoading={isLoading}
                onPress={handleSubmit(handleSubmitForm)} 
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
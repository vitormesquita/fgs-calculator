import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button, Input, CurrencyInput } from "../components";
import BottomSheetInput from "../components/input/BottomSheetInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import Logo from "../assets/icons/logo.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { stringToCents } from "../utils/formatters/currency";
import { getMonths } from "../utils/formatters/date";
import "../utils/extensions/stringExtensions";
import { CalendarIcon } from "lucide-react-native";

type FGTSFormData = {
  name?: string;
  phone?: string;
  balance?: number;
  birthdayMonth?: Month;
}

interface Month {
  name: string;
  value: number;
}

export function FGTSForm() {
  const months = getMonths();
  const [isEnabledButton, setIsEnabledButton] = useState(false);
  
  const {control, watch, trigger, handleSubmit} = useForm<FGTSFormData>({
    defaultValues: {
      name: undefined,
      phone: undefined,
      balance: undefined,
      birthdayMonth: undefined,
    },
  });
  const values = watch();
  
  useEffect(() => {
    const isValid = 
      (values.name !== undefined) && 
      (values.phone !== undefined) && 
      (values.balance !== undefined && values.balance > 0) && 
      (values.birthdayMonth !== undefined);
    setIsEnabledButton(isValid);
  }, [values, trigger]);
  
  function handleSubmitForm(data: FGTSFormData) {
    console.log(data);
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
                  <CurrencyInput 
                    label="Qual o seu saldo?" 
                    placeholder="Digite seu saldo" 
                    value={field.value?.toString()}
                    onChangeText={(text) => {
                      const finalValue = stringToCents(text);
                      field.onChange(finalValue);
                    }}
                  />
                )}
              />
              
              <Controller
                control={control}
                name="birthdayMonth"
                render={({ field }) => (
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
                )}
              />
              <Button 
                text="Ver proposta" 
                variant="primary" 
                onPress={handleSubmit(handleSubmitForm)} 
                disabled={!isEnabledButton} 
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
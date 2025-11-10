import { View, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { formatCurrencyInput } from "../../formatters/currency";

type CurrencyInputProps = {
  label?: string;
  value?: string;
  placeholder: string;
  onChangeText: (text: string) => void;
}

export function CurrencyInput({ label, value, placeholder, onChangeText }: CurrencyInputProps) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value) {
      setInputValue(formatCurrencyInput(value));
    }
  }, [value]);

  function handleChangeText(value: string) {
    const formatted = formatCurrencyInput(value);
    onChangeText(formatted);
  }

  return (
    <View className="flex-col gap-y-1">
      {label && <Text className="text-sm font-medium text-gray-500 pb-1">{label}</Text>}
      <View className="flex-row items-center h-[46px] border border-gray-200 rounded-lg px-4 gap-x-2">
        <Text className="text-base font-medium text-black">R$</Text>
        <TextInput
          value={inputValue}
          keyboardType="numeric"
          placeholder={placeholder}
          placeholderTextColor="gray"
          onChangeText={handleChangeText}
          className="flex-1 font-montserrat font-medium text-black"
        />
      </View>
    </View>
  );
}
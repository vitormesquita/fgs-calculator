import { View, Text, StyleSheet } from "react-native";
import { MaskedTextInput } from 'react-native-mask-text';
import colors from "tailwindcss/colors";

type InputProps = {
  label?: string;
  placeholder: string;
  value?: string;
  type?: 'text' | 'phone' ;
  onChangeText: (text: string) => void;
};

export function Input({ label, placeholder, value, type, onChangeText }: InputProps) {
  const inputType = type || 'text';

  const getInputMask = () => {
    switch (inputType) {
      case 'phone':
        return '(99) 99999-9999';
      default:
        return '';
    }
  };

  const getInputKeyboardType = () => {
    switch (inputType) {
      case 'phone':
        return 'numeric';
      default:
        return 'default';
    }
  };

  return (
    <View className="flex-col gap-y-1">
      {label && <Text className="text-sm font-medium text-gray-500 pb-1">{label}</Text>}      
      <MaskedTextInput
        value={value}
        style={styles.input}
        mask={getInputMask()}
        placeholder={placeholder}
        placeholderTextColor="gray"
        keyboardType={getInputKeyboardType()}
        onChangeText={(_, rawText) => onChangeText(rawText)}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
    paddingHorizontal: 16,
  },
});
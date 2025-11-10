import { Animated, ActivityIndicator, Pressable, Text } from "react-native";
import { useCallback } from "react";

type ButtonProps = {
  text: string;
  variant: 'primary';
  disabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
};

export function Button({ text, variant, disabled, isLoading, onPress }: ButtonProps) {

  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return 'btn-primary disabled:bg-gray-300';
      default:
        return '';
    }
  };

  const handlePress = useCallback(() => {
    if (disabled || isLoading) return;
    onPress();
  }, [disabled, isLoading, onPress]);

  return (
    <Animated.View>
      <Pressable 
        disabled={disabled} 
        onPress={handlePress} 
        accessible={true} 
        accessibilityLabel={text} 
        accessibilityRole="button" 
        accessibilityState={{ disabled }}
        className={getButtonStyle()}>
      
        {isLoading ? (
          <ActivityIndicator size="small" color="white" /> 
        ) : (
          <Text className="text-white text-base font-semibold">{text}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}
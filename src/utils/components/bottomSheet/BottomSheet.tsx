import { useEffect, useRef, useState, useCallback } from "react";
import { View, Text, Pressable, Modal, FlatList, Animated } from "react-native";

type BottomSheetProps = {
  open: boolean;
  items: string[];
  selectedItem?: string | null;
  setOpen: (open: boolean) => void;
  onSelect: (item: string) => void;
};
export default function BottomSheet({ open, items, selectedItem, setOpen, onSelect }: BottomSheetProps) {
  const [visible, setVisible] = useState(open);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (open) {
      openBottomSheet();
    } else if (visible) {
      closeBottomSheet();
    }
  }, [open, visible, opacity, translateY]);

  const openBottomSheet = useCallback(() => {
    setVisible(true);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(); 
  }, [opacity, translateY]);

  const closeBottomSheet = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 600,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
    });
  }, [opacity, translateY]);

  const handleClose = () => {
    if (open) {
      setOpen(false);
    }
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    handleClose();
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <View className="flex-1 justify-end">
        <Animated.View style={{ opacity }} className="absolute inset-0 bg-black/30" />

        <Pressable className="absolute inset-0" onPress={handleClose}>
          <Animated.View style={{ opacity }} className="flex-1" />
        </Pressable>

        <Animated.View
          style={{ transform: [{ translateY }] }}
          className="max-h-[60%] bg-white rounded-t-3xl p-6 shadow-lg pb-10"
        >
          <Text className="text-base font-semibold mb-2">Selecione uma opção</Text>

          <FlatList
            data={items}
            keyExtractor={(item) => item}
            ItemSeparatorComponent={() => <View className="h-px bg-gray-100" />}
            renderItem={({ item }) => {
              const isSelected = item === selectedItem;
              return (
                <Pressable className="py-4" onPress={() => handleSelect(item)}>
                  <Text className={isSelected ? "font-semibold text-primary" : ""}>{item}</Text>
                </Pressable>
              );
            }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
}

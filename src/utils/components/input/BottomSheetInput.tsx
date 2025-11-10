import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import BottomSheet from "../bottomSheet/BottomSheet";
import { ChevronDownIcon, CalendarIcon } from 'lucide-react-native';

type BottomSheetInputProps = {
  data: string[];
  label?: string;
  value?: string;
  placeholder: string;
  icon?: React.ReactNode;
  onChange: (value: string) => void;
};

export default function BottomSheetInput({ data, label, value, placeholder, icon, onChange }: BottomSheetInputProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(value || null);
  
  useEffect(() => {
    setSelected(value || null);
  }, [value]);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange(value);
  }

  const isToShowPlaceholder = selected == null || selected === undefined;

  return (
    <View>
      {label && <Text className="text-sm font-medium text-gray-500 pb-1">{label}</Text>}
      <Pressable
        className={"p-4 border border-gray-200 rounded-lg"}
        onPress={() => setOpen(true)}
      >
        <View className="flex-row items-center gap-x-4">
          <ChevronDownIcon size={12} color="gray" />
          <Text className={`flex-1 font-montserrat font-medium ${isToShowPlaceholder ? "text-gray-500" : "text-black"}`}>
            {selected || placeholder}
          </Text>
          {icon !== undefined && icon}
        </View>
        
      </Pressable>

      <BottomSheet 
        open={open}
        items={data} 
        selectedItem={selected} 
        setOpen={setOpen} 
        onSelect={handleSelect} 
      />
    </View>
  );
}

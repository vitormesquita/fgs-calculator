import AsyncStorage from "@react-native-async-storage/async-storage";
import { FGTSInfo } from "../models";

const KEY = "fgts_info";

export async function saveFGTSInfo(info: FGTSInfo) {
  await AsyncStorage.setItem(KEY, JSON.stringify(info));
}

export async function getFGTSInfo() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function clearFGTS() {
  await AsyncStorage.removeItem(KEY);
}
module.exports = {
  preset: "jest-expo",
  setupFiles: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native|react-clone-referenced-element|expo(nent)?|@expo(nent)?/.*|expo-modules-core|@expo/vector-icons|@expo/.*|@react-navigation/.*|react-navigation|@react-native-community/.*))"
  ],  
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"   // se você usa imports com @
  },
};
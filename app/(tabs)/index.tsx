import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-primary">
        Welcome to MovieHive!
      </Text>
        <Text className="text-red-600">Go to OnBoarding</Text>
    </View>
  );
}

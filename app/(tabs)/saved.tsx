import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSavedMovies } from "../../services/storage";

const Saved = () => {
  const [savedMovies, setSavedMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchSavedMovies();
    }, [])
  );

  const fetchSavedMovies = async () => {
    setLoading(true);
    const movies = await getSavedMovies();
    setSavedMovies(movies);
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-primary">
      <SafeAreaView className="flex-1 px-5">
        <View className="mt-10 mb-5">
          <Text className="text-2xl font-bold text-white uppercase tracking-widest">Saved Movies</Text>
          <View className="h-1 w-20 bg-secondary mt-1 rounded-full" />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#FFAD1F" className="mt-10" />
        ) : savedMovies.length > 0 ? (
          <FlatList
            data={savedMovies}
            renderItem={({ item }) => <MovieCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingBottom: 20,
            }}
            showsVerticalScrollIndicator={false}
            className="pb-32"
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <View className="bg-dark-200 p-8 rounded-full">
              <Image
                source={icons.logo_premium}
                className="size-20 opacity-20"
                resizeMode="contain"
              />
            </View>
            <Text className="text-light-200 text-lg mt-5 font-medium">
              No saved movies yet.
            </Text>
            <Text className="text-light-300 text-sm mt-2 text-center px-10">
              Explore movies and tap the bookmark icon to save them for later!
            </Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default Saved;
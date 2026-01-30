import MovieCard from "@/components/MovieCard";
import { images } from "@/constants/images";
import { getSavedMovies } from "@/services/storage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <Image source={images.bg} className="absolute w-full h-full" />
      <SafeAreaView className="flex-1 px-5">
        <View className="mt-10 mb-5">
          <Text className="text-2xl font-bold text-white">Saved Movies</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#ec4242ff" className="mt-10" />
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
            <Image
              source={images.bg}
              className="size-40 opacity-20"
              resizeMode="contain"
            />
            <Text className="text-light-200 text-lg mt-5">
              No saved movies yet.
            </Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default Saved;
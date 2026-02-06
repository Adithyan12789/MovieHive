import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const {
    data: movies,
    loading
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  return (
    <View className="flex-1 bg-primary">
      <SafeAreaView className="flex-1 px-5">
        <View className="mt-10 mb-5">
          <Text className="text-2xl font-bold text-white uppercase tracking-widest">Discover Movies</Text>
          <View className="h-1 w-20 bg-secondary mt-1 rounded-full" />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#FFAD1F" className="mt-10" />
        ) : (
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingBottom: 20
            }}
            showsVerticalScrollIndicator={false}
            className="pb-32"
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default Search; 

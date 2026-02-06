import MovieCard from "@/components/MovieCard";
<<<<<<< HEAD
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
=======
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
>>>>>>> 4c4a8be8af3001e46fbc76506a2f0328d7de47bb

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
<<<<<<< HEAD
    loading
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
=======
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(
    () =>
      fetchMovies({
        query: searchQuery,
      }),
    false
>>>>>>> 4c4a8be8af3001e46fbc76506a2f0328d7de47bb
  );

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <SafeAreaView className="flex-1 px-5">
        <View className="mt-10 mb-5">
          <Text className="text-2xl font-bold text-white uppercase tracking-widest">Discover Movies</Text>
          <View className="h-1 w-20 bg-secondary mt-1 rounded-full" />
        </View>

<<<<<<< HEAD
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
=======
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Erro: {error.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl text-white font-bold">
                Search Results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
>>>>>>> 4c4a8be8af3001e46fbc76506a2f0328d7de47bb
    </View>
  );
};

export default Search;

import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";

export default function Index() {
  
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  return (
    <View className="flex-1 bg-primary">
      {/* Background Image */}
      <Image source={images.bg} className="absolute w-full h-full" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 20 }}
      >
        {/* App Logo */}
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {/* Loader / Error / Data */}
        {moviesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
        ) : moviesError ? (
          <Text className="text-red-500 text-center mt-5">
            Error: {moviesError.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            {/* Search Bar */}
            <SearchBar placeholder="Search movies..." value={searchQuery} onChangeText={(text: string) => setSearchQuery(text)}/>

            {/* Movies Section */}
            <Text className="mt-5 font-bold text-lg text-white mb-3">
              Latest Movies
            </Text>

            <FlatList
              data={movies}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <MovieCard {...item}/>
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                paddingBottom: 10
              }}
              className="mt-2 pb-32"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { isMovieSaved, removeMovie, saveMovie } from "../../services/storage";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 text-sm font-normal uppercase tracking-wider">{label}</Text>
    <Text className="text-white text-base font-bold mt-1">{value || "N/A"}</Text>
  </View>
);

const MoviesDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  useEffect(() => {
    if (movie) {
      checkSavedStatus();
    }
  }, [movie]);

  const checkSavedStatus = async () => {
    const saved = await isMovieSaved(Number(id));
    setIsSaved(saved);
  };

  const handleSaveToggle = async () => {
    if (!movie) return;

    if (isSaved) {
      await removeMovie(movie.id);
      setIsSaved(false);
    } else {
      await saveMovie(movie);
      setIsSaved(true);
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="relative">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            style={{ width: "100%", height: 600 }}
            resizeMode="cover"
          />

          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-12 left-5 bg-dark-100/80 p-3 rounded-full border border-white/10"
          >
            <Image
              source={icons.arrow}
              className="size-5"
              tintColor="white"
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSaveToggle}
            className="absolute top-12 right-5 bg-dark-100/80 p-3 rounded-full border border-white/10"
          >
            <Image
              source={icons.save}
              className="size-5"
              tintColor={isSaved ? "#FFAD1F" : "white"}
            />
          </TouchableOpacity>

          <View className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-primary to-transparent" />
        </View>

        <View className="flex-col items-start justify-center -mt-10 px-6 bg-primary rounded-t-3xl pt-8">
          <Text className="text-white text-3xl font-extrabold">{movie?.title}</Text>

          <View className="flex-row items-center gap-x-3 mt-3">
            <View className="bg-dark-200 px-3 py-1 rounded-md">
              <Text className="text-secondary font-bold">
                {movie?.release_date?.split("-")[0]}
              </Text>
            </View>
            <Text className="text-light-300">•</Text>
            <Text className="text-light-200 text-sm font-medium">{movie?.runtime} mins</Text>
            <Text className="text-light-300">•</Text>
            <View className="flex-row items-center gap-x-1">
              <Image source={icons.star} className="size-4" tintColor="#FFAD1F" />
              <Text className="text-white text-sm font-bold">
                {movie?.vote_average?.toFixed(1) ?? 0}
              </Text>
            </View>
          </View>

          <View className="w-full h-[1px] bg-light-300/10 my-6" />

          <MovieInfo label="Overview" value={movie?.overview} />

          <View className="mt-8">
            <Text className="text-light-200 text-sm font-normal uppercase tracking-wider">Genres</Text>
            <View className="flex-row flex-wrap gap-2 mt-3">
              {movie?.genres?.map((genre) => (
                <View key={genre.id} className="bg-dark-100 px-4 py-2 rounded-xl border border-light-300/10">
                  <Text className="text-white text-xs font-medium">{genre.name}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="flex flex-row justify-between w-full mt-8">
            <View className="flex-1">
              <MovieInfo
                label="Budget"
                value={movie?.budget ? `$${(movie.budget / 1_000_000).toFixed(1)}M` : "N/A"}
              />
            </View>
            <View className="flex-1">
              <MovieInfo
                label="Revenue"
                value={movie?.revenue ? `$${(movie.revenue / 1_000_000).toFixed(1)}M` : "N/A"}
              />
            </View>
          </View>

          <MovieInfo label="Production" value={movie?.production_companies?.map((company) => company.name).join(", ") || 'N/A'} />
        </View>
      </ScrollView>
    </View>
  );
};

export default MoviesDetails;
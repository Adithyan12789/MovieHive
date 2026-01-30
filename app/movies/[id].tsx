import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import { isMovieSaved, removeMovie, saveMovie } from "@/services/storage";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 text-sm font-normal">{label}</Text>
    <Text className="text-white text-sm font-bold mt-2">{value || "N/A"}</Text>
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
            style={{ width: "100%", height: 550 }}
            resizeMode="stretch"
          />

          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-12 left-5 bg-dark-100/60 p-3 rounded-full"
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
            className="absolute top-12 right-5 bg-dark-100/60 p-3 rounded-full"
          >
            <Image
              source={icons.save}
              className="size-5"
              tintColor={isSaved ? "#facc15" : "white"}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-xl font-bold">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">|</Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>

          <View className="flex-row items-center gap-x-1 mt-2 rounded-md bg-dark-100 px-2 py-1">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white text-sm font-bold">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={
              movie?.genres?.map((genre) => genre.name).join(" - ") || "N/A"
            }
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={movie?.budget ? `$${Math.round(movie.budget / 1_000_000)} million` : "N/A"}
            />
            <MovieInfo
              label="Revenue"
              value={movie?.revenue ? `$${Math.round(movie.revenue / 1_000_000)} million` : "N/A"}
            />
          </View>
          <MovieInfo label="Production Companies" value={movie?.production_companies?.map((company) => company.name).join(" - ") || 'N/A'} />
        </View>
      </ScrollView>


    </View>
  );
};

export default MoviesDetails;

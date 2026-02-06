import { icons } from "@/constants/icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSavedMovies } from "../../services/storage";

interface MenuItemProps {
  icon: any;
  title: string;
  onPress?: () => void;
  isLogout?: boolean;
}

const MenuItem = ({ icon, title, onPress, isLogout }: MenuItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between py-4 border-b border-light-300/10"
  >
    <View className="flex-row items-center gap-x-4">
      <View className={`p-2 rounded-lg ${isLogout ? 'bg-red-500/10' : 'bg-dark-200'}`}>
        <Image
          source={icon}
          className="size-5"
          tintColor={isLogout ? "#ef4444" : "#FFAD1F"}
        />
      </View>
      <Text className={`text-base font-medium ${isLogout ? 'text-red-500' : 'text-white'}`}>
        {title}
      </Text>
    </View>
    <Image
      source={icons.arrow}
      className="size-4 opacity-50"
      tintColor="white"
    />
  </TouchableOpacity>
);

const Profile = () => {
  const [savedCount, setSavedCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      fetchStats();
    }, [])
  );

  const fetchStats = async () => {
    const saved = await getSavedMovies();
    setSavedCount(saved.length);
  };

  return (
    <View className="flex-1 bg-primary">
      <SafeAreaView className="flex-1 px-5">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Header */}
          <View className="mt-5 mb-8">
            <Text className="text-3xl font-bold text-white uppercase tracking-wider">Profile</Text>
            <View className="h-1 w-12 bg-secondary mt-1 rounded-full" />
          </View>

          {/* User Card */}
          <View className="items-center mb-10">
            <View className="relative">
              <View className="size-32 rounded-full border-4 border-secondary/50 overflow-hidden bg-dark-200 justify-center items-center shadow-2xl shadow-secondary/20">
                <Image
                  source={icons.person}
                  className="size-16"
                  tintColor="#FFAD1F"
                />
              </View>
              <TouchableOpacity className="absolute bottom-0 right-0 bg-secondary p-2 rounded-full border-4 border-primary">
                <Image source={icons.play} className="size-4" tintColor="#0B0B0C" style={{ transform: [{ rotate: "270deg" }] }} />
              </TouchableOpacity>
            </View>

            <Text className="text-2xl font-bold text-white mt-4 uppercase tracking-tight">Movie Enthusiast</Text>
            <View className="bg-secondary/20 px-3 py-1 rounded-full mt-1">
              <Text className="text-secondary text-xs font-bold uppercase">Premium Member</Text>
            </View>
          </View>

          {/* Stats Section */}
          <View className="flex-row justify-between bg-dark-100/80 p-6 rounded-3xl mb-10 border border-light-300/10 backdrop-blur-md">
            <View className="items-center flex-1 border-r border-light-300/10">
              <Text className="text-2xl font-bold text-secondary">{savedCount}</Text>
              <Text className="text-light-200 text-xs mt-1 uppercase tracking-widest font-bold">Saved</Text>
            </View>
            <View className="items-center flex-1 border-r border-light-300/10">
              <Text className="text-2xl font-bold text-white">12</Text>
              <Text className="text-light-200 text-xs mt-1 uppercase tracking-widest font-bold">Watched</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-white">4</Text>
              <Text className="text-light-200 text-xs mt-1 uppercase tracking-widest font-bold">Reviews</Text>
            </View>
          </View>

          {/* Menu Section */}
          <View className="bg-dark-100/40 p-4 rounded-3xl border border-light-300/5">
            <Text className="text-light-300 text-xs font-bold uppercase tracking-widest mb-4 ml-2">General</Text>
            <MenuItem icon={icons.person} title="Account Details" />
            <MenuItem icon={icons.save} title="Watchlist History" />
            <MenuItem icon={icons.star} title="Premium Perks" />

            <Text className="text-light-300 text-xs font-bold uppercase tracking-widest mt-8 mb-4 ml-2">Experience</Text>
            <MenuItem icon={icons.play} title="Audio & Video" />
            <MenuItem icon={icons.search} title="Manage Storage" />
            <MenuItem icon={icons.arrow} title="Legal & Policies" />

            <View className="mt-8">
              <MenuItem icon={icons.person} title="Sign Out" isLogout />
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;

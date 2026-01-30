import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getSavedMovies } from "@/services/storage";
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
          tintColor={isLogout ? "#ef4444" : "#ec4242ff"}
        />
      </View>
      <Text className={`text-base ${isLogout ? 'text-red-500' : 'text-white'}`}>
        {title}
      </Text>
    </View>
    <Image
      source={icons.arrow}
      className="size-4 opacity-50"
      tintColor="white"
      style={{ transform: [{ rotate: "0deg" }] }}
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
      <Image source={images.bg} className="absolute w-full h-full" />

      <SafeAreaView className="flex-1 px-5">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Header */}
          <View className="mt-5 mb-8">
            <Text className="text-3xl font-bold text-white">Profile</Text>
          </View>

          {/* User Card */}
          <View className="items-center mb-10">
            <View className="relative">
              <View className="size-32 rounded-full border-4 border-secondary overflow-hidden bg-dark-200 justify-center items-center">
                <Image
                  source={icons.person}
                  className="size-16"
                  tintColor="#ec4242ff"
                />
              </View>
              <TouchableOpacity className="absolute bottom-0 right-0 bg-secondary p-2 rounded-full border-4 border-primary">
                <Image source={icons.play} className="size-4" tintColor="#151312" style={{ transform: [{ rotate: "270deg" }] }} />
              </TouchableOpacity>
            </View>

            <Text className="text-2xl font-bold text-white mt-4">Movie Enthusiast</Text>
            <Text className="text-light-200 text-sm">premium member</Text>
          </View>

          {/* Stats Section */}
          <View className="flex-row justify-between bg-dark-100/50 p-6 rounded-3xl mb-10 border border-light-300/10">
            <View className="items-center flex-1 border-r border-light-300/10">
              <Text className="text-2xl font-bold text-white">{savedCount}</Text>
              <Text className="text-light-200 text-xs mt-1 uppercase tracking-widest">Saved</Text>
            </View>
            <View className="items-center flex-1 border-r border-light-300/10">
              <Text className="text-2xl font-bold text-white">12</Text>
              <Text className="text-light-200 text-xs mt-1 uppercase tracking-widest">Watched</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-white">4</Text>
              <Text className="text-light-200 text-xs mt-1 uppercase tracking-widest">Reviews</Text>
            </View>
          </View>

          {/* Menu Section */}
          <View className="bg-dark-100/30 p-4 rounded-3xl border border-light-300/5">
            <Text className="text-light-200 text-xs font-bold uppercase tracking-widest mb-4 ml-2">General</Text>
            <MenuItem icon={icons.person} title="Edit Profile" />
            <MenuItem icon={icons.save} title="My Watchlist" />
            <MenuItem icon={icons.star} title="Subscription Plans" />

            <Text className="text-light-200 text-xs font-bold uppercase tracking-widest mt-8 mb-4 ml-2">App Settings</Text>
            <MenuItem icon={icons.play} title="Notifications" />
            <MenuItem icon={icons.search} title="Clear Cache" />
            <MenuItem icon={icons.arrow} title="Terms & Privacy" />

            <View className="mt-8">
              <MenuItem icon={icons.person} title="Log Out" isLogout />
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;

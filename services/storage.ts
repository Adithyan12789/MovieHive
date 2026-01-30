import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVED_MOVIES_KEY = "saved_movies";

export const getSavedMovies = async (): Promise<any[]> => {
    try {
        const savedMovies = await AsyncStorage.getItem(SAVED_MOVIES_KEY);
        return savedMovies ? JSON.parse(savedMovies) : [];
    } catch (error) {
        console.error("Error fetching saved movies:", error);
        return [];
    }
};

export const saveMovie = async (movie: any): Promise<void> => {
    try {
        const savedMovies = await getSavedMovies();
        const isAlreadySaved = savedMovies.some((m) => m.id === movie.id);

        if (!isAlreadySaved) {
            const updatedMovies = [movie, ...savedMovies];
            await AsyncStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(updatedMovies));
        }
    } catch (error) {
        console.error("Error saving movie:", error);
    }
};

export const removeMovie = async (movieId: number): Promise<void> => {
    try {
        const savedMovies = await getSavedMovies();
        const updatedMovies = savedMovies.filter((m) => m.id !== movieId);
        await AsyncStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(updatedMovies));
    } catch (error) {
        console.error("Error removing movie:", error);
    }
};

export const isMovieSaved = async (movieId: number): Promise<boolean> => {
    try {
        const savedMovies = await getSavedMovies();
        return savedMovies.some((m) => m.id === movieId);
    } catch (error) {
        console.error("Error checking if movie is saved:", error);
        return false;
    }
};

import { createContext, useState, useEffect } from "react";

const FavoritesContext = createContext({
    favorites: [],
    addFavorite: () => {},
    removeFavorite: () => {}
});

export function FavoritesContextProvider(props) {
    const [userFavorites, setUserFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem("favorites");
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(userFavorites));
    }, [userFavorites]);

    const addFavoriteHandler = (favoriteItem) => {
        setUserFavorites((prevUserFavorites) => [...prevUserFavorites, favoriteItem]);
    };

    const removeFavoriteHandler = (favoriteItem) => {
        setUserFavorites((prevUserFavorites) =>
            prevUserFavorites.filter((item) => item.teamName !== favoriteItem.teamName)
        );
    };

    const context = {
        favorites: userFavorites,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler
    };

    return (
        <FavoritesContext.Provider value={context}>
            {props.children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesContext;

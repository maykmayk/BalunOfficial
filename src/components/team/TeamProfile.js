import { useContext } from "react";
import FavoritesContext from "../../store/FavoritesContext";

function TeamProfile(props) {
    const favoritesCtx = useContext(FavoritesContext);
    const toggleFavorite = () => {
        isFavorite ? favoritesCtx.removeFavorite(props) : favoritesCtx.addFavorite(props);
    };
    const isFavorite = favoritesCtx.favorites.some((item) => item.teamName === props.teamName);

    return (
        <div className="min-w-full rounded-lg bg-white flex overflow-hidden justify-between">
            <div className="flex gap-5 items-center relative">
                <img className="h-14 me-3" alt={`Logo of ${props.teamName}`} src={props.teamLogo}></img>
                <div onClick={toggleFavorite} className="absolute top-0 start-10 cursor-pointer h-7 w-7 p-1 rounded-full bg-white brd" aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill={isFavorite ? "#dc2626" : "#e5e7eb"} stroke={isFavorite ? "#ef8d8a" : "#000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v-5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                    </svg>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="text-2xl font-medium leading-3">{props.teamName}</div>
                    <div className="flex gap-3">
                        <img className="h-6 object-contain" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${props.teamNation?.toLowerCase()}.png`} alt={`${props.teamNation} flag`} />
                        <div className="text-sm font-medium text-[#6d6a7f] leading-snug">{props.teamNation}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamProfile;

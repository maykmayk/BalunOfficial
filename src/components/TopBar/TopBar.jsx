import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"

function TopBar() {
    const [favoriteData, setFavoriteData] = useState([])

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            const fav = JSON.parse(storedFavorites);
            setFavoriteData(fav)
            console.log(favoriteData);
        } else {
            console.log("Nessun dato trovato nel localStorage");
        }
    }, [])

    return (
        <>
            <div className="sticky top-0 left-0 w-full z-50">
                <div className="px-6 py-4 bg-white brd flex justify-between items-center rounded-b-lg">
                    <div className="flex gap-10 items-center">
                        <Link to="/">
                            <img alt="BalunLogo" src="https://i.ibb.co/X2CsTgQ/Group-21-png-23-53-48-874.png" className="h-7"></img>
                        </Link>
                        <div className="hidden md:block">
                            <SearchBar />
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Link to="/league-list/">
                            <div className="flex gap-3 justify-center items-center h-8 w-8 rounded-full bg-white rounded-full brd">
                                <img src="https://img.icons8.com/?size=512&id=Qqh4f0AP23uP&format=png" alt="leaguesIcon" className="h-4" />
                            </div>
                        </Link>
                        {/* <Link to="/">
                            <div className="flex gap-3 items-center">
                                <img src="https://i.ibb.co/09rTv67/SVG-to-PNG-Converter.png" alt="leagueIcon" className="hidden md:block h-4" />
                                <div className="text-lg ">Transfers</div>
                            </div>
                        </Link> */}
                        <div className="block md:hidden">
                            <SearchBar />
                        </div>
                        {favoriteData?.[0]?.teamLogo &&
                            <Link to={"/team/" + (favoriteData?.[0]?.teamData?.details?.id)}>
                                <div className="h-8 w-8 md:h-9 md:w-9 rounded-full brd flex items-center justify-center relative">
                                    <img alt="logo" className="h-6 md:h-7" src={favoriteData?.[0]?.teamLogo} />
                                    <div className="absolute bottom-0 end-0 cursor-pointer h-3 w-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#dc2626" >
                                            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v-5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopBar
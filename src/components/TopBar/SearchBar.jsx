import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProvaApi from "../../api/ProvaApi";

function SearchBar() {
    const apiProva = new ProvaApi();
    const [searchData, setSearchData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const searchInput = document.getElementById("searchInput")
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const handleSearchIconClick = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const handleSearchInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseFromSearch = await apiProva.makeSearch(`searchapi/suggest?term=${searchValue}&lang=en`);
                setSearchData(responseFromSearch);
                console.log(searchData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [searchValue]);

    const handleError = (event) => {
        event.target.src = "https://i.ibb.co/q9SWXK2/player-placeholder.png";
    };

    return (
        <>
        <div className="hidden md:flex flex-col gap-8">
            <form className="w-96">
                <div className="md:relative">
                    <div className="absolute h-full inset-y-0 start-0 flex items-center ps-3 pointer-events-none h-7 w-7">
                        <img alt="icon" src="https://www.fotmob.com/img/ic_search_grey@3x.webp" />
                    </div>
                    <input
                        id="searchInput"
                        className="block w-full p-2 ps-10 text-base text-gray-900 brd rounded-full bg-white focus:outline-none"
                        placeholder="Search for teams, leagues and fixtures"
                        value={searchValue}
                        onChange={handleSearchInputChange}
                        required
                    />
                </div>
            </form>
            {searchValue !== "" && searchInput.focus && searchData !== undefined && 
                <div className="mt-14 rounded-xl absolute w-96 bg-white p-3 brd drop-shadow-xl flex flex-col gap-4">
                    {searchData?.data?.leagueSuggest &&
                    <div className="flex flex-col gap-4">
                        <div className="text-base font-medium">Leagues</div>
                        {searchData?.data?.leagueSuggest?.[0]?.options.map((league, index) => {
                            const parts = league?.text.split('|');
                            const leagueName = parts[0];
                            const leagueId = parts[1]; 
                            return (
                                <Link key={index} to={"/league/" + leagueId}>
                                    <div className="flex gap-3 items-center">
                                        <img alt="teamLogo" className="h-6 w-6" src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${leagueId}.png`} />
                                        <div className="text-base">{leagueName}</div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    }
                    {searchData?.data?.matchSuggest &&
                    <div className="flex flex-col gap-4">
                        <div className="text-base font-medium">Matches</div>
                        {searchData?.data?.matchSuggest?.[0]?.options.map((match, index) => {
                            return (
                                <Link key={index} to={"/match-details/" + match?.payload.id}>
                                    <div className="flex gap-3 items-center">
                                        <img alt="playerPhoto" className="h-6 w-6" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${match?.payload?.homeTeamId}.png`} />
                                        <div className="text-base text-nowrap truncate">{match?.payload?.homeName}</div>
                                        <div className="text-base text-nowrap">-</div>
                                        <div className="text-base text-nowrap truncate">{match?.payload?.awayName}</div>
                                        <img alt="playerPhoto" className="h-6 w-6" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${match?.payload?.awayTeamId}.png`} />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    }
                    {searchData?.data?.squadMemberSuggest &&
                        <div className="flex flex-col gap-4">
                            <div className="text-base font-medium">Players and Managers</div>
                            {searchData?.data?.squadMemberSuggest?.[0]?.options.map((squadMember, index) => {
                                const parts = squadMember?.text?.split('|');
                                const playerName = parts[0];
                                const playerId = parts[1]; 
                                return (
                                    <Link key={index} to={"/player/" + playerId}>
                                        <div className="flex gap-3 items-center">
                                            <div className="overflow-hidden h-6 w-6 rounded-full bg-white ">
                                                <img alt="playerPhoto" className="h-6 w-6" onError={handleError} src={`https://images.fotmob.com/image_resources/playerimages/${playerId}.png`} />
                                            </div>
                                            <div className="text-base">{playerName}</div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    }
                    {searchData?.data?.teamSuggest &&
                    <div className="flex flex-col gap-4">
                        <div className="text-base font-medium">Teams</div>
                        {searchData?.data?.teamSuggest?.[0]?.options.map((team, index) => {
                            const parts = team?.text.split('|');
                            const teamName = parts[0];
                            const teamId = parts[1]; 
                            return (
                                <Link key={index} to={"/team/" + teamId}>
                                    <div className="flex gap-3 items-center">
                                        <img alt="teamLogo" className="h-6 w-6" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${teamId}.png`} />
                                        <div className="text-base">{teamName}</div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    }
                </div>
            }
        </div>
        <div className="flex md:hidden">
            <div className="h-8 w-8 p-2 rounded-full bg-white brd flex items-center justify-center" onClick={handleSearchIconClick}>
                <img alt="icon" src="https://www.fotmob.com/img/ic_search_grey@3x.webp" />
            </div>

            {isSearchVisible && (
                <>
                <div className="px-4 absolute top-0 left-0 w-full">
                    <input
                        id="searchInput"
                        className="relative block w-96 p-2 ps-4 text-base text-gray-900 brd rounded-full bg-white focus:outline-none absolute mt-3"
                        placeholder="Search for teams, leagues and fixtures"
                        value={searchValue}
                        onChange={handleSearchInputChange}
                        required
                    />
                    <div onClick={() => setIsSearchVisible(false)} style={{top: "1.9rem"}} className="absolute right-8 h-4 w-4 transform -translate-y-1/2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-400" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </div>
                    {isSearchVisible && searchValue !== "" && searchData !== undefined &&
                        <div className="mt-6 rounded-xl w-96 bg-white p-3 brd drop-shadow-xl flex flex-col gap-4">
                            {searchData?.data?.leagueSuggest &&
                            <div className="flex flex-col gap-4">
                                <div className="text-base font-medium">Leagues</div>
                                {searchData?.data?.leagueSuggest?.[0]?.options.map((league, index) => {
                                    const parts = league?.text.split('|');
                                    const leagueName = parts[0];
                                    const leagueId = parts[1]; 
                                    return (
                                        <Link key={index} to={"/league/" + leagueId}>
                                            <div className="flex gap-3 items-center">
                                                <img alt="teamLogo" className="h-6 w-6" src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${leagueId}.png`} />
                                                <div className="text-base">{leagueName}</div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                            }
                            {searchData?.data?.matchSuggest &&
                            <div className="flex flex-col gap-4">
                                <div className="text-base font-medium">Matches</div>
                                {searchData?.data?.matchSuggest?.[0]?.options.map((match, index) => {
                                    return (
                                        <Link key={index} to={"/match-details/" + match?.payload.id}>
                                            <div className="flex gap-3 items-center">
                                                <img alt="playerPhoto" className="h-6 w-6" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${match?.payload?.homeTeamId}.png`} />
                                                <div className="text-base text-nowrap truncate">{match?.payload?.homeName}</div>
                                                <div className="text-base text-nowrap">-</div>
                                                <div className="text-base text-nowrap truncate">{match?.payload?.awayName}</div>
                                                <img alt="playerPhoto" className="h-6 w-6" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${match?.payload?.awayTeamId}.png`} />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                            }
                            {searchData?.data?.squadMemberSuggest &&
                            <div className="flex flex-col gap-4">
                                <div className="text-base font-medium">Players and Managers</div>
                                {searchData?.data?.squadMemberSuggest?.[0]?.options.map((squadMember, index) => {
                                    const parts = squadMember?.text?.split('|');
                                    const playerName = parts[0];
                                    const playerId = parts[1]; 
                                    return (
                                        <Link key={index} to={"/player/" + playerId}>
                                            <div className="flex gap-3 items-center">
                                                <div className="overflow-hidden h-6 w-6 rounded-full bg-white ">
                                                    <img alt="playerPhoto" className="h-6 w-6" onError={handleError} src={`https://images.fotmob.com/image_resources/playerimages/${playerId}.png`} />
                                                </div>
                                                <div className="text-base">{playerName}</div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                            }
                            {searchData?.data?.teamSuggest &&
                            <div className="flex flex-col gap-4">
                                <div className="text-base font-medium">Teams</div>
                                {searchData?.data?.teamSuggest?.[0]?.options.map((team, index) => {
                                    const parts = team?.text.split('|');
                                    const teamName = parts[0];
                                    const teamId = parts[1]; 
                                    return (
                                        <Link key={index} to={"/team/" + teamId}>
                                            <div className="flex gap-3 items-center">
                                                <img alt="teamLogo" className="h-6 w-6" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${teamId}.png`} />
                                                <div className="text-base">{teamName}</div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                            }
                        </div>
                    }
                </div>
                </>
            )}
        </div>
        </>
    );
}

export default SearchBar;

import MatchesCont from "../components/matches/MatchesCont";
import React, { useEffect, useState } from "react";
import ProvaApi from "../api/ProvaApi";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Layout/Footer";
import { Link } from "react-router-dom";

const Matches = () => {
	const apiProva = new ProvaApi();
    const [matchData, setMatchData] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const formattedDate = formatDate(currentDate);

        const fetchMatches = async () => {
            try {
                const responseMatchData = await apiProva.makeRequest(`api/matches?date=${formattedDate}&timezone=Europe%2FRome&ccode3=ITA`);
                setMatchData(responseMatchData.data.leagues);
                console.log(responseMatchData.data.leagues);
                setIsLoading(false); 
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        fetchMatches(); 

    }, [currentDate]);

    const [leagueListData, setleagueListData] = useState([]);
  
    useEffect(() => {
        const fetchLeagueList = async () => {
            try {
                const responseleagueListData = await apiProva.makeRequest(`api/allLeagues`);
                setleagueListData(responseleagueListData.data);  
            } catch (error) {
                console.log(error);
            }
        };

        fetchLeagueList(); 

    }, []);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}${month}${day}`;
    };

    const formatDisplayDate = (date) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return "Today";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return "Tomorrow";
        } else {
            const options = { weekday: "long", month: "long", day: "numeric" };
            return date.toLocaleDateString("en-US", options);
        }
    };

    const handleDateChange = (daysToAdd) => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + daysToAdd);
        setCurrentDate(newDate);
    };

	return (
		<>
			<Layout />
            {isLoading ? (
                    <div className="flex flex-col md:flex-row gap-3 p-4">
                        <div role="status" className="animate-pulse h-64 md:h-90 bg-gray-200 rounded-lg flex basis-3/12"></div>
                        <div role="status" className="animate-pulse h-64 md:h-90 bg-gray-200 rounded-lg flex md:hidden basis-3/12"></div>
                        <div role="status" className="animate-pulse h-64 md:h-90 bg-gray-200 rounded-lg flex md:hidden basis-3/12"></div>
                        <div className="hidden md:flex flex-col gap-3 basis-9/12">
                            <div role="status" className="animate-pulse h-64 bg-gray-200 rounded-lg w-full"></div>
                            <div role="status" className="animate-pulse h-64 bg-gray-200 rounded-lg w-full"></div>
                            <div role="status" className="animate-pulse h-64 bg-gray-200 rounded-lg w-full"></div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-start">
                        <div className="hidden md:flex basis-3/12 py-4 ps-4 fixed z-40">
                            <div className="flex flex-col md:flex-row gap-3 w-100">	
                            <div className="w-100 flex flex-col bg-white brd rounded-lg py-4">
                                <div className="px-4 text-lg font-medium leading-5 mb-4">Top Leagues</div>
                                <div className="brd05"></div>
                                {leagueListData?.popular?.map((league, index) => (
                                    <Link to={"/league/" + (league.id)} key={index}>
                                        <div className="flex gap-5 p-4 items-center rounded-lg hover:bg-gray-100">
                                            <img className="h-6" alt="leagueIcon" src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${league?.id}.png`}></img>
                                            <div className="textl-sm">{league?.name}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            </div>
                        </div>
                        <div className="ms-0 md:ms-60 w-full text-black flex flex-col p-4 gap-6">
                            <div className="flex flex-col rounded-lg bg-white brd p-4 gap-3">
                                <div className="flex justify-between">
                                    <div onClick={() => handleDateChange(-1)} className="hover:opacity-50 h-6 w-6 rounded-full bg-gray-200 brd flex items-center justify-center cursor-pointer">
                                        <img className="-rotate-90" alt="arrow" src="https://img.icons8.com/?size=512&id=86214&format=png"></img>
                                    </div>
                                    <div className="text-lg font-medium">{formatDisplayDate(currentDate)}</div>
                                    <div onClick={() => handleDateChange(1)} className="hover:opacity-50 h-6 w-6 rounded-full bg-gray-200 brd flex items-center justify-center cursor-pointer">
                                        <img className="rotate-90" alt="arrow" src="https://img.icons8.com/?size=512&id=86214&format=png"></img>
                                    </div>                    
                                </div>
                            </div>
                            {matchData?.map((match, index) => (
                                <div key={index}>
                                    <MatchesCont matchData={match.matches} leagueCountry={match.ccode} leagueTitle={match.name} leagueId={match?.primaryId} leagueIcon={`https://images.fotmob.com/image_resources/logo/leaguelogo/${match?.primaryId}.png`}/>
                                </div>
                            ))}
                        </div>
                    </div>
            )}
            <Footer side={true}/>
		</>
	);
};

export default Matches;

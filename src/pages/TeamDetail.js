import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react";
import TeamProfile from "../components/team/TeamProfile";
import LatestFuture from "../components/team/LatestFuture";
import PlayerCard from "../components/player/PlayerCard";
import ProvaApi from "../api/ProvaApi";
import News from "../components/news/News";
import Layout from "../components/Layout/Layout";
import Standings from "../components/standings/Standing";
import LeagueTransfers from "../components/League/LeagueTransfers"
import TeamMatchLine from "../components/team/TeamMatchLine"
import Statistics from "../components/team/Statistics";
import Footer from "../components/Layout/Footer";

const TeamDetail = (props) => {
    const {id} = useParams();
    const apiProva = new ProvaApi();
    const [teamData, setTeamData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const responseTeamData = await apiProva.makeRequest(`api/teams?id=${id}&ccode3=ITA`);
                setTeamData(responseTeamData?.data);  
                console.log(teamData)  
                setIsLoading(false); 
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        fetchTeam(); 

    }, [id]);
  
    console.log(teamData)
    const initialTab = teamData?.tabs?.[0] || "overview";
    const [activeTab, setActiveTab] = useState(initialTab); 

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const [startIndex, setStartIndex] = useState();

    useEffect(() => {
        const allMatches = teamData?.fixtures?.allFixtures?.fixtures;
        const lastMatchId = teamData?.fixtures?.allFixtures?.lastMatch?.id;
        const index = allMatches?.findIndex((match) => match.id === lastMatchId);
        setStartIndex(index >= 0 ? index-2 : 20);
    }, [teamData]);

    const handleDateChange = (increment) => {
        setStartIndex((prevIndex) => prevIndex + increment);
    };

	return (
		<>
            <Layout />
            {isLoading ? 
                <div className="flex flex-col gap-3 p-4">
                    <div role="status" className="animate-pulse h-64 bg-gray-200 rounded-lg flex"></div>
                    <div className="flex gap-3">
                        <div role="status" className="animate-pulse h-90 bg-gray-200 rounded-lg"></div>
                        <div role="status" className="animate-pulse h-90 bg-gray-200 rounded-lg"></div>
                    </div>
                    <div role="status" className="animate-pulse h-64 bg-gray-200 rounded-lg"></div>
                </div>
            :
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex flex-col px-4 pt-4 bg-white brd rounded-lg gap-8 md:gap-12">
                        <TeamProfile teamData={teamData} teamName={teamData.details?.name} teamNation={teamData.details?.country} teamLogo={`https://images.fotmob.com/image_resources/logo/teamlogo/${teamData.details?.id}.png` || ""} teamVenueName={teamData.details?.sportsTeamJSONLD?.location?.name || "Parc de Princes"} teamVenueCity={teamData.details?.sportsTeamJSONLD?.location?.address?.addressLocality || "Paris"}/>
                        <ul className="flex text-sm md:text-lg font-medium text-center" id="default-tab" role="tablist">
                            {teamData?.tabs?.slice(0, window.innerWidth <= 768 ? 6 : undefined).map((tab, index) => (
                                <li key={index} className={`relative cursor-pointer`} role="presentation">
                                    <div
                                        className={` ${tab === activeTab ? "text-black activeTab" : ""} px-2 md:px-4 pb-4 hover:opacity-50 text-xs text-[#6d6a7f] ${tab === activeTab ? "active-tab" : ""}`}
                                        onClick={() => handleTabClick(tab)}
                                        role="tab"
                                        aria-controls={tab}
                                        aria-selected={tab === activeTab ? "true" : "false"}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div id="default-tab-content">
                    {teamData?.tabs?.map((tab, index) => (
                        <div key={index} className={`${tab === activeTab ? "" : "hidden"}`} id={tab} role="tabpanel" aria-labelledby={`${tab.toLowerCase()}-tab`}>
                            {tab === "overview" && 
                                <div className="flex flex-col gap-4">
                                    <LatestFuture fixtureData={teamData?.fixtures?.allFixtures}/>
                                    <div className="flex flex-col gap-3 bg-white brd rounded-lg p-4 w-full">
                                        <div className="text-base font-medium leading-5">First Team</div>
                                        <div className="overflow-x-auto flex gap-3">
                                            {teamData?.squad?.map((squadElement, squadIndex) => {
                                                let [position, players] = squadElement;
                                                position = (position === "coach") ? "CH" :
                                                (position === "keepers") ? "GK" :
                                                (position === "defenders") ? "DEF" :
                                                (position === "midfielders") ? "MF" :
                                                (position === "attackers") ? "ATT" :
                                                position;
                            
                                                return players?.map((player, playerIndex) => (
                                                    <PlayerCard
                                                        key={`${squadIndex}-${playerIndex}`}
                                                        name={player.name}
                                                        position={position}
                                                        teamLogo={`https://images.fotmob.com/image_resources/logo/teamlogo/${teamData.details?.id}.png`}
                                                        image={`https://images.fotmob.com/image_resources/playerimages/${player.id}.png` || "https://shared-static-hosted4.stats.com/headshots/144x144/football/nfl/1116663.png"}
                                                        playerNumber={player.playerNumber}
                                                        playerId={player.id}
                                                        isInjured={player.isInjured}
                                                    />
                                                ));
                                            })}
                                        </div>
                                    </div>
                                    <Standings responseTable={teamData || ""}/>
                                    <div className="flex basis-1/2 flex-col gap-2 bg-white brd rounded-lg p-4 w-full">
                                        <div className="text-base font-medium leading-5">Team News</div>
                                        <News teamId={id} colorTeam={teamData?.history?.teamColor}/>
                                    </div>
                                </div>
                            }
                            {tab === "table" &&
                             <Standings responseTable={teamData || ""} full={true}/>
                            }
                            {tab === "squad" &&
                                <div className="flex flex-col gap-3">
                                    {teamData?.squad?.map((squadElement, squadIndex) => {
                                        let [position, players] = squadElement;
                                        position = (position === "coach") ? "CH" :
                                        (position === "keepers") ? "GK" :
                                        (position === "defenders") ? "DEF" :
                                        (position === "midfielders") ? "MF" :
                                        (position === "attackers") ? "ATT" :
                                        position;
                                        return (
                                            <div className="flex flex-col gap-3 p-4 brd bg-white rounded-lg" key={squadIndex}>
                                                <div className="text-base font-medium">
                                                    {squadElement[0].charAt(0).toUpperCase() + squadElement[0].slice(1)}
                                                </div>
                                                <div className="flex gap-3 md:flex-wrap overflow-x-auto">
                                                    {players?.map((player, playerIndex) => {
                                                        const { name, playerNumber } = player;
                                                        return (
                                                            <PlayerCard
                                                                key={`${squadIndex}-${playerIndex}`}
                                                                name={name}
                                                                position={position}
                                                                teamLogo={`https://images.fotmob.com/image_resources/logo/teamlogo/${teamData.details?.id}.png`}
                                                                image={`https://images.fotmob.com/image_resources/playerimages/${player.id}.png` || "https://shared-static-hosted4.stats.com/headshots/144x144/football/nfl/1116663.png"}
                                                                playerNumber={playerNumber}
                                                                playerId={player.id}
                                                                isInjured={player.isInjured}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );

                                    })}
                                </div>
                            }
                            {tab === "transfers" &&
                                <LeagueTransfers team={true} full={true} data={teamData?.transfers}/>
                            }
                            {tab === "stats" &&
                                <Statistics data={teamData?.stats?.players}/>
                            }
                            {tab === "fixtures" && (
                                <div className="flex flex-col gap-3">
                                <div className="flex flex-col rounded-lg bg-white brd p-4 gap-3">
                                    <div className="flex justify-between">
                                        <div onClick={() => handleDateChange(-10)} className="hover:opacity-50 h-6 w-6 rounded-full bg-gray-200 brd flex items-center justify-center cursor-pointer">
                                            <img className="-rotate-90" alt="arrow" src="https://img.icons8.com/?size=512&id=86214&format=png"></img>
                                        </div>
                                        <div className="text-lg font-medium">Recent Matches</div>
                                        <div onClick={() => handleDateChange(10)} className="hover:opacity-50 h-6 w-6 rounded-full bg-gray-200 brd flex items-center justify-center cursor-pointer">
                                            <img className="rotate-90" alt="arrow" src="https://img.icons8.com/?size=512&id=86214&format=png"></img>
                                        </div>
                                    </div>
                                </div>
                                {teamData?.fixtures?.allFixtures?.fixtures?.slice(startIndex, startIndex + 10).map((match, index) => (
                                  <div key={index} className="bg-white brd rounded-lg p-4">
                                        <TeamMatchLine data={match}/>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                    ))}
                    </div>
                </div>
            }
            <Footer />
		</>
	);
};

export default TeamDetail;




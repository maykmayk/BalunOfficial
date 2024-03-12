import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react";
import ProvaApi from "../api/ProvaApi";
import MatchDetailsTop from "../components/matches/MatchDetailsTop";
import Layout from "../components/Layout/Layout";
import MatchStats from "../components/matches/MatchStats";
import H2H from "../components/matches/H2H";
import MatchLineUp from "../components/matches/MatchLineUp";
import TeamForm from "../components/matches/TeamForm";
import MatchReplay from "../components/matches/MatchReplay";
import MatchEvents from "../components/matches/MatchEvents";
import MatchPoll from "../components/matches/MatchPoll";
import MatchLive from "../components/matches/MatchLive";
import Footer from "../components/Layout/Footer";
import Momentum from "../components/matches/Momentum";

const MatchDetail = () => {
    const {id} = useParams();
    const apiProva = new ProvaApi();
    const [matchData, setMatchData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        const fetchplayer = async () => {
            try {
                const responseMatchData = await apiProva.makeRequest(`api/matchDetails?matchId=${id}`);
                setMatchData(responseMatchData.data);  
                setIsLoading(false); 
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        fetchplayer(); 

    }, [id]);

    console.log(matchData)
    const langsList = matchData?.content?.liveticker?.langs?.split(",");
    const selectedLang = langsList?.includes("it") ? "it" : langsList?.includes("it_gen") ? "it_gen" : langsList?.includes("en_gen") ? "en_gen" : langsList?.includes("en") ? "en" : null;
	return (
		<>
            <Layout />
			<div className="text-black flex flex-col p-4 gap-5">
                {isLoading ? 
                <div className="flex flex-col gap-3 p-4">
                    <div role="status" className="animate-pulse h-64 bg-gray-200 rounded-lg flex"></div>
                    <div role="status" className="animate-pulse h-90 bg-gray-200 rounded-lg"></div>
                    <div role="status" className="animate-pulse h-64 bg-gray-200 rounded-lg"></div>
                </div>
                : 
                <>
                    <MatchDetailsTop matchData={matchData}/>
                    <div className="hidden xl:flex flex-row gap-4 items-top">
                        <div className={`flex flex-col gap-4 ${matchData?.content?.matchFacts?.events?.events?.length > 0 ? "basis-8/12" : "w-full"}`}>
                            {matchData?.content?.lineup?.lineup?.[0]?.players &&
                                <>
                                    <MatchLineUp matchData={matchData} />
                                    {matchData?.content?.momentum && 
                                        <Momentum colorData={matchData?.general?.teamColors?.lightMode} data={matchData} />
                                    }
                                </>
                            }
                            {matchData?.content?.stats?.Periods?.All?.stats?.[0]?.stats?.[0]?.title && 
                                <MatchStats matchData={matchData}/>
                            }
                            {matchData?.content?.h2h?.matches &&
                                <H2H matchData={matchData}/>
                            }
                            {/* <TeamForm matchData={matchData} /> */}
                        </div>
                        <div className="flex flex-col gap-4 basis-4/12 items-start">
                            <>
                                {matchData?.content?.matchFacts?.highlights?.url &&
                                    <MatchReplay data={matchData?.content?.matchFacts?.highlights} />
                                }
                                <div className="flex flex-col gap-3 w-full">
                                    <MatchEvents data={matchData} />
                                    <MatchLive lang={selectedLang} data={matchData} />
                                    <TeamForm matchData={matchData} />
                                </div>
                            </>
                            <MatchPoll data={matchData}/>
                        </div>
                    </div>
                    <div className="flex gap-4 flex-col xl:hidden">
                        {matchData?.content?.matchFacts?.highlights?.url &&
                            <MatchReplay data={matchData?.content?.matchFacts?.highlights} />
                        }
                        {matchData?.content?.lineup?.lineup?.[0]?.players &&
                            <>
                                <MatchLineUp matchData={matchData} />
                                {matchData?.content?.momentum && 
                                    <Momentum colorData={matchData?.general?.teamColors?.lightMode} data={matchData} />
                                }
                            </>
                        }
                        {!matchData?.header?.status?.finished && <MatchPoll data={matchData}/>}
                        <div className="flex md:flex-row flex-col-reverse gap-4">
                            <div className={`flex flex-col gap-4 ${matchData?.content?.matchFacts?.events?.events?.length > 0 ? "md:basis-6/12" : "w-full"} items-start`}>
                                {matchData?.content?.stats?.Periods?.All?.stats?.[0]?.stats?.[0]?.title && 
                                    <MatchStats matchData={matchData}/>
                                }
                                {matchData?.content?.h2h?.matches &&
                                    <H2H matchData={matchData}/>
                                }
                            </div>
                                <div className="flex md:basis-6/12 items-start">
                                    <div className="flex flex-col gap-3 w-full">
                                        <MatchEvents data={matchData} />
                                        <MatchLive lang={selectedLang} data={matchData} />
                                        <TeamForm matchData={matchData} />
                                    </div>
                                </div>
                        </div>
                    </div>
                </>
                }
            </div>	
            <Footer />
		</>
	);
};

export default MatchDetail;




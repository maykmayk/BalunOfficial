import React, { useEffect, useState } from "react";
import StandingLine from "./StandingLine";
import ProvaApi from "../../api/ProvaApi";

function Standings(props) {
    const apiProva = new ProvaApi();
    const [standingData, setStandingData] = useState([]);
    const [leagueData, setLeagueData] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (props.id) {
                    const responseProva = await apiProva.makeRequest(`api/tltable?leagueId=${props.id}`);
                    setStandingData(responseProva.data[0]);
                    setLeagueData(responseProva.data[0].data);
                } else {
                    const responseFromSquad = props.responseTable;
                    setStandingData(responseFromSquad?.table?.[0]);
                    setLeagueData(responseFromSquad.table?.[0]?.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();
    }, [props.id, props.responseTable]);

    const getColorClass = (leagueName) => {
        return (
            leagueName === "Champions League" ? "cl" :
            leagueName === "Qualification next stage" ? "cl" :
            leagueName === "Europa League" ? "el" :
            leagueName === "Europa League playoff stage" ? "qcl" :
            leagueName === "Europa Conference League Playoff" ? "eqlp" :
            leagueName === "Qualification to Europa Conference League Final Stage" ? "qcl" :
            leagueName === "Champions League qualification" ? "qcl" :
            leagueName === "Possible qualification next stage" ? "qcl" :
            leagueName === "Europa Conference League Qualification" ? "confl" :
            leagueName === "Relegation qualification" ? "qrl" :
            leagueName === "Relegation" ? "rl" :
            "default-color-class"
        );
    };

    return (
        <>
        {standingData && <div className="flex flex-col gap-5 py-4 rounded-lg bg-white brd w-full">
            <div className="fixed flex justify-between relative px-4">
                <div className="flex gap-5 items-center md:basis-6/12">
                <img className="h-7 w-7 object-contain" src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${leagueData?.leagueId}.png`} alt="leagueIcon" />
                    <div className="text-xl font-medium">{leagueData?.leagueName}</div> 
                </div>
                {standingData?.data?.table && <div className="flex items-center basis-5/12 text-end">
                    <div className="text-[#6d6a7f] basis-4/12 lg:block lg:basis-2/12">P</div>
                    <div className="text-[#6d6a7f] basis-4/12 hidden lg:block lg:basis-2/12">W</div>
                    <div className="text-[#6d6a7f] basis-4/12 hidden lg:block lg:basis-2/12">D</div>
                    <div className="text-[#6d6a7f] basis-4/12 hidden lg:block lg:basis-2/12">L</div>
                    <div className="text-[#6d6a7f] basis-4/12 lg:block lg:basis-2/12">GD</div>
                    <div className="font-medium basis-4/12 lg:block lg:basis-2/12">PT</div>
                </div>}
            </div>
            <div className="brd05"></div>
            <div className={`overflow-y-auto flex flex-col gap-8`}>
                {standingData?.data?.composite
                    ? standingData?.data?.tables.map((table, index) => (
                        <div className="flex flex-col gap-3" key={index}>
                            {index !== 0 && <div className="brd05"></div>}
                            <div className="flex px-4 ">
                                <div className="text-base font-medium basis-7/12">{table?.leagueName}</div>
                                <div className="flex items-center basis-5/12 text-end">
                                    {["P", "W", "D", "L", "GD", "PT"].map((label, i) => (
                                        <div key={i} className={`text-[#6d6a7f] basis-2/12 ${i < 4 ? "hidden lg:block" : "lg:block lg:basis-2/12"}`}>{label}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="brd05"></div>
                            <div className="flex flex-col gap-6">
                                {table?.table?.all?.map((team, teamIndex) => (
                                    <StandingLine
                                        key={teamIndex}
                                        index={team.idx}
                                        shortName={team.shortName}
                                        teamWins={team.wins}
                                        teamDraws={team.draws}
                                        teamLose={team.losses}
                                        teamPoints={team.pts}
                                        teamPlayed={team.played}
                                        teamId={team.id}
                                        teamDR={team.goalConDiff}
                                        qualifyingTeams={leagueData?.legend}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                    : standingData?.data?.table?.all?.slice(0, props.full ? undefined : 4)?.map((team, teamIndex) => (
                        <StandingLine
                            key={teamIndex}
                            index={team.idx}
                            shortName={team.shortName}
                            teamWins={team.wins}
                            teamDraws={team.draws}
                            teamLose={team.losses}
                            teamPoints={team.pts}
                            teamPlayed={team.played}
                            teamId={team.id}
                            teamDR={team.goalConDiff}
                            qualifyingTeams={leagueData?.legend}
                        />
                    ))
                }
            </div>
            <div className={`flex-col px-4 md:flex-row gap-3 flex-wrap ${props.full === true ? "flex" : "hidden"}`}>
                {leagueData?.legend?.map((legendItem, index) => (
                    <div className="flex items-center gap-3" key={index}>
                        <div className={`w-2 h-2 rounded-full ${getColorClass(legendItem?.title)}`}></div>
                        <div className="text-sm text-[#6d6a7f]">{legendItem?.title}</div>
                    </div>
                ))}
            </div>
        </div> }
        </>
    )
}

export default Standings;
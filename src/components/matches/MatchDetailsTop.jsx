import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MatchDetailsTop(props) {
    const matchData = props.matchData
    console.log(matchData)
    const inputDateString = matchData?.general?.matchTimeUTC;
    const dateObject = inputDateString ? new Date(inputDateString) : null;
    
    const timeFormatted = dateObject?.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
    
    const [dateFormatted, setDateFormatted] = useState("");
    useEffect(() => {
        if (dateObject?.toDateString() === new Date().toDateString()) {
            setDateFormatted("Today");
        } else {
            setDateFormatted(dateObject?.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" }) || "");
        }
    }, [dateObject, matchData]);
    
    const matchDateFull = dateObject?.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
    
    const [gameTime, setGameTime] = useState({ time: matchData?.header?.status?.liveTime?.long });
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (gameTime?.time !== "Half-Time" && !matchData?.header?.status?.finished) {
                const [minutes, seconds] = (gameTime?.time || "0:00").split(":").map(Number);
                const newSeconds = (seconds + 1) % 60;
                const newMinutes = minutes + Math.floor((seconds + 1) / 60);
                const newTime = `${String(newMinutes).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;
                setGameTime(prevState => ({ ...prevState, time: newTime }));
            } else {
                clearInterval(intervalId);
            }
        }, 1000);
    
        return () => clearInterval(intervalId);
    }, [gameTime, matchData]);
    
    

    const handleError = (event) => {
        event.target.src = "https://www.fotmob.com/_next/static/media/team_fallback.3ae01170.png";
    };

    return (
        <div className="min-w-full rounded-lg bg-white brd flex flex-col overflow-hidden">
            <div className="pt-4 relative">
                <Link to="/">
                    <div className="flex justify-center gap-3 items-center absolute top-0 start-0 p-4 py-5">
                        <div className="hover:opacity-50 h-6 w-6 rounded-full bg-gray-200 brd flex items-center justify-center cursor-pointer">
                            <img className="-rotate-90" alt="arrow" src="https://img.icons8.com/?size=512&id=86214&format=png"></img>
                        </div>
                        <div className="text-base font-medium hidden md:flex">Matches</div>
                    </div>
                </Link>
                <Link to={"/league/" + (matchData?.general?.parentLeagueId)}>
                    <div className="flex justify-center gap-3 items-center pb-4">
                        <img alt="matchLeagueIcon" onError={handleError} className="h-8" src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${matchData?.general?.parentLeagueId}.png`}></img>
                        <div className="text-base">{matchData?.general?.leagueName}</div>
                    </div>
                </Link>
                <div className="brd05"></div>
            </div>
            <div className="grid grid-cols-8 p-4 gap-2 md:gap-24 max-w-full items-center">
                <div className="flex justify-end items-center col-span-2 md:col-span-3 hover:opacity-50">
                    <Link to={"/team/" + matchData?.header?.teams?.[0]?.id}>
                        <div className="flex gap-4 items-center">
                            <div className="text-lg hidden md:block">{matchData?.header?.teams?.[0]?.name}</div>
                            <img className="h-14 object-contain" onError={handleError} src={`https://images.fotmob.com/image_resources/logo/teamlogo/${matchData?.header?.teams?.[0]?.id}.png`} alt="playerTeamLogo" />
                        </div>
                    </Link>
                </div>
                <div className="col-span-4 md:col-span-2">
                    {matchData?.header?.status?.scoreStr ? (
                        <div className="flex flex-col text-center">
                            <div className="text-3xl font-medium">{matchData?.header?.status?.scoreStr}</div>
                            {!matchData?.header?.status?.finished ? 
                                <div className="text-lg text-green-600">{gameTime?.time || matchData?.header?.status?.liveTime?.long}</div>
                                :
                                <div className="text-lg text-green-600">FT</div>
                            }
                        </div>
                        ) : (
                            <>
                            <div className="flex flex-col gap-1 text-center">
                                <div className="text-3xl font-medium">{timeFormatted || ""}</div>
                                <div className="text-xl font-medium text-[#6d6a7f]">{dateFormatted || ""}</div>
                            </div>
                            </>
                    )}                
                </div>
                <div className="flex items-center gap-3 col-span-2 md:col-span-3 hover:opacity-50">
                    <Link to={"/team/" + matchData?.header?.teams?.[1]?.id}>
                        <div className="flex gap-4 items-center">
                            <img className="h-14 object-contain " onError={handleError} src={`https://images.fotmob.com/image_resources/logo/teamlogo/${matchData?.header?.teams?.[1]?.id}.png`} alt="playerTeamLogo" />
                            <div className="text-lg hidden md:block">{matchData?.header?.teams?.[1]?.name}</div>
                        </div>
                    </Link>
                </div>
            </div>
            {matchData.header?.status?.scoreStr &&  matchData.header?.status?.scoreStr !== "0 - 0" &&
                <div className="flex items-top justify-center px-4 py-2 gap-5">
                    <div className="flex-1">
                        {matchData?.header?.events?.homeTeamGoals && Object.entries(matchData?.header?.events?.homeTeamGoals || {}).map(([playerName, goals], index) => {
                            if (goals && goals.length > 0) {
                            return (
                                <div key={index} className="text-base text-[#6d6a7f] text-end">
                                <Link to={"/player/" + goals[0].playerId}>
                                    <div>
                                    {playerName}
                                    {goals.map((goal, goalIndex) => (
                                        <span className="font-medium ms-2" key={goalIndex}>
                                        {goal.timeStr}' 
                                        {goalIndex < goals.length - 1 && ", "}
                                        </span>
                                    ))}
                                    </div>
                                </Link>
                                </div>
                            );
                            }
                            return null;
                        })}
                    </div>
                    <img className="h-4 mt-1" alt="goal" src="https://i.ibb.co/9tyd46p/SVG-to.png"></img>
                    <div className="flex-1">
                        {matchData?.header?.events?.awayTeamGoals && Object.entries(matchData?.header?.events?.awayTeamGoals || {}).map(([playerName, goals], index) => {
                            if (goals && goals.length > 0) {
                            return (
                                <div key={index} className="text-base text-[#6d6a7f] text-start">
                                <Link to={"/player/" + goals[0].playerId}>
                                    <div>
                                    {goals.map((goal, goalIndex) => (
                                        <span className="font-medium me-2" key={goalIndex}>
                                        {goal.timeStr}' 
                                        {goalIndex < goals.length - 1 && ", "}
                                        </span>
                                    ))}
                                    {playerName}
                                    </div>
                                </Link>
                                </div>
                            );
                            }
                            return null;
                        })}
                        </div>
                </div>
             }
            <div className="">
                <div className="brd05"></div>
                <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-5 items-center p-4">
                    {matchDateFull && <div className="flex gap-2 items-center">
                        <img alt="timeIcon" className="h-4" src="https://img.icons8.com/?size=512&id=85506&format=png" />
                        <div className="text-sm text-[#6d6a7f]">{matchDateFull}</div>
                    </div> }
                    {matchData?.content?.matchFacts?.infoBox?.Stadium?.name && <div className="flex gap-2 items-center">
                        <img alt="stadiumIcon" className="h-4" src="https://img.icons8.com/?size=512&id=uZRLE51QnN2j&format=png" />
                        <div className="text-sm text-[#6d6a7f]">{matchData?.content?.matchFacts?.infoBox?.Stadium?.name}</div>
                    </div> }
                    {matchData?.content?.matchFacts?.infoBox?.Referee?.text && <div className="flex gap-2 items-center">
                        <img alt="whistleIcon" className="h-4" src="https://img.icons8.com/?size=512&id=uZ9JzCeXJmTf&format=png" />
                        <div className="text-sm text-[#6d6a7f]">{matchData?.content?.matchFacts?.infoBox?.Referee?.text}</div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default MatchDetailsTop
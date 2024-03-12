import { useState } from "react";
import MatchCard from "../matches/MatchCard";

function LeagueMatches(props) {
    const leagueData = props.data
    const [currentMatchIndex, setCurrentMatchIndex] = useState(leagueData?.matches?.firstUnplayedMatch?.firstUnplayedMatchIndex || 0);

    const decrementMatchIndex = () => {
        const decrementValueMobile = window.innerWidth <= 768 ? 1 : 2;
        const decrementValueDesktop = window.innerWidth <= 1024 ? 2 : 3;
        const decrementValue = window.innerWidth <= 768 ? decrementValueMobile : decrementValueDesktop;
        setCurrentMatchIndex(prevIndex => Math.max(0, prevIndex - decrementValue));
    };

    const incrementMatchIndex = () => {
        const incrementValueMobile = window.innerWidth <= 768 ? 1 : 2;
        const incrementValueDesktop = window.innerWidth <= 1024 ? 2 : 3;
        const incrementValue = window.innerWidth <= 768 ? incrementValueMobile : incrementValueDesktop;
        setCurrentMatchIndex(prevIndex => Math.min(leagueData?.matches?.allMatches?.length - 1, prevIndex + incrementValue));
    };

    return (
        <div className="p-4 bg-white brd rounded-lg flex flex-col gap-4">
            <div className="flex justify-between">
                <div
                    className="hover:opacity-50 h-6 w-6 rounded-full bg-gray-200 brd flex items-center justify-center cursor-pointer"
                    onClick={decrementMatchIndex}
                >
                    <img className="-rotate-90" alt="arrow" src="https://img.icons8.com/?size=512&id=86214&format=png"></img>
                </div>  
                <div className="text-lg font-medium">Matches</div>
                <div
                    className="hover:opacity-50 h-6 w-6 flex-nowrap rounded-full bg-gray-200 brd flex items-center justify-center cursor-pointer"
                    onClick={incrementMatchIndex}
                >
                    <img className="rotate-90" alt="arrow" src="https://img.icons8.com/?size=512&id=86214&format=png"></img>
                </div>  
            </div>
            <div className="gap-3 flex flex-col md:flex-row justify-between items-center">
                <div className="flex w-full">
                    <MatchCard matchData={leagueData?.matches?.allMatches?.[currentMatchIndex]} />
                </div>
                <div className="hidden md:flex w-full">
                    <MatchCard matchData={leagueData?.matches?.allMatches?.[currentMatchIndex + 1]} />
                </div>
                <div className="hidden lg:flex w-full">
                    <MatchCard matchData={leagueData?.matches?.allMatches?.[currentMatchIndex + 2]} />
                </div>
            
            </div>
        </div>
    )
}

export default LeagueMatches
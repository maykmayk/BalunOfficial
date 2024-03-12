import { useState } from "react";

function MatchPoll(props) {
    const pollData = props.data?.content?.matchFacts?.poll
    const data = props.data
    const [show, setShow] = useState(false);

    const handleError = (event) => {
        event.target.src = "https://www.fotmob.com/_next/static/media/team_fallback.3ae01170.png";
    };

    const handleTeamClick = () => {
        setShow(true);
    };

    const totalVotes = pollData?.voteResult?.Votes?.[0]?.Votes?.[0] + pollData?.voteResult?.Votes?.[0]?.Votes?.[1] + pollData?.voteResult?.Votes?.[0]?.Votes?.[2]
    const homeTeamPercentage = ((pollData?.voteResult?.Votes?.[0]?.Votes?.[0] / totalVotes) * 100).toFixed(0);
    const drawPercentage = ((pollData?.voteResult?.Votes?.[0]?.Votes?.[1] / totalVotes) * 100).toFixed(0);
    const awayTeamPercentage = ((pollData?.voteResult?.Votes?.[0]?.Votes?.[2] / totalVotes) * 100).toFixed(0);

    return (
        <div className="w-full flex flex-col gap-5 p-4 rounded-lg bg-white brd">
            <div className="font-medium text-base text-center ">{pollData?.oddspoll?.Facts?.[0]?.DefaultLabel}</div>
            <div className="flex justify-between px-0 md:px-40 xl:px-0">
                <div className="flex flex-1 flex-col gap-2 hover:opacity-50 cursor-pointer text-center items-start" onClick={handleTeamClick}>
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white brd">
                        <img className="h-6 w-6 object-contain" onError={handleError} src={`https://images.fotmob.com/image_resources/logo/teamlogo/${pollData?.oddspoll?.HomeTeamId}.png`} alt="teamLogo" />
                    </div>
                    <div className="text-base text-[#6d6a7f] font-medium text-nowrap truncate">{show ? homeTeamPercentage + "%" : pollData?.oddspoll?.HomeTeam}</div>
                </div>
                <div className="flex flex-1 flex-col gap-5 items-center">
                    <div className="flex flex-col gap-2 hover:opacity-50 cursor-pointer text-center items-center justify-center h-10 w-10 rounded-full bg-white brd" onClick={handleTeamClick}>
                        <div className="text-base text-[#6d6a7f] font-medium text-nowrap truncate">X</div>
                    </div>
                    <div className="text-base text-[#6d6a7f] font-medium text-nowrap truncate">{show ? drawPercentage + "%" : ""}</div>
                </div>
                <div className="flex flex-1 flex-col gap-2 hover:opacity-50 cursor-pointer text-center items-end" onClick={handleTeamClick}>
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white brd">
                        <img className="h-6 w-6 object-contain" onError={handleError} src={`https://images.fotmob.com/image_resources/logo/teamlogo/${pollData?.oddspoll?.AwayTeamId}.png`} alt="teamLogo" />
                    </div>
                    <div className="text-base text-[#6d6a7f] font-medium text-nowrap truncate">{show ? awayTeamPercentage + "%" : pollData?.oddspoll?.AwayTeam}</div>
                </div>
            </div>
            {show && <div className="text-base text-center text-[#6d6a7f] font-medium">Total Votes: {totalVotes}</div>}
        </div>
    );
}

export default MatchPoll;

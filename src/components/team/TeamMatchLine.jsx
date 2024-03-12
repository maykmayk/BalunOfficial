import { Link } from "react-router-dom"

function TeamMatchLine(props) {
    const matchData = props.data

    let dateString = matchData?.status?.utcTime
    const dateObject = new Date(dateString);

    const formattedTime = dateObject.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });

    const matchUrl = matchData?.matchUrl;
    const regex = /#(\d+)$/;
    const matchResult = matchUrl?.match(regex);
    const extractedNumbers = matchResult ? matchResult[1] : null;

    const dataOriginale = new Date(matchData?.status?.utcTime);
    const formatoData = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const h2hDate = formatoData.format(dataOriginale);

    const handleError = (event) => {
        event.target.src = "https://www.fotmob.com/_next/static/media/team_fallback.3ae01170.png";
    };

    return (
        // ""
        <Link to={"/match-details/" + (matchData.id)}>
            <div className="flex gap-4 flex-col">
                <div className="flex justify-between">
                    <div className="text-sm text-[#6d6a7f]">{h2hDate}</div>
                    <div className="flex gap-3 items-center">
                        <div className="text-sm text-[#6d6a7f]">{matchData?.tournament?.name}</div>
                        <img alt="matchLeagueIcon" className="h-4" src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${matchData?.tournament?.leagueId}.png`}></img>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="w-100 flex gap-5 items-center justify-center relative">       
                        <div className="flex flex-1 gap-3 items-center justify-end hover:opacity-50">
                            <div className="font-sm hidden md:block text-nowrap truncate">{matchData.home.name}</div>
                            <img className="h-6 w-6 object-contain" onError={handleError} src={`https://images.fotmob.com/image_resources/logo/teamlogo/${matchData.home.id}.png`} alt="teamLogo" />
                        </div>
                        <div className="flex flex-2 text-center justify-center">
                        {matchData.status.finished && matchData.status.cancelled ? (
                            <div className="text-white text-sm bg-red-600 rounded-full px-3 py-0.5">
                                {matchData.status.reason.short}
                            </div>
                        ) : matchData.status.finished ? (
                            <>
                                <div className="text-gray-500 text-xs absolute top-1 start-0 bg-gray-100 rounded-full px-3 py-0.5">
                                    {matchData.status.reason.short}
                                </div>
                                <div className="text-lg font-medium">
                                    {matchData.status?.scoreStr}
                                </div>
                            </>
                        ) : (
                            <>
                                {matchData.status.ongoing ? (
                                    <div className="flex gap-3 items-center">
                                        <div className="text-white absolute top-0 text-xs start-0 bg-green-600 rounded-full px-3 py-0.5">
                                            {matchData.status.liveTime.short}
                                        </div>
                                        <div className="text-lg font-medium">
                                            {matchData.status?.scoreStr}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-gray-500 text-xs bg-gray-100 rounded-full px-3 py-0.5">
                                        {formattedTime}
                                    </div>
                                )}
                            </>
                        )}
                        </div>
                        <div className="flex flex-1 gap-3 items-center justify-start hover:opacity-50">
                            <img className="h-6 w-6 object-contain" onError={handleError} src={`https://images.fotmob.com/image_resources/logo/teamlogo/${matchData.away.id}.png`} alt="teamLogo" />
                            <div className="font-sm hidden md:block text-nowrap truncate">{matchData.away.name}</div>
                        </div>            
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default TeamMatchLine
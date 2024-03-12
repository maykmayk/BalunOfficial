import { Link } from "react-router-dom";

function MatchCard(props) {
    const fixData = props.matchData
    const data = new Date(fixData?.status?.utcTime);
    const options = { month: "short", day: "numeric" };
    const dataFormattata = data.toLocaleString("en-US", options);
    const orario = new Date(fixData?.status?.utcTime);
    const ora = ("0" + orario.getUTCHours()).slice(-2);
    const minuti = ("0" + orario.getUTCMinutes()).slice(-2);
    const orarioFormattato = `${ora}:${minuti}`;
    console.log(fixData)

    const handleError = (event) => {
        event.target.src = "https://www.fotmob.com/_next/static/media/team_fallback.3ae01170.png";
    };


    return (
        <div className="p-4 rounded-lg w-full bg-white brd">
            <Link to={"/match-details/" + fixData?.id}>
            <div className="flex justify-between">
                <div className="w-full flex flex-col text-center gap-2 items-start">
                    <Link to={"/team/" + (fixData?.home?.id)}>
                    <div className="flex flex-col items-center gap-2">
                        <img className="h-10 object-contain" onError={handleError} src={`https://images.fotmob.com/image_resources/logo/teamlogo/${fixData?.home?.id}.png` || ""} alt="teamLogo" />
                        <div className="text-xs font-medium text-wrap">{fixData?.home?.name}</div>
                    </div>
                    </Link>
                </div>
                <div className="w-full flex flex-col gap-2 items-center justify-center">
                    {!fixData?.status?.started && !fixData?.status?.finished ? (
                        <>
                            <div className="text-lg font-medium">{orarioFormattato}</div>
                            <div className="text-sm text-[#6d6a7f]">
                                {dataFormattata}
                            </div>
                        </>
                    ) : (
                        fixData?.status?.started && fixData?.status?.ongoing ? (
                            <>
                                {/* <div className="text-lg font-medium">{fixData?.status?.scoreStr}</div> */}
                                <div className="bg-green-600 rounded-full px-3 py-0.5">
                                    <div className="text-white text-sm animate-pulse">
                                        {fixData?.status?.scoreStr}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-lg font-medium">{fixData?.status?.scoreStr}</div>
                                <div className="text-sm bg-gray-200 rounded-full px-3 py-0.5">
                                    {fixData?.status?.reason?.short}
                                </div>
                            </>
                        )
                    )}
                </div>
                <div className="w-full flex flex-col text-end gap-2 items-end">
                    <Link to={"/team/" + (fixData?.away?.id)}>
                        <div className="flex flex-col items-center gap-2">
                            <img className="h-10 object-contain" onError={handleError} src={`https://images.fotmob.com/image_resources/logo/teamlogo/${fixData?.away?.id}.png` || ""} alt="teamLogo" />
                            <div className="text-xs font-medium text-wrap">{fixData?.away?.name}</div>
                        </div>
                    </Link>
                </div>
            </div>
            
        </Link>
        </div>
    )
}

export default MatchCard
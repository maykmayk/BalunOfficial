import { Link } from "react-router-dom"
import PlayerLineUp from "./LineUp/PlayerLineUp"

function MatchLineUp(props) {
    const matchData = props.matchData
    const matchLineUp = props.matchData?.content?.lineup?.lineup
    console.log(props.matchData)
    const handleError = (event) => {
        event.target.src = "https://i.ibb.co/q9SWXK2/player-placeholder.png";
    };

    const borderColor = matchData?.header?.status?.started ? "#489d6c" : "#68707a";

    const andreaStyle = {
        content: " ",
        width: "150px",
        height: "150px",
        border: `solid 6px ${borderColor}`,
        position: "absolute",
        borderRadius: "50%",
        top: "calc(50% - 75px)",
        left: "calc(50% - 75px)",
    };

    const andreaaStyle = {
        content: " ",
        width: "100px",
        height: "100px",
        border: `solid 4px ${borderColor}`,
        position: "absolute",
        borderRadius: "50%",
        top: "calc(50% - 50px)",
        left: "calc(50% - 50px)"
    };

    return(
        <div className="flex flex-col rounded-lg w-full bg-white brd">
            <div className="p-4 flex">
                <div className="flex flex-1 items-center gap-2">
                    <img className="h-6 object-contain hidden md:block" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${matchData?.header?.teams?.[0]?.id}.png`} alt="playerTeamLogo" />
                    <div className="px-3 font-sm flex items-center justify-end rounded-full text-gray-600 bg-gray-200">
                        {matchLineUp?.[0]?.lineup && matchLineUp[0].lineup.replace(/\s/g, '')}
                    </div>
                    <div className="text-sm text-[#6d6a7f] hidden md:block">{matchData?.header?.teams?.[0]?.name}</div>
                </div>
                <div className="flex flex-1 justify-center">
                    {matchData?.header?.status?.started && <div className="font-base font-medium text-nowrap truncate text-center">Match Lineup</div>}
                    {!matchData?.header?.status?.started && <div className="font-base font-medium  text-nowrap truncate text-center">Predicted Lineup</div>}
                </div>
                <div className="flex flex-1 items-center gap-2 justify-end">
                    <div className="text-sm text-[#6d6a7f] hidden md:block">{matchData?.header?.teams?.[1]?.name}</div>
                    <div className="px-3 font-sm flex items-center justify-end rounded-full text-gray-600 bg-gray-200">
                        {matchLineUp?.[1]?.lineup && matchLineUp[1].lineup.replace(/\s/g, '')}
                    </div>
                    <img className="h-6 object-contain hidden md:block" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${matchData?.header?.teams?.[1]?.id}.png`} alt="playerTeamLogo" />
                </div>
            </div>

            <div className={`hidden md:flex gap-4 rounded-lg w-full ${!matchData?.header?.status?.started ? "bg-gray-600" : ""} h-120 relative`}  style={{ backgroundColor: matchData?.header?.status?.started ? "#419161" : "" }}>
                    <div className="andrea1">
                        <svg xmlns="http://www.w3.org/2000/svg" id="lineup_1_214x118" width="276" height="154" viewBox="0 0 316 174"><g id="Group_4486" fill={matchData?.header?.status?.started ? "#489d6c" : "#68707a"} data-name="Group 4486" transform="translate(84.168)"><path id="Path_2174" d="M57 0h5.907v50.136a5.92 5.92 0 0 0 5.907 5.9H192.85a5.92 5.92 0 0 0 5.907-5.9V0h5.907v50.136a11.84 11.84 0 0 1-11.813 11.8H68.813A11.84 11.84 0 0 1 57 50.136z" data-name="Path 2174" transform="translate(-57)"></path></g><path id="Path_2175" fill={matchData?.header?.status?.started ? "#489d6c" : "#68707a"} d="M11.813 150.407h90.813a76.778 76.778 0 0 0 110.748 0h90.813A11.839 11.839 0 0 0 316 138.61V0h-5.906v138.61a5.92 5.92 0 0 1-5.907 5.9H11.813a5.92 5.92 0 0 1-5.907-5.9V0H0v138.61a11.84 11.84 0 0 0 11.813 11.797zm193 0a70.761 70.761 0 0 1-93.619 0z" data-name="Path 2175"></path></svg>
                    </div>
                    <div className="andrea" style={{ backgroundColor: matchData?.header?.status?.started ? "#489d6c" : "#68707a" }}>
                        <span style={andreaStyle}></span>
                    </div>                    
                    <div className="andrea3">
                        <svg xmlns="http://www.w3.org/2000/svg" id="lineup_1_214x118" width="276" height="154" viewBox="0 0 316 174"><g id="Group_4486" fill={matchData?.header?.status?.started ? "#489d6c" : "#68707a"} data-name="Group 4486" transform="translate(84.168)"><path id="Path_2174" d="M57 0h5.907v50.136a5.92 5.92 0 0 0 5.907 5.9H192.85a5.92 5.92 0 0 0 5.907-5.9V0h5.907v50.136a11.84 11.84 0 0 1-11.813 11.8H68.813A11.84 11.84 0 0 1 57 50.136z" data-name="Path 2174" transform="translate(-57)"></path></g><path id="Path_2175" fill={matchData?.header?.status?.started ? "#489d6c" : "#68707a"} d="M11.813 150.407h90.813a76.778 76.778 0 0 0 110.748 0h90.813A11.839 11.839 0 0 0 316 138.61V0h-5.906v138.61a5.92 5.92 0 0 1-5.907 5.9H11.813a5.92 5.92 0 0 1-5.907-5.9V0H0v138.61a11.84 11.84 0 0 0 11.813 11.797zm193 0a70.761 70.761 0 0 1-93.619 0z" data-name="Path 2175"></path></svg>
                    </div>
                <div className="flex w-full z-30 gap-10">
                    <div className="flex flex-1 px-3 py-5 justify-between max-w-full">
                        <div className="flex flex-nowrap max-h-full flex-col justify-center gap-10">
                            {matchLineUp?.[0]?.players?.[0]?.map((player, index) => (
                                <PlayerLineUp player={player} key={index}/>
                            ))}
                    </div>
                        <div className="flex flex-nowrap max-h-full flex-col justify-center gap-10">
                            {matchLineUp?.[0]?.players?.[1]?.map((player, index) => (
                                <PlayerLineUp player={player} key={index}/>
                            ))}
                    </div>
                        <div className="flex flex-nowrap max-h-full flex-col justify-center gap-10">
                            {matchLineUp?.[0]?.players?.[2]?.map((player, index) => (
                                <PlayerLineUp player={player} key={index}/>
                            ))}
                    </div>
                        <div className="flex flex-nowrap max-h-full flex-col justify-center gap-10">
                            {matchLineUp?.[0]?.players?.[3]?.map((player, index) => (
                                <PlayerLineUp player={player} key={index}/>
                            ))}
                    </div>
                        {matchLineUp?.[0]?.players?.[4] && 
                            <div className="flex flex-nowrap max-h-full flex-col justify-center gap-10">
                                {matchLineUp?.[0]?.players?.[4]?.map((player, index) => (
                                    <PlayerLineUp player={player} key={index}/>
                                ))}
                            </div>
                        }
                    </div>
                    <div className="flex flex-1 px-3 py-5 justify-between">
                        <div className="flex flex-nowrap max-h-full flex-col justify-center gap-10">
                            {matchLineUp?.[1]?.players?.[0]?.map((player, index) => (
                                <PlayerLineUp player={player} key={index}/>
                            ))}
                    </div>
                        <div className="flex flex-nowrap max-h-full flex-col justify-center gap-10">
                            {matchLineUp?.[1]?.players?.[1]?.map((player, index) => (
                                <PlayerLineUp player={player} key={index}/>
                            ))}
                    </div>
                        <div className="flex flex-nowrap max-h-full flex-col justify-center gap-10">
                            {matchLineUp?.[1]?.players?.[2]?.map((player, index) => (
                                <PlayerLineUp player={player} key={index}/>
                            ))}
                    </div>
                        <div className="flex flex-nowrap max-h-full flex-col justify-center gap-10">
                            {matchLineUp?.[1]?.players?.[3]?.map((player, index) => (
                                <PlayerLineUp player={player} key={index}/>
                            ))}
                    </div>
                        {matchLineUp?.[1]?.players?.[4] &&
                            <div className="flex flex-nowrap max-h-full flex-col justify-center gap-10">
                                {matchLineUp?.[1]?.players?.[4]?.map((player, index) => (
                                    <PlayerLineUp player={player} key={index}/>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className={`md:hidden flex gap-4 rounded-lg w-full ${!matchData?.header?.status?.started ? "bg-gray-600" : ""} h-120 relative`} style={{ backgroundColor: matchData?.header?.status?.started ? "#419161" : "" }}>
                    <div className="andrea11">
                        <svg xmlns="http://www.w3.org/2000/svg" id="lineup_1_214x118" width="214" height="118" viewBox="0 0 316 174"><g id="Group_4486" fill={matchData?.header?.status?.started ? "#489d6c" : "#68707a"} data-name="Group 4486" transform="translate(84.168)"><path id="Path_2174" d="M57 0h5.907v50.136a5.92 5.92 0 0 0 5.907 5.9H192.85a5.92 5.92 0 0 0 5.907-5.9V0h5.907v50.136a11.84 11.84 0 0 1-11.813 11.8H68.813A11.84 11.84 0 0 1 57 50.136z" data-name="Path 2174" transform="translate(-57)"></path></g><path id="Path_2175" fill={matchData?.header?.status?.started ? "#489d6c" : "#68707a"} d="M11.813 150.407h90.813a76.778 76.778 0 0 0 110.748 0h90.813A11.839 11.839 0 0 0 316 138.61V0h-5.906v138.61a5.92 5.92 0 0 1-5.907 5.9H11.813a5.92 5.92 0 0 1-5.907-5.9V0H0v138.61a11.84 11.84 0 0 0 11.813 11.797zm193 0a70.761 70.761 0 0 1-93.619 0z" data-name="Path 2175"></path></svg>                    
                    </div>
                    <div className="andreaa" style={{ backgroundColor: matchData?.header?.status?.started ? "#489d6c" : "#68707a" }}>
                        <span style={andreaaStyle}></span>
                    </div>
                    <div className="andrea33">
                        <svg xmlns="http://www.w3.org/2000/svg" id="lineup_1_214x118" width="214" height="118" viewBox="0 0 316 174"><g id="Group_4486" fill={matchData?.header?.status?.started ? "#489d6c" : "#68707a"} data-name="Group 4486" transform="translate(84.168)"><path id="Path_2174" d="M57 0h5.907v50.136a5.92 5.92 0 0 0 5.907 5.9H192.85a5.92 5.92 0 0 0 5.907-5.9V0h5.907v50.136a11.84 11.84 0 0 1-11.813 11.8H68.813A11.84 11.84 0 0 1 57 50.136z" data-name="Path 2174" transform="translate(-57)"></path></g><path id="Path_2175" fill={matchData?.header?.status?.started ? "#489d6c" : "#68707a"} d="M11.813 150.407h90.813a76.778 76.778 0 0 0 110.748 0h90.813A11.839 11.839 0 0 0 316 138.61V0h-5.906v138.61a5.92 5.92 0 0 1-5.907 5.9H11.813a5.92 5.92 0 0 1-5.907-5.9V0H0v138.61a11.84 11.84 0 0 0 11.813 11.797zm193 0a70.761 70.761 0 0 1-93.619 0z" data-name="Path 2175"></path></svg>                    
                    </div>
                <div className="flex flex-col w-full h-full z-30">
                    <div className="flex flex-col flex-1 px-3 py-5 justify-between gap-5 min-h-120">
                        <div className={`flex flex-nowrap w-full justify-center ${matchLineUp?.[0]?.players?.[0]?.length <= 4 && "gap-5"}`}>
                            {matchLineUp?.[0]?.players?.[0]?.map((player, index) => (
                                <PlayerLineUp player={player} key={index}/>
                            ))}
                    </div>
                        <div className={`flex flex-nowrap w-full justify-center ${matchLineUp?.[0]?.players?.[1]?.length <= 4 && "gap-5"}`}>
                            {matchLineUp?.[0]?.players?.[1]?.map((player, index) => (
                                <PlayerLineUp player={player} key={index}/>
                            ))}
                    </div>
                        <div className={`flex flex-nowrap w-full justify-center ${matchLineUp?.[0]?.players?.[2]?.length <= 4 && "gap-5"}`}>
                            {matchLineUp?.[0]?.players?.[2]?.map((player, index) => (
                                <PlayerLineUp player={player} key={index}/>
                            ))}
                    </div>
                        <div className={`flex flex-nowrap w-full justify-center ${matchLineUp?.[0]?.players?.[3]?.length <= 4 && "gap-5"}`}>
                            {matchLineUp?.[0]?.players?.[3]?.map((player, index) => (
                                <PlayerLineUp player={player} key={index}/>
                            ))}
                    </div>
                        {matchLineUp?.[0]?.players?.[4] && 
                            <div className={`flex flex-nowrap w-full justify-center ${matchLineUp?.[0]?.players?.[4]?.length <= 4 && "gap-5"}`}>
                                {matchLineUp?.[0]?.players?.[4]?.map((player, index) => (
                                    <PlayerLineUp player={player} key={index}/>
                                ))}
                            </div>
                        }
                    </div>
                    <div className="flex flex-col flex-1 px-3 py-5 justify-between gap-5 min-h-120">
                        <div className={`flex flex-nowrap w-full justify-center ${matchLineUp?.[1]?.players?.[0]?.length <= 4 && "gap-5"}`}>
                            {matchLineUp?.[1]?.players?.[0]?.map((player, index) => (
                                <PlayerLineUp player={player} key={index}/>
                            ))}
                    </div>
                        <div className={`flex flex-nowrap w-full justify-center ${matchLineUp?.[1]?.players?.[1]?.length <= 4 && "gap-5"}`}>
                            {matchLineUp?.[1]?.players?.[1]?.map((player, index) => (
                                <PlayerLineUp player={player} key={index}/>
                            ))}
                    </div>
                        <div className={`flex flex-nowrap w-full justify-center ${matchLineUp?.[1]?.players?.[2]?.length <= 4 && "gap-5"}`}>
                            {matchLineUp?.[1]?.players?.[2]?.map((player, index) => (
                                <PlayerLineUp player={player} key={index}/>
                            ))}
                    </div>
                        <div className={`flex flex-nowrap w-full justify-center ${matchLineUp?.[1]?.players?.[3]?.length <= 4 && "gap-5"}`}>
                            {matchLineUp?.[1]?.players?.[3]?.map((player, index) => (
                                <PlayerLineUp player={player} key={index}/>
                            ))}
                    </div>
                        {matchLineUp?.[1]?.players?.[4] &&
                            <div className={`flex flex-nowrap w-full justify-center ${matchLineUp?.[1]?.players?.[4]?.length <= 4 && "gap-5"}`}>
                                {matchLineUp?.[1]?.players?.[4]?.map((player, index) => (
                                    <PlayerLineUp player={player} key={index}/>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className="p-4 flex items-center">
                <div className="flex flex-1 items-center gap-4 hover:opacity-50">
                    <div className="highGray flex justify-center items-end h-10 w-10 rounded-full overflow-hidden">
                            <img className="h-8 object-contain" onError={handleError} src={`https://images.fotmob.com/image_resources/playerimages/${matchLineUp?.[0]?.coach?.[0]?.id}.png`} alt="playerTeamLogo" />
                    </div>
                    <div className="text-base text-[#6d6a7f]">{matchLineUp?.[0]?.coach?.[0]?.name.lastName}</div>
                </div>
                <div className="flex flex-1 justify-center">
                    {matchLineUp?.[0]?.coach?.[0].role && <div className="font-base font-medium">{matchLineUp?.[0]?.coach?.[0].role}</div>}
                </div>
                <div className="flex flex-1 items-center gap-4 justify-end hover:opacity-50">
                    <div className="text-base text-[#6d6a7f]">{matchLineUp?.[1]?.coach?.[0]?.name.lastName}</div>
                    <div className="highGray flex justify-center items-end h-10 w-10 rounded-full overflow-hidden">
                        <img className="h-8 object-contain" onError={handleError} src={`https://images.fotmob.com/image_resources/playerimages/${matchLineUp?.[1]?.coach?.[0]?.id}.png`} alt="playerTeamLogo" />
                    </div>
                </div>
            </div>
            <div className="brd05"></div>
            {/* {matchLineUp?.[0]?.bench || matchLineUp?.[1]?.bench && */}
            <div className="flex flex-col pt-4 gap-4">
                <div className="font-base font-medium text-center">Substitutes</div>
                <div className="flex gap-3">
                    <div className="flex flex-col ps-4 pb-4 gap-5 basis-6/12 flex-1">
                        {matchLineUp?.[0]?.bench?.map((subbed, index) => (
                            subbed?.events?.sub?.subbedIn && 
                            <PlayerLineUp player={subbed} key={index} />
                        ))}
                    </div>
                    <div className="brd05"></div>
                    <div className="flex flex-col pe-4 pb-4 gap-5 basis-6/12 flex-1">
                        {matchLineUp?.[1]?.bench?.map((subbed, index) => (
                            subbed?.events?.sub?.subbedIn && 
                            <PlayerLineUp player={subbed} key={index} />
                        ))}
                    </div>
                </div>
            </div>
            {/* } */}
        </div>
    )
}

export default MatchLineUp
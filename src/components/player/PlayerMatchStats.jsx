import { Link } from "react-router-dom";

function PlayerMatchStats(props) {
    const playerMatchStat = props.data
    console.log(playerMatchStat)

    return(
        <div className="flex flex-col bg-white brd rounded-lg py-4 gap-3">
            <div className="flex gap-3 items-center px-4">
                <div className="text-lg font-medium">Match Stats</div>
            </div>
            <div className="brd05"></div>
            <div className="hidden md:flex flex-col gap-3">
                <div className="flex justify-between px-4 items-center">
                    <div className="text-base text-[#6d6a7f] flex basis-9/12">Matches</div>
                    <div className="flex basis-3/12 justify-between">
                        <img alt="icon" className="h-4 object-contain flex basis-2/12" src="https://img.icons8.com/?size=512&id=118085&format=png"></img>
                        <img alt="icon" className="h-4 object-contain flex basis-2/12" src="https://i.ibb.co/9tyd46p/SVG-to.png"></img>
                        <img alt="icon" className="h-4 object-contain flex basis-2/12" src="https://img.icons8.com/?size=512&id=110622&format=png"></img>
                        <div className="hidden lg:flex basis-2/12 justify-center"><div className="h-4 w-3 bg-yellow-400 rounded-sm"></div></div>
                        <div className="hidden lg:flex basis-2/12 justify-center"><div className="h-4 w-3 bg-red-400 rounded-sm"></div></div>
                        <img alt="icon" className="h-4 object-contain flex basis-2/12" src="https://img.icons8.com/?size=512&id=85185&format=png"></img>
                    </div>
                </div>
                <div className="brd05"></div>
            </div>
            <div className="flex flex-col px-4 gap-4 gap-y-6 md:gap-y-4">
            {playerMatchStat?.slice(0, 10).map((matchStat, index) => {
                const matchDate = new Date(matchStat?.matchDate?.utcTime);
                const options = { month: 'short', day: 'numeric', year: 'numeric' };
                const formattedDate = new Intl.DateTimeFormat('en-US', options).format(matchDate);
            
                const currentDate = new Date();
                const yesterday = new Date(currentDate);
                yesterday.setDate(currentDate.getDate() - 1);

                return (
                    <div key={index}>
                        <Link to={"/match-details/" + (matchStat?.id)}>
                            <div className="text-center hidden md:flex">
                                <div className="flex gap-3 items-center basis-3/12">
                                    <img alt="leagueIcon" className="h-4" src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${matchStat?.leagueId}.png`} ></img>
                                    <div className="text-sm truncate">{currentDate.toDateString() === matchDate.toDateString() ? 'Today' : yesterday.toDateString() === matchDate.toDateString() ? 'Yesterday' : formattedDate}</div>
                                </div>
                                <div className="flex justify-between basis-4/12">
                                    <div className="flex gap-3 items-center">
                                        <img alt="opponentTeamIcon" className="h-4" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${matchStat?.opponentTeamId}.png`} ></img>
                                        <div className="text-sm truncate">{matchStat?.opponentTeamName}</div>
                                    </div>
                                    <div className="flex gap-1 text-nowrap text-[#6d6a7f]">
                                        <div className={`text-sm ${matchStat?.isHomeTeam && "font-bold"}`}>{matchStat?.homeScore} -</div>
                                        <div className={`text-sm ${!matchStat?.isHomeTeam && "font-bold"}`}> {matchStat?.awayScore}</div>
                                    </div>
                                </div>
                                <div className="flex basis-2/12"></div>
                                <div className="flex justify-between basis-3/12 justify-end">
                                    <div className="text-sm flex justify-center basis-2/12">{matchStat?.minutesPlayed}'</div>
                                    <div className="text-sm flex justify-center basis-2/12">{matchStat?.goals}</div>
                                    <div className="text-sm flex justify-center basis-2/12">{matchStat?.assists}</div>
                                    <div className="text-sm basis-2/12 hidden lg:flex justify-center">{matchStat?.yellowCards}</div>
                                    <div className="text-sm basis-2/12 hidden lg:flex justify-center">{matchStat?.redCards}</div>
                                    {matchStat?.ratingProps.num !== 0 ? 
                                        <div className="h-fit w-fit text-sm rounded-lg text-white px-2 py-0.5" style={{ backgroundColor: matchStat?.ratingProps?.bgcolor}}>{matchStat?.ratingProps.num}</div>
                                    : 
                                        <div className="h-fit w-fit text-sm rounded-lg px-3.5 py-0.5">-</div>
                                    }
                                </div>
                            </div>
                            <div className="text-center flex flex-col md:hidden gap-y-3">
                                <div className="flex justify-between gap-8">
                                    <div className="text-base truncate text-[#6d6a7f]">{currentDate.toDateString() === matchDate.toDateString() ? 'Today' : yesterday.toDateString() === matchDate.toDateString() ? 'Yesterday' : formattedDate}</div>
                                    <div className="flex gap-3 items-center">
                                        <div className="text-base text-nowrap truncate">{matchStat?.leagueName}</div>
                                        <img alt="leagueIcon" className="h-4" src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${matchStat?.leagueId}.png`} ></img>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-5 items-center">
                                        <img alt="opponentTeamIcon" className="h-6" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${matchStat?.opponentTeamId}.png`} ></img>
                                        <div className="flex flex-col">
                                            <div className="text-base truncate">{matchStat?.opponentTeamName}</div>
                                            <div className="flex gap-1 text-nowrap text-[#6d6a7f]">
                                                <div className={`text-base ${matchStat?.isHomeTeam && "font-bold"}`}>{matchStat?.homeScore} -</div>
                                                <div className={`text-base ${!matchStat?.isHomeTeam && "font-bold"}`}> {matchStat?.awayScore}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className="flex relative me-2">
                                            {Array.from({ length: matchStat?.goals }, (_, index) => (
                                                <div className="-me-2 h-5 w-5 rounded-full bg-white brd05 flex items-center justify-center">
                                                    <img key={index} alt="icon" className="h-3" src="https://i.ibb.co/9tyd46p/SVG-to.png"></img>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="h-fit w-fit text-sm rounded-lg px-2 py-0.5 bg-white brd05">{matchStat?.minutesPlayed}'</div>
                                        <div className="h-fit w-fit text-sm rounded-lg text-white px-2 py-0.5" style={{ backgroundColor: matchStat?.ratingProps?.bgcolor}}>{matchStat?.ratingProps.num}</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
            </div>
        </div>
    )
}

export default PlayerMatchStats
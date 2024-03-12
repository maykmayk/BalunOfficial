import { Link } from "react-router-dom"

function TeamForm(props) {
    const teamsForm = props.matchData?.content?.matchFacts?.teamForm
    console.log(teamsForm)
    
    const handleError = (event) => {
        event.target.src = "https://www.fotmob.com/_next/static/media/team_fallback.3ae01170.png";
    };

    return (
        <div className="w-full rounded-lg bg-white brd py-4">
            <div className="text-lg font-medium text-center mb-6">Teams Form</div>
            <div className="flex justify-between">
                {teamsForm?.map((matches, teamIndex) => (
                    <>
                    <div key={teamIndex} className="flex flex-1 justify-center flex-col gap-3 items-center">
                        {matches?.map((match, matchIndex) => {
                            const matchNumbers = match.linkToMatch.match(/#(\d+)$/);
                            const numeriFinali = matchNumbers ? matchNumbers[1] : null;

                            return (
                                <div className="w-full px-4">
                                    <Link to={"/match-details/" + numeriFinali} key={matchIndex}>
                                        <div className="flex gap-4 justify-center w-full gap-5">
                                            <div className="flex gap-3 items-center">
                                                {/* <div className="text-sm hidden md:block flex-nowrap truncate">{match?.home?.name}</div> */}
                                                <img className="h-7 w-7 object-contain" onError={handleError} src={`https://images.fotmob.com/image_resources/logo/teamlogo/${match?.home.id}.png`} alt="team1Logo" />
                                            </div>
                                            <div className={`flex w-14 text-center text-sm px-3 items-center justify-center rounded-full text-white text-nowrap ${match?.result === -1 ? "bg-red-600" : match?.result === 0 ? "bg-gray-600" : "bg-green-600"}`}>{match?.score}</div>
                                            <div className="flex gap-3 items-center">
                                                <img className="h-7 w-7 object-contain" onError={handleError} src={`https://images.fotmob.com/image_resources/logo/teamlogo/${match?.away.id}.png`} alt="team1Logo" />
                                                {/* <div className="text-sm hidden md:block flex-nowrap truncate">{match?.away?.name}</div> */}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    {teamIndex !== teamsForm.length - 1 && <div className="brd05"></div>}
                    </>
                ))}
            </div>
        </div>
    )
} 

export default TeamForm
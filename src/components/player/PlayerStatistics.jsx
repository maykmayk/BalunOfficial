import { Link } from "react-router-dom"

function PlayerStatistics(props) {
    const playerStat = props.data
    console.log(playerStat)

    return(
        <div className="flex flex-col bg-white brd rounded-lg py-4 gap-3">
            <Link to={"/league/" + (playerStat?.leagueId)}>
                <div className="flex gap-3 items-center px-4">
                    <img alt="leagueIcon" className="h-6" src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${playerStat?.leagueId}.png`}></img>
                    <div className="text-lg">{playerStat?.leagueName}</div>
                </div>
            </Link>
            <div className="brd05"></div>
            <div className="flex flex-wrap gap-y-4">
                {playerStat?.stats?.map((stat, index) => (
                    <div key={index} className="flex flex-col text-center md:basis-3/12 basis-4/12 justify-center ">
                        {stat?.title === "Rating" ? 
                            <div className={`w-fit mx-auto text-base font-medium leading-base px-2 py-2 leading-3 ${stat?.value > 7 ? "text-white py-1 rounded-lg bg-green-500" : "text-white py-2 rounded-lg bg-orange-500"}`}>{stat?.value}</div>
                        : stat?.title === "Red cards" ?
                            <div className="w-fit mx-auto text-base flex gap-2 items-center">
                                <div className="w-3 h-4 rounded-sm bg-red-400" />
                                <div className="text-lg font-medium leading-base ">{stat?.value}</div>
                            </div> 
                        : stat?.title === "Yellow cards" ?
                            <div className="w-fit mx-auto text-base flex gap-2 items-center">
                                <div className="w-3 h-4 rounded-sm bg-yellow-400" />
                                <div className="text-lg font-medium leading-base ">{stat?.value}</div>
                            </div> 
                        :
                            <div className="text-lg font-medium leading-base ">{stat?.value}</div>
                        }
                        <div className="text-base text-[#6d6a7f] leading-base">{stat?.title}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlayerStatistics
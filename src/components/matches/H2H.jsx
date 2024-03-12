import { Link } from "react-router-dom"
import MatchLine from "./MatchLine"

function H2H(props) {
    const matchData = props.matchData
    const homeTextColor = matchData?.content?.stats?.Periods?.All?.teamColors?.fontDarkMode?.home || matchData?.general?.teamColors?.fontDarkMode?.home
    const homeBgColor = matchData?.content?.stats?.Periods?.All?.teamColors?.darkMode?.home || matchData?.general?.teamColors?.darkMode?.home
    const awayTextColor = matchData?.content?.stats?.Periods?.All?.teamColors?.fontDarkMode?.away || matchData?.general?.teamColors?.fontDarkMode?.away
    const awayBgColor = matchData?.content?.stats?.Periods?.All?.teamColors?.darkMode?.away || matchData?.general?.teamColors?.darkMode?.away


    return (
        <div className="rounded-lg w-full bg-white brd flex flex-col gap-5 p-4">
            <div className="text-lg font-medium text-center">Head To Head</div>
            <div className="h-full flex flex-col gap-6 justify-between">
                <div className="flex gap-8 items-top justify-center">
                    <img className="h-8 object-contain mt-2" alt="teamLogo" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${matchData?.header?.teams[0]?.id}.png`}></img>
                    <div className="flex flex-col gap-3 justify-center text-center items-center">
                        <div style={{ color: homeTextColor, backgroundColor: homeBgColor}} className="text-lg text-bold rounded-full text-center h-10 w-10 flex items-center justify-center md:py-1 md:px-10">
                            {matchData?.content?.h2h?.summary?.[0]}
                        </div>
                        <div className="text-lg text-medium">
                            Wins
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 justify-center text-center items-center">
                        <div className="brd text-lg text-bold rounded-full text-center h-10 w-10 flex items-center justify-center md:py-1 md:px-10">
                            {matchData?.content?.h2h?.summary?.[1]}
                        </div>
                        <div className="text-lg text-medium">
                            Draws
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 justify-center text-center items-center">
                        <div style={{ color: awayTextColor, backgroundColor: awayBgColor}} className="text-lg text-bold rounded-full text-center h-10 w-10 flex items-center justify-center md:py-1 md:px-10">
                            {matchData?.content?.h2h?.summary?.[2]}
                        </div>
                        <div className="text-lg text-medium">
                            Wins
                        </div>
                    </div>
                    <img className="h-8 object-contain mt-2" alt="teamLogo" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${matchData?.header?.teams[1]?.id}.png`}></img>
                </div>
                <div className="flex flex-col gap-3">
                    {matchData?.content?.h2h?.matches?.slice(0, 6).map((match, index) => {
                        return (
                            <>
                                <MatchLine matchData={match} h2h={true}/>
                                {index < matchData?.content?.h2h?.matches.length - 1 && <div className="brd05"></div>}
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default H2H
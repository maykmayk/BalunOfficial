import { Link } from "react-router-dom";
import MatchLine from "./MatchLine";

function MatchesCont(props) {
    return (
        <>
            <div className="flex flex-col rounded-lg bg-white brd">
                <div className="flex flex-col gap-3 px-4 py-2 highGray brd rounded-t-lg hover:bg-gray-200">
                    <div className="flex  items-center justify-between">
                        <Link to={"/league/" + (props.leagueId || "")}>
                            <div className="flex gap-3 items-center flex-nowrap">
                                <img className="h-4 object-contain" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${(props?.leagueCountry || "").toLowerCase()}.png`} alt="matchCountryLogo"/>
                                <div className="text-sm leading-normal">{props.leagueTitle}</div> 
                            </div>
                        </Link>
                        <img className="h-6 w-6 object-contain" src={props.leagueIcon} alt="leagueIcon" />
                    </div>
                </div>
                <div className=" p-4 flex flex-col gap-3 md:gap-6">
                    {props.matchData?.map((match, index) => (
                        <div className="flex flex-col gap-3" key={index}>
                            <MatchLine matchData={match}/>
                            {index < props.matchData.length - 1 && <div className="brd05"></div>}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default MatchesCont;

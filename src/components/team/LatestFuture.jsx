import { Link } from "react-router-dom"
import MatchCard from "../matches/MatchCard"

function LatestFuture(props) {
    const fixData = props.fixtureData 
    console.log(fixData)

    return (
        <div className="flex flex-col gap-3 rounded-lg p-4 bg-white brd">
            <div className="text-base font-medium leading-5">Latest Matches</div>
            <div className="flex flex-col md:flex-row gap-3">
                <div className="flex flex-col gap-3 basis-6/12">
                    <MatchCard matchData={fixData?.lastMatch}/>
                </div>
                <div className="flex flex-col gap-3 basis-6/12">
                    <MatchCard matchData={fixData?.nextMatch}/>
                </div>
            </div>
        </div>
    )
}

export default LatestFuture
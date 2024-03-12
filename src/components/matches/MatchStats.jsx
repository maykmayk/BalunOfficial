import MatchLine from "./MatchLine"
import MatchLineUp from "./MatchLineUp"

function MatchStats(props) {
    const matchData = props.matchData

    const homeTextColor = matchData?.content?.stats?.Periods?.All?.teamColors?.fontLightMode?.home || matchData?.general?.teamColors?.fontLightMode?.home
    const homeBgColor = matchData?.content?.stats?.Periods?.All?.teamColors?.lightMode?.home || matchData?.general?.teamColors?.lightMode?.home
    const awayTextColor = matchData?.content?.stats?.Periods?.All?.teamColors?.fontLightMode?.away || matchData?.general?.teamColors?.fontLightMode?.away
    const awayBgColor = matchData?.content?.stats?.Periods?.All?.teamColors?.lightMode?.away || matchData?.general?.teamColors?.lightMode?.away

    return (
        <>
            <div className="flex md:flex-row gap-4 rounded-lg w-full bg-white brd">
            <div className="flex-1 flex flex-col gap-5 p-4">
                <div className="text-lg font-medium text-center">Top Stats</div>
                <div className="flex flex-col gap-2">
                    <div className="text-base text-center">{matchData?.content?.stats?.Periods?.All?.stats?.[0]?.stats?.[0]?.title}</div>
                    <div className="w-full h-10 rounded-full flex gap-2">
                        <div className="font-medium flex items-center justify-start ps-2 rounded-s-full" style={{ color: homeTextColor, backgroundColor: homeBgColor, width: `${matchData?.content?.stats?.Periods?.All?.stats?.[0]?.stats?.[0]?.stats?.[0]}%` }}>
                            {matchData?.content?.stats?.Periods?.All?.stats?.[0]?.stats?.[0]?.stats?.[0]}%
                        </div>
                        <div className="font-medium flex items-center justify-end pe-2 rounded-e-full" style={{ color: awayTextColor, backgroundColor: awayBgColor, width: `${matchData?.content?.stats?.Periods?.All?.stats?.[0]?.stats?.[0]?.stats?.[1]}%` }}>
                            {matchData?.content?.stats?.Periods?.All?.stats?.[0]?.stats?.[0]?.stats?.[1]}%
                        </div>
                    </div>
                </div>
                {matchData?.content?.stats?.Periods?.All?.stats?.[0]?.stats?.map((stat, index) => (
                    <div key={index + 1} className="flex justify-between items-center">
                        <div style={{ color: stat.stats?.[0] > stat.stats?.[1] ? homeTextColor : "", backgroundColor: stat.stats?.[0] > stat.stats?.[1] ? homeBgColor : "" }} className="text-base rounded-full text-center py-1 px-3">
                            {stat.stats?.[0]}
                        </div>
                        <div className="text-base text-center">
                            {stat.title}
                        </div>
                        <div style={{ color: stat.stats?.[1] > stat.stats?.[0] ? awayTextColor : "", backgroundColor: stat.stats?.[1] > stat.stats?.[0] ? awayBgColor : "" }} className="text-base rounded-full text-center py-1 px-3">
                            {stat.stats?.[1]}
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </>
    );    
}

export default MatchStats
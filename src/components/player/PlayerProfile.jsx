import { Link } from "react-router-dom"
import PlayerMatchStats from "./PlayerMatchStats"
import PlayerPosition from "./PlayerPosition"
import PlayerPrimaryStats from "./PlayerPrimaryStats"
import PlayerStatistics from "./PlayerStatistics"

function PlayerProfile(props) {
    const playerData = props.playerData
    console.log(playerData)
    const handleError = (event) => {
        console.error(`Errore nel caricamento dell'immagine: ${props.image}`);
        event.target.src = "https://i.ibb.co/q9SWXK2/player-placeholder.png";
    };

    return (
        <>
            <div className="min-w-full pt-4 rounded-lg bg-white brd flex flex-col  overflow-hidden">
                <div className="flex flex-col">
                    <div className="flex items-end justify-between px-4 ">
                        <div className="flex gap-5">
                            <img className="h-20 md:h-24" alt="teamIco" onError={handleError} src={`https://images.fotmob.com/image_resources/playerimages/${playerData?.id}.png`}></img>
                            <div className="flex flex-col justify-end pb-4 gap-4">
                                <div className="text-2xl font-medium leading-3">{playerData.name}</div>
                                <div className="flex gap-3 justify-start items-center">
                                    {playerData?.playerInformation?.[4]?.countryCode &&
                                    <img className="h-6 object-contain" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${(playerData?.playerInformation?.[4]?.countryCode || playerData?.playerInformation?.[3]?.countryCode || "").toLowerCase()}.png`} alt="playerCountryLogo"/>
                                    }
                                    <Link to={"/team/" + (playerData?.primaryTeam?.teamId)}>
                                        <div className="flex gap-3 items-center">
                                            {playerData?.primaryTeam?.teamId && <img className="h-6 object-contain" onError={handleError} src={`https://images.fotmob.com/image_resources/logo/teamlogo/${playerData?.primaryTeam?.teamId}.png` || ""} alt="playerTeamLogo" />} 
                                            <div className="text-sm text-[#6d6a7f] leading-snug">{playerData.primaryTeam?.teamName}</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="brd05"></div>
                    {playerData.injuryInformation && 
                    <>
                        <div className="flex gap-3 py-2 items-center px-4 ">
                            <svg width="30" height="30" viewBox="0 0 16 16" version="1.1"><g id="Page-1"><g id="icInjury"><path d="M8,0 C8.5252876,0 9.0455284,0.051239245 9.5607224,0.153717741 C10.0759163,0.25619623 10.5761642,0.40794486 11.0614672,0.60896367 C11.5467691,0.80998248 12.0078001,1.05640888 12.444561,1.348243 C12.8813219,1.64007711 13.2854195,1.9717112 13.6568537,2.3431456 C14.0282879,2.7145798 14.3599215,3.1186771 14.6517553,3.5554376 C14.9435892,3.9921982 15.1900158,4.4532294 15.3910341,4.9385319 C15.5920525,5.4238343 15.7438021,5.9240828 15.8462811,6.4392772 C15.9487591,6.9544711 16,7.4747119 16,8 C16,8.5252876 15.9487591,9.0455284 15.8462801,9.5607224 C15.7438011,10.0759163 15.5920525,10.5761642 15.3910341,11.0614672 C15.1900158,11.5467691 14.9435892,12.0078001 14.6517553,12.444561 C14.3599215,12.8813219 14.0282879,13.2854195 13.6568537,13.6568537 C13.2854195,14.0282879 12.8813219,14.3599215 12.444561,14.6517553 C12.0078001,14.9435892 11.5467691,15.1900158 11.0614672,15.3910341 C10.5761642,15.5920525 10.0759163,15.7438021 9.5607224,15.8462811 C9.0455284,15.9487591 8.5252876,16 8,16 C7.4747119,16 6.9544711,15.9487591 6.4392767,15.8462801 C5.9240823,15.7438011 5.4238343,15.5920525 4.9385319,15.3910341 C4.4532294,15.1900158 3.9921982,14.9435892 3.5554376,14.6517553 C3.1186771,14.3599215 2.7145798,14.0282879 2.3431456,13.6568537 C1.9717112,13.2854195 1.64007699,12.8813219 1.34824288,12.444561 C1.05640888,12.0078001 0.80998248,11.5467691 0.60896367,11.0614672 C0.40794486,10.5761642 0.25619623,10.0759163 0.153717741,9.5607224 C0.051239245,9.0455284 0,8.5252876 0,8 C0,7.4747119 0.051239245,6.9544711 0.153717741,6.4392767 C0.25619623,5.9240823 0.40794486,5.4238343 0.60896367,4.9385319 C0.80998248,4.4532294 1.05640888,3.9921982 1.348243,3.5554376 C1.64007711,3.1186771 1.9717112,2.7145798 2.3431456,2.3431456 C2.7145798,1.9717112 3.1186771,1.64007699 3.5554376,1.34824288 C3.9921982,1.05640888 4.4532294,0.80998248 4.9385319,0.60896367 C5.4238343,0.40794486 5.9240828,0.25619623 6.4392772,0.153717741 C6.9544711,0.051239245 7.4747119,0 8,0 Z" id="Fill-1" fill="#fff"></path><path d="M7.4892709,12.095417 C6.8259709,12.095417 6.289571,11.5581174 6.289571,10.8957176 L6.289571,9.60691742 L4.80007094,9.60691742 C4.24837092,9.60691742 3.8001709,9.15871712 3.8001709,8.60701752 L3.8001709,7.28851722 C3.8001709,6.73591732 4.24837092,6.28771732 4.80007094,6.28771732 L6.289571,6.28771732 L6.289571,4.99891722 C6.289571,4.33651721 6.8259709,3.79921722 7.4892709,3.79921722 L8.4072709,3.79921722 C9.0705709,3.79921722 9.6078711,4.33651721 9.6078711,4.99891722 L9.6078711,6.28771732 L11.0964713,6.28771732 C11.6490712,6.28771732 12.0963707,6.73591732 12.0963707,7.28851722 L12.0963707,8.60701752 C12.0963707,9.15871712 11.6490712,9.60691742 11.0964713,9.60691742 L9.6078711,9.60691742 L9.6078711,10.8957176 C9.6078711,11.5581174 9.0705709,12.095417 8.4072709,12.095417 L7.4892709,12.095417 Z" id="Fill-2" fill="#FF3030"></path></g></g></svg>
                            <div className="text-sm">{playerData?.injuryInformation?.name} | <span className="text-[#6d6a7f]">{playerData?.injuryInformation?.expectedReturn?.expectedReturnFallback}</span></div>
                        </div>
                        <div className="brd05"></div>
                    </>
                    }
                </div>
                
                <div className="flex flex-col md:flex-row gap-3 items-top">
                    <div className="flex basis-12/12 md:basis-1/2 gap-4 py-3 px-4">
                        <PlayerPrimaryStats data={playerData} />
                    </div>
                    <div className="brd05"></div>
                    <div className="flex flex-col basis-12/12 md:basis-1/2 gap-3 py-3  px-4">
                        <PlayerPosition data={playerData?.positionDescription} />
                    </div>
                </div>
            </div>
            <PlayerStatistics data={playerData?.mainLeague}/>
            <PlayerMatchStats data={playerData?.recentMatches}/>
        </>
    )
}

export default PlayerProfile
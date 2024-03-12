import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function LeagueTransfers(props) {
    const [selectedTab, setSelectedTab] = useState("Players in");
    const handleClick = (tab) => {
        setSelectedTab(tab);
    };

    console.log(selectedTab, props?.data?.data?.["Players in"])

    const data = props?.data?.data?.[selectedTab] || props?.data?.data;
    console.log(data)
    const handleError = (event) => {
        event.target.src = "https://www.fotmob.com/_next/static/media/team_fallback.3ae01170.png";
    };
    const handleError2 = (event) => {
        event.target.src = "https://i.ibb.co/q9SWXK2/player-placeholder.png";
    };

    const transfersToRender = !props?.full ? data?.slice(0, 3) : data;
    function capitalizeEachWord(str) {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }


    return(
        <div className="py-4 brd bg-white rounded-lg w-full">
            {!props.full &&
            <div className="flex flex-col gap-3">
                <div className="text-lg font-medium px-4">Transfers</div>
                <div className="brd05"></div>
            </div>
            }
            {props.team && (
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3 w-full px-4 flex-wrap">
                        <div className={`tab text-nowrap rounded-full px-4 cursor-pointer text-sm py-1 ${selectedTab === "Players in" ? "text-white bg-black" : "border border-gray-200 bg-white text-black"}`} onClick={() => handleClick("Players in")} >Players in</div>
                        <div className={`tab text-nowrap rounded-full px-4 cursor-pointer text-sm py-1 ${selectedTab === "Players out" ? "text-white bg-black" : "border border-gray-200 bg-white text-black"}`} onClick={() => handleClick("Players out")} >Players out</div>
                        <div className={`tab text-nowrap rounded-full px-4 cursor-pointer text-sm py-1 ${selectedTab === "Contract extension" ? "text-white bg-black" : "border border-gray-200 bg-white text-black"}`} onClick={() => handleClick("Contract extension")} >Contract extension</div>
                    </div>
                    <div className="brd05"></div>
                </div>
            )}
            <div className="px-4">
                {transfersToRender?.map((transfer, index) => (
                    <div className="flex flex-col gap-3" key={index}>
                        <Link to={"/player/" + (transfer?.playerId)}>
                            <div className="w-full py-3 flex flex-col justify-center items-center gap-1 md:gap-3 relative">
                                <div className="absolute top-0 end-0 pt-4 text-xs text-[#6d6a7f]">
                                    {transfer && transfer.transferDate && (
                                        <span>
                                            {(() => {
                                                const transfDate = new Date(transfer.transferDate);
                                                const optTra = { month: "short", day: "numeric" };
                                                const transfDateFinal = transfDate.toLocaleDateString("en-US", optTra);
                                                return transfDateFinal;
                                            })()}
                                        </span>
                                    )}
                                </div>
                                <div className="h-10 w-10 md:h-14 md:w-14 rounded-full relative bg-gray-100 flex items-end justify-center">
                                    <div className="overflow-hidden h-8 w-8 md:h-12 md:w-12 rounded-full ">
                                        <img className="h-full" alt="playerPhoto" onError={handleError2} src={`https://images.fotmob.com/image_resources/playerimages/${transfer?.playerId}.png`} />
                                    </div>
                                    {transfer?.position?.label &&
                                        <div key={index} className="hidden md:flex px-2 py-0.5 bg-gray-200 brd absolute -bottom-3 -end-3 rounded-full">
                                            <div className="text-xs">{transfer?.position?.label}</div>
                                        </div>
                                    }
                                </div>
                                <div className="flex gap-3"></div>
                                <div className="text-ls font-medium">{transfer?.name}</div>
                                <div className="flex flex-col gap-1 items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="flex gap-3 items-center">
                                            <div className="text-xs">{transfer?.fromClub}</div>
                                            <img alt="teamIcon" className="h-5" onError={handleError} src={`https://images.fotmob.com/image_resources/logo/teamlogo/${transfer?.fromClubId}.png`}></img>
                                        </div>
                                        <div className="h-4 w-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path fill="none" d="M0 0h18v18H0z"></path><path data-name="Path 4273" d="M17.745-67.742a9.054 9.054 0 0 1-9-9 9.064 9.064 0 0 1 9.013-9 9.047 9.047 0 0 1 8.987 9 9.053 9.053 0 0 1-9 9zm5.02-9a.906.906 0 0 0-.313-.7l-3.3-3.245a.835.835 0 0 0-.592-.235.782.782 0 0 0-.8.8.813.813 0 0 0 .261.583l1.166 1.131 1.1.879-2-.087h-4.736a.825.825 0 0 0-.844.87.83.83 0 0 0 .844.87h4.733l2-.1-1.087.887-1.174 1.122a.785.785 0 0 0-.261.592.782.782 0 0 0 .8.8.874.874 0 0 0 .592-.235l3.3-3.245a.91.91 0 0 0 .31-.692z" transform="translate(-8.74 85.742)" className="fill-green-500"></path></svg>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <img alt="teamIcon" className="h-5" onError={handleError} src={`https://images.fotmob.com/image_resources/logo/teamlogo/${transfer?.toClubId}.png`}></img>
                                            <div className="text-xs">{transfer?.toClub}</div>
                                        </div>
                                    </div>
                                    {transfer?.transferType?.text &&
                                        <div className="flex gap-2 text-xs items-center text-[#6d6a7f]">
                                            <div className="font-medium">{capitalizeEachWord(transfer?.transferType?.text)}</div>
                                            {!transfer?.onLoan && (
                                                <div className="">
                                                    {(() => {
                                                        const inputDate = new Date(transfer?.toDate);
                                                        const options = { year:"numeric", month: "short", day: "numeric" };
                                                        const formattedDate = inputDate.toLocaleDateString("en-US", options);
                                                        const fromDate = new Date(transfer?.fromDate);
                                                        const options2 = { year:"numeric", month: "short", day: "numeric" };
                                                        const formattedDate2 = fromDate.toLocaleDateString("en-US", options2);
                                                        return <div className="flex gap-1">
                                                            <div className="">{formattedDate2} -</div>
                                                            <div className="">{formattedDate}</div>
                                                        </div>
                                                        ;
                                                    })()}
                                                </div>
                                            )}
                                        </div>
                                    }
                                    {transfer?.marketValue &&
                                        <div className="flex gap-2 text-xs items-center text-[#6d6a7f]">
                                            <div className="font-medium">Market value</div>
                                            <div className="">{transfer?.marketValue}</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </Link>
                        <div className="brd05"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LeagueTransfers
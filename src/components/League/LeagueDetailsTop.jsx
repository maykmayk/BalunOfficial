import { useState } from "react";
import Standings from "../standings/Standing"
import Statistics from "../team/Statistics";
import LeagueMatches from "./LeagueMatches"
import LeagueTransfers from "./LeagueTransfers";

function LeagueDetailsTop(props) {    
    const leagueData = props?.data;
    const initialTab = leagueData?.tabs?.[0] || "overview";
    const [activeTab, setActiveTab] = useState(initialTab); 

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    console.log(leagueData)
    return(
        <div className="flex flex-col gap-3">
            <div className="flex flex-col px-4 pt-4 bg-white brd rounded-lg gap-8 md:gap-12">
                <div className="flex gap-4 items-center">
                    <img className="h-8 md:h-14" alt="leagueIcon" src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${props?.leagueId}.png`}></img>
                    <div className="flex flex-col md:gap-0 gap-2">
                        <div className="text-xl md:text-2xl font-medium leading-4">{leagueData?.details?.name}</div>
                        <div className="text-sm md:text-lg text-[#6d6a7f] leading-3">{leagueData?.details?.country}</div>
                    </div>
                </div>
                <ul className="flex text-sm md:text-lg font-medium text-center" id="default-tab" role="tablist">
                    {leagueData?.tabs?.slice(0, window.innerWidth <= 768 ? 6 : undefined).map((tab, index) => (
                        <li key={index} className={`relative cursor-pointer`} role="presentation">
                            <div
                                className={` ${tab === activeTab ? "text-black activeTab" : ""} px-2 md:px-4 pb-4 hover:opacity-50 text-xs text-[#6d6a7f] ${tab === activeTab ? "active-tab" : ""}`}
                                onClick={() => handleTabClick(tab)}
                                role="tab"
                                aria-controls={tab}
                                aria-selected={tab === activeTab ? "true" : "false"}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div id="default-tab-content">
                {leagueData?.tabs?.map((tab, index) => (
                    <div key={index} className={`${tab === activeTab ? "" : "hidden"}`} id={tab} role="tabpanel" aria-labelledby={`${tab.toLowerCase()}-tab`}>
                    {tab === "overview" && 
                        <div className="flex flex-col gap-3">
                            <LeagueMatches data={leagueData}/>
                            <div className="flex flex-col lg:flex-row gap-3 items-start">
                                <div className={`flex w-full ${leagueData?.transfers && "basis-7/12"}`}>
                                    <Standings id={props.leagueId} full={window.innerWidth > 768 || leagueData?.table?.[0]?.data?.composite}/>
                                </div>
                                {leagueData?.transfers &&
                                    <div className="flex w-full basis-5/12">
                                        <LeagueTransfers full={false} data={leagueData?.transfers}/>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    {tab === "table" &&
                        <Standings id={props.leagueId} full={true}/>
                    } 
                    {tab === "matches" &&
                        <LeagueMatches data={leagueData}/>
                    }
                    {tab === "transfers" &&
                        <LeagueTransfers full={true} data={leagueData.transfers}/> 
                    }
                    {tab === "stats" &&
                        <Statistics data={leagueData?.stats?.players}/>
                    }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LeagueDetailsTop
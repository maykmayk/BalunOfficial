import ProvaApi from "../../api/ProvaApi";
import TransferCard from "../transfer/TransferCard";
import SidebarElement from "./SidebarElements";
import React, { useEffect, useState } from "react";

function SideBar() {
	const apiProva = new ProvaApi();
    const [transferData, setTransferData] = useState([]);
  
    useEffect(() => {
        const fetchTransfer = async () => {
            try {
                const responseTransferData = await apiProva.makeRequest(`api/transfers?showTop=true&page=1`);
                setTransferData(responseTransferData.data.transfers);
                console.log(responseTransferData.data.transfers);
				// console.log(transferData)       
            } catch (error) {
                console.log(error);
            }
        };

        fetchTransfer(); 

    }, []);
	
    return (
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
			<div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 flex flex-col min-h-screen justify-between">
                <ul className="space-y-2 font-medium">
					<SidebarElement link="/matches/" name="Matches" icon="https://i.ibb.co/9tyd46p/SVG-to.png" />
					<SidebarElement link="/" name="Leagues" icon="https://i.ibb.co/09rTv67/SVG-to-PNG-Converter.png" />
					<SidebarElement link="#" name="Transfers" icon="https://i.ibb.co/3zBPMxc/SVG-to-1.png" />
				</ul>
				<div className="flex flex-col gap-2">
					<div className="text-sm text-[#6d6a7f]">Latest Transfers</div>
					{transferData?.slice(0, 3).map((player, index) => (
						<TransferCard playerData={player} key={index}/>
					))}
				</div>
			</div>
		</aside>
    )
}

export default SideBar
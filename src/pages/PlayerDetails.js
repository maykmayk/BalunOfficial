import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react";
import ProvaApi from "../api/ProvaApi";
import PlayerProfile from "../components/player/PlayerProfile";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Layout/Footer";

const PlayerDetail = (props) => {
    const {id} = useParams();
    const apiProva = new ProvaApi();
    const [playerData, setPlayerData] = useState([]);
  
    useEffect(() => {
        const fetchplayer = async () => {
            try {
                const responseplayerData = await apiProva.makeRequest(`api/playerData?id=${id}`);
                setPlayerData(responseplayerData.data);  
                console.log(playerData.data)     
            } catch (error) {
                console.log(error);
            }
        };

        fetchplayer(); 

    }, [id]);
  
	return (
		<>
            <Layout />
			<div className="text-black flex flex-col p-4 gap-5">
                {playerData ? 
                <PlayerProfile playerData={playerData}/>
                :
                <div className="text-xl text-center">Player info not found</div>
                }
            </div>	
            <Footer />
		</>
	);
};

export default PlayerDetail;




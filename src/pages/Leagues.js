import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProvaApi from "../api/ProvaApi";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import LeagueDetailsTop from "../components/League/LeagueDetailsTop";

const Leagues = () => {
	const {id} = useParams();
    const apiProva = new ProvaApi();
    const [leagueData, setLeagueData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
        const fetchLeague = async () => {
            try {
                const responseLeagueData = await apiProva.makeRequest(`api/leagues?id=${id}&ccode3=ITA`);
                setLeagueData(responseLeagueData.data);
                setIsLoading(false); 
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        fetchLeague(); 

    }, [id]);

	return (
		<>
			<Layout />
			<div className="text-black flex flex-col p-4 gap-3">
                {isLoading ? (
                    <div className="flex flex-col gap-3">
                        <div role="status" className="animate-pulse md:flex md:items-center h-36 bg-gray-200 rounded-lg w-full"></div>
                        <div role="status" className="animate-pulse md:flex md:items-center h-48 bg-gray-200 rounded-lg w-full"></div>
                        <div role="status" className="animate-pulse md:flex md:items-center h-36 bg-gray-200 rounded-lg w-full"></div>
                    </div>
                ) : (
                    <LeagueDetailsTop data={leagueData} leagueId={id}/>
                )}
			</div>
            <Footer />
		</>
	);
};

export default Leagues;

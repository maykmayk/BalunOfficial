import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProvaApi from "../api/ProvaApi";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

const LeagueList = () => {
    const apiProva = new ProvaApi();
    const [leagueListData, setleagueListData] = useState([]);
  
    useEffect(() => {
        const fetchLeagueList = async () => {
            try {
                const responseLeagueListData = await apiProva.makeRequest("api/allLeagues", false);
                setleagueListData(responseLeagueListData.data);  
            } catch (error) {
                console.log(error);
            }
        };

        fetchLeagueList(); 

    }, []);

    console.log(leagueListData)

	return (
		<>
			<Layout />
			<div className="text-black flex flex-col p-4 gap-3">
				<div className="flex flex-col md:flex-row gap-3 w-100">	
					<div className="w-100 flex flex-col bg-white brd rounded-lg py-4">
                        <div className="px-4 text-lg font-medium leading-5 mb-4">Top Leagues</div>
                        <div className="brd05"></div>
                        {leagueListData?.popular?.map((league, index) => (
                            <Link to={"/league/" + (league.id)} key={index}>
                                <div className="flex gap-5 p-4 items-center rounded-lg hover:bg-gray-100">
                                    <img className="h-6" alt="leagueIcon" src={`https://images.fotmob.com/image_resources/logo/leaguelogo/${league?.id}.png`}></img>
                                    <div className="textl-sm">{league?.name}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
				</div>
			</div>
            <Footer />
		</>
	);
};

export default LeagueList;

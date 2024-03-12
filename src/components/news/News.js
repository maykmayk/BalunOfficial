import React, { useEffect, useState } from "react";
import ProvaApi from "../../api/ProvaApi";
import NewsBlock from "./NewsBlock";

function News(props) {
    const apiProva = new ProvaApi();
    const [newsData, setNewsData] = useState([]);
  
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const responsenewsData = await apiProva.makeRequest(`api/tlnews?id=${props.teamId}&type=team&language=en`);
                setNewsData(responsenewsData?.data?.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchNews(); 

    }, []);

    return (
        <div className="flex gap-3 overflow-x-auto">
            {newsData?.slice(0, 10).map((news, index) => (
                <NewsBlock colorTeam={props.colorTeam} newsData={news} key={index}/>
			))}
        </div>    
    )
}

export default News
import { Link } from "react-router-dom"

function Statistics(props) {
    const data = props.data;
    console.log(data);
    const handleError = (event) => {
        event.target.src = "https://i.ibb.co/q9SWXK2/player-placeholder.png";
    };

    return (
        <div className="grid md:grid-cols-3 gap-5">
            {data?.map((stat, index) => (
                <div key={index} className="flex py-4 gap-3 rounded-lg bg-white brd flex-col w-full">
                    <div className="text-lg font-medium px-4">{stat.header}</div>
                    <div className="brd05"></div>
                    <div className="flex flex-col gap-3 px-4">
                        {stat?.topThree?.map((pl, index2) => (
                            <div className="flex flex-col gap-3">
                                <Link to={"/player/" + (pl?.id)} key={index2}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="overflow-hidden h-8 w-8 rounded-full brd05 bg-gray-100">
                                                <img className="h-full" alt="playerPhoto" onError={handleError} src={`https://images.fotmob.com/image_resources/playerimages/${pl?.id}.png`} />
                                            </div>
                                            <div className="text-base">{pl?.name}</div>
                                        </div>
                                        <div className="text-base  px-2 py-0.5 leading-5 flex items-center justify-center rounded-full"style={{ backgroundColor: `${index2 === 0 && pl?.teamColors?.lightMode}`, color:  `${index2 === 0 && "#fff"}`}}>
                                        {pl?.value !== undefined ? 
                                            (Number(pl?.value) % 1 === 0 ? Number(pl?.value).toFixed() : pl?.value) : 
                                        ""}
                                        </div>
                                    </div>
                                </Link>
                            {index2 < stat?.topThree?.length-1 && <div className="brd05"></div>}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Statistics;

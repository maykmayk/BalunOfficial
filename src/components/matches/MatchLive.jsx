import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProvaApi from "../../api/ProvaApi";

// https://www.fotmob.com/api/ltc?ltcUrl=data.fotmob.com%2Fwebcl%2Fltc%2Fgsm%2F4230739_en_gen.json.gz&teams=%5B%22Roma%22%2C%22Hellas+Verona%22%5D
// https://www.fotmob.com/api/ltc?ltcUrl=data.fotmob.com%2Fwebcl%2Fltc%2Fgsm%2F4230739_en.json.gz&teams=%5B%22Roma%22%2C%22Hellas%20Verona%22%5D&_=1705829983009

function MatchLive(props) {
    const data = props.data?.content?.liveticker?.teams;
    const database = props.data
    console.log(database)
    const apiProva = new ProvaApi();
    const [liveData, setLiveData] = useState([]);

    useEffect(() => {
        const fetchLive = async () => {
        try {
            const timestamp = new Date().getTime();
            const responseLiveData = await apiProva.makeRequest(`api/ltc?ltcUrl=data.fotmob.com%2Fwebcl%2Fltc%2Fgsm%2F${database?.general?.matchId}_${props.lang}.json.gz&teams=%5B%22${data?.[0]}%22%2C%22${data?.[1]}%22%5D&_=${timestamp}`);
            setLiveData(responseLiveData.data);
        } catch (error) {
            console.log(error);
        }
    };

    fetchLive(); 
    const intervalId = setInterval(() => {
      fetchLive();
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
    }, [props]);

    const handleError = (event) => {
        event.target.src = "https://i.ibb.co/q9SWXK2/player-placeholder.png";
    };

  console.log(liveData);

  return (
    liveData?.events?.length > 0 && (
        <div className="py-4 rounded-lg brd bg-white flex flex-col gap-3">
            <div className="text-base font-medium text-center px-4">Live Ticker</div>
            <div className="brd05"></div>
            <div className="overflow-y-auto flex flex-col gap-3" style={{maxHeight: "40rem"}}>
            {liveData?.events?.map((event, index) => (
                <div className="flex flex-col gap-3" key={index}>
                    <div className="px-4">
                    {!event?.title ? (
                        <div className="flex flex-col gap-3">
                        {event?.time?.main ? (
                            <div className="text-sm font-bold">{event?.time?.main} {event?.time?.added}</div>
                        ) : (
                            <div className="h-4 w-4">
                                <svg xmlns="http://www.w3.org/2000/svg" id="full_time_24px" width="18" height="18" viewBox="0 0 18 18"><g id="gut" fill="var(--Events-Clock)"><path id="Path_2281" d="M12.75 1.5h-3a.75.75 0 0 0-.75.75.75.75 0 0 0 .75.75h3a.75.75 0 0 0 .75-.75.75.75 0 0 0-.75-.75z" class="cls-2" data-name="Path 2281" transform="translate(-2.25 -.375)"></path><path id="Path_2282" d="M15 7.043l.563-.562a.75.75 0 0 0 0-1.05.75.75 0 0 0-1.05 0l-.562.563A6.75 6.75 0 0 0 9.749 4.5 6.825 6.825 0 0 0 3 11.07a6.75 6.75 0 1 0 12-4.027zM9.749 16.5A5.25 5.25 0 1 1 15 11.25a5.25 5.25 0 0 1-5.25 5.25z" class="cls-2" data-name="Path 2282" transform="translate(-.749 -1.125)"></path><circle id="Ellipse_285" cx="3.75" cy="3.75" r="3.75" class="cls-2" data-name="Ellipse 285" transform="translate(5.25 6.375)"></circle></g></svg>
                            </div> 
                        ) }
                        <div className="text-sm">{event?.text}</div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {event?.time?.main ? (
                                <div className={`text-sm font-bold ${event?.title?.key === "goal" && "text-green-500"} ${event?.title?.key === "missed_penalty" && "text-red-500"}`}>{event?.time?.main} {event?.time?.added}</div>
                            ) : (
                            <div className="h-4 w-4">
                                <svg xmlns="http://www.w3.org/2000/svg" id="full_time_24px" width="18" height="18" viewBox="0 0 18 18"><g id="gut" fill="#000"><path id="Path_2281" d="M12.75 1.5h-3a.75.75 0 0 0-.75.75.75.75 0 0 0 .75.75h3a.75.75 0 0 0 .75-.75.75.75 0 0 0-.75-.75z" class="cls-2" data-name="Path 2281" transform="translate(-2.25 -.375)"></path><path id="Path_2282" d="M15 7.043l.563-.562a.75.75 0 0 0 0-1.05.75.75 0 0 0-1.05 0l-.562.563A6.75 6.75 0 0 0 9.749 4.5 6.825 6.825 0 0 0 3 11.07a6.75 6.75 0 1 0 12-4.027zM9.749 16.5A5.25 5.25 0 1 1 15 11.25a5.25 5.25 0 0 1-5.25 5.25z" class="cls-2" data-name="Path 2282" transform="translate(-.749 -1.125)"></path><circle id="Ellipse_285" cx="3.75" cy="3.75" r="3.75" class="cls-2" data-name="Ellipse 285" transform="translate(5.25 6.375)"></circle></g></svg>
                            </div>
                            )}
                            <div className="text-sm">{event?.text}</div>
                            {!event?.isSubstitution ? (
                                <Link to={"/player/" + (event?.players?.[0]?.id)}>
                                    {event?.players?.[0]?.id && 
                                        <div className="w-full rounded-lg bg-white brd05 flex justify-between p-2 items-center">
                                            <div className="flex gap-3 items-center">
                                            <div className="h-10 w-10 rounded-full flex items-end justify-center bg-white brd overflow-hidden">
                                                <img className="h-8 w-8 object-bottom object-contain" alt="playerPhoto" onError={handleError} src={`https://images.fotmob.com/image_resources/playerimages/${event?.players?.[0]?.id}.png`}/>
                                            </div>
                                            <div className="text-sm font-medium">{event?.players?.[0]?.name}</div>
                                            </div>
                                            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-white brd">
                                                {event?.title?.key === "goal" ? (
                                                    <img className="h-4 w-4" alt="goalIcon" src="https://i.ibb.co/9tyd46p/SVG-to.png" />
                                                ) : event?.title?.key === "yellow_card" ? (
                                                    <div className="w-3 h-4 rounded-sm bg-yellow-400" />
                                                ) : event?.title?.key === "second_yellow_card" ? (
                                                    <div className="w-3 h-4 rounded-sm bg-red-400" />
                                                ) : event?.title?.key === "red_card" ? (
                                                    <div className="w-3 h-4 rounded-sm bg-red-400" />
                                                ) : event?.title?.key === "missed_penalty" ? (
                                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="#000" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_251_1942)"><path d="M7.375 16.5077V10.252C7.375 10.0862 7.44078 9.92726 7.55792 9.80998C7.67506 9.6927 7.83399 9.62671 7.99976 9.62651H17.9995C18.1653 9.62671 18.3242 9.6927 18.4413 9.80998C18.5584 9.92726 18.6243 10.0862 18.6243 10.252V16.5077H20.5V10.252C20.4996 9.58894 20.2362 8.95313 19.7675 8.48407C19.2989 8.015 18.6633 7.75099 18.0002 7.75H7.99976C7.3367 7.75099 6.70111 8.015 6.23247 8.48407C5.76382 8.95313 5.5004 9.58894 5.5 10.252V16.5077H7.375Z" fill="var(--MFFullscreenColorScheme-eventIconColor)"></path><path d="M15.0603 17.1813L13.7553 15.8748L15.0588 14.5697C15.1684 14.451 15.2278 14.2946 15.2246 14.1331C15.2214 13.9716 15.1559 13.8175 15.0417 13.7033C14.9275 13.589 14.7736 13.5233 14.6121 13.52C14.4506 13.5167 14.294 13.576 14.1753 13.6855L12.8717 14.9905L11.5683 13.6855C11.4495 13.576 11.293 13.5167 11.1315 13.52C10.97 13.5233 10.816 13.589 10.7018 13.7033C10.5876 13.8175 10.5221 13.9716 10.5189 14.1331C10.5158 14.2946 10.5752 14.451 10.6848 14.5697L11.9883 15.8762L10.6833 17.1813C10.5958 17.2688 10.5363 17.3803 10.5122 17.5017C10.488 17.6231 10.5004 17.749 10.5478 17.8633C10.5951 17.9777 10.6753 18.0754 10.7782 18.1443C10.881 18.2131 11.002 18.2499 11.1257 18.25C11.2078 18.2502 11.289 18.234 11.3647 18.2024C11.4405 18.1709 11.5091 18.1246 11.5668 18.0663L12.8717 16.7613L14.1767 18.0663C14.2347 18.1244 14.3035 18.1706 14.3793 18.2021C14.4551 18.2336 14.5364 18.2498 14.6185 18.2498C14.7006 18.2498 14.7819 18.2336 14.8577 18.2021C14.9335 18.1706 15.0024 18.1244 15.0603 18.0663C15.1775 17.9488 15.2434 17.7897 15.2434 17.6237C15.2434 17.4578 15.1775 17.2987 15.0603 17.1813Z" fill="var(--MFFullscreenColorScheme-eventIconColor)"></path></g><defs><clipPath id="clip0_251_1942"><rect width="18" height="18" fill="white" transform="translate(4 4)"></rect></clipPath></defs></svg>
                                                ) : null}
                                            </div>
                                        </div>
                                    }
                                </Link>
                            ) : (
                                <div className="w-full rounded-lg bg-white brd05 flex flex-col relative">
                                    <div className="w-full flex justify-between p-2 items-center">
                                        <div className="flex gap-3 items-center">
                                            <div className="h-10 w-10 rounded-full flex items-end justify-center bg-white brd overflow-hidden">
                                                <img className="h-8 w-8 object-bottom object-contain" alt="playerPhoto" onError={handleError} src={`https://images.fotmob.com/image_resources/playerimages/${event?.players?.[0]?.id}.png`}/>
                                            </div>
                                            <div className="text-sm font-medium">{event?.players?.[0]?.name}</div>
                                        </div>
                                    </div>
                                    <div className="brd05"></div>
                                    <div className="w-full flex justify-between p-2 items-center">
                                        <div className="flex gap-3 items-center">
                                            <div className="h-10 w-10 rounded-full flex items-end justify-center bg-white brd overflow-hidden">
                                                <img className="h-8 w-8 object-bottom object-contain" alt="playerPhoto" onError={handleError} src={`https://images.fotmob.com/image_resources/playerimages/${event?.players?.[1]?.id}.png`}/>
                                            </div>
                                            <div className="text-sm font-medium">{event?.players?.[1]?.name}</div>
                                        </div>
                                    </div>
                                    <div className="absolute top-1/2 end-5 transform -translate-y-1/2">
                                        <div className="h-8 w-8 rounded-full bg-white brd flex justify-center items-center">
                                            <div className=" w-6 h-6 flex items-center justify-center rounded-full rotate-180">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 28 28"><path d="M2.328 7.1V1.012a1.012 1.012 0 0 1 2.025 0V7.1h1.812a.5.5 0 0 1 .354.86l-2.824 2.811a.52.52 0 0 1-.719 0L.151 7.957A.5.5 0 0 1 .506 7.1z" transform="rotate(-90 15.876 4.39)" class="fill-red-500"></path><path d="m3.687.144 2.824 2.825a.5.5 0 0 1-.354.86H4.345v6.084a1.012 1.012 0 0 1-2.025 0V3.829H.508a.5.5 0 0 1-.354-.86L2.978.144a.507.507 0 0 1 .709 0z" transform="rotate(-90 9.903 4.282)" class="fill-green-500"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                            }
                        </div>
                    )}
                    </div>
                    <div className="brd05"></div>
                </div>
            ))}
            </div>
        </div>
    )
  );
}

export default MatchLive;

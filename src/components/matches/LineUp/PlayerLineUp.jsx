import { Link } from "react-router-dom";

function PlayerLineUp(props) {
    const player = props?.player
    const handleError = (event) => {
        event.target.src = "https://i.ibb.co/q9SWXK2/player-placeholder.png";
    };
    return (
        <Link to={"/player/" + (player?.id)}>
            <div className="flex flex-1 md:flex-initial justify-center">
                {player?.events?.sub?.subbedIn ? 
                    <div className="flex w-full justify-between">
                        <div className="flex gap-2 items-center">
                            <div className="overflow-hidden h-8 w-8 rounded-full relative hidden md:block">
                                <img className="h-full" alt="playerPhoto" onError={handleError} src={`https://images.fotmob.com/image_resources/playerimages/${player?.id}.png`} />
                            </div>
                            {player?.rating?.num && 
                                <div style={{ backgroundColor: `${player.rating.bgcolor}` }} className="hidden md:flex gap-1 px-2 py-0.5 text-white text-xs items-center justify-end rounded-full">
                                    {player?.rating?.isTop?.isTopRating && 
                                        <img alt="MOTM" src="https://img.icons8.com/?size=512&id=85185&format=png" className="h-3 darktowhite"></img>
                                    }
                                    {player?.rating?.num}
                                </div>
                            }
                            <div className={`text-sm truncate text-center ${player?.events?.sub?.subbedIn ? "text-black" : "text-gray-100"}`}>
                                <span className="font-medium">{player?.shirt}</span> {player?.name?.lastName}
                            </div>
                        </div>
                        <div className="flex gap-1 md:gap-3 items-center">
                            {player?.events?.g !== undefined && Array.from({ length: player.events.g }).map((_, index) => (
                                <div key={index} className="flex w-6 h-6 items-center justify-center rounded-full"
                                    style={{ left: `${20 + index * 10}px` }}>
                                    <img src="https://i.ibb.co/9tyd46p/SVG-to.png" alt={`goalIcon-${index}`} className="w-4 h-4" />
                                </div>
                            ))}
                            {player?.events?.as !== undefined && Array.from({ length: player.events.as }).map((_, index) => (
                                <div key={index} className="flex w-6 h-6 items-center justify-center rounded-full"
                                    style={{ right: `${20 + index * 10}px` }}>
                                    <img src="https://img.icons8.com/?size=512&id=110622&format=png" alt={`assistIcon-${index}`} className="w-4 h-4" />
                                </div>
                            ))}
                            {player?.events?.yc !== undefined && Array.from({ length: player.events.yc }).map((_, index) => (
                                <div key={index} className="flex w-6 h-6nslate items-center justify-center rounded-full"
                                    style={{ right: `${28 + index * 10}px` }}>
                                    <div className="w-3 h-4 rounded-sm bg-yellow-400" />
                                </div>
                            ))}
                            {player?.events?.rc !== undefined && Array.from({ length: player.events.rc }).map((_, index) => (
                                <div key={index} className="flex w-6 h-6nslate items-center justify-center rounded-full"
                                    style={{ right: `${28 + index * 10}px` }}>
                                    <div className="w-3 h-4 rounded-sm bg-red-400" />
                                </div>
                            ))}
                            {player?.events?.sub?.subbedIn && 
                                <div className="flex gap-1 text-xs items-center">
                                    <div className="leading-lg text-[#1ec854] text-center">{player?.events?.sub?.subbedIn}'</div>
                                    <div className=" w-6 h-6 flex items-center justify-center rounded-full rotate-180">
                                        <svg viewBox="0 0 12 12" className="h-4 w-4 fill-[#1ec854]" xmlns="http://www.w3.org/2000/svg"><path d="M6.00016 0.16667C7.54442 0.175853 9.02283 0.793384 10.1148 1.88536C11.2068 2.97734 11.8243 4.45574 11.8335 6C11.8226 7.54519 11.2034 9.02388 10.1099 10.1157C9.01652 11.2076 7.53694 11.8247 5.99174 11.8333C4.44857 11.8231 2.97164 11.205 1.88122 10.113C0.790805 9.02101 0.174813 7.54318 0.16683 6C0.175845 4.45569 0.79332 2.97719 1.88533 1.88518C2.97735 0.793165 4.45585 0.175686 6.00016 0.16667ZM2.74646 6C2.74505 6.08586 2.76248 6.17099 2.79753 6.24938C2.83258 6.32777 2.8844 6.39752 2.94933 6.45371L5.08822 8.55695C5.19097 8.65642 5.32892 8.71118 5.47192 8.70926C5.54045 8.71086 5.60859 8.69854 5.67222 8.67305C5.73585 8.64755 5.79365 8.60942 5.84212 8.56095C5.8906 8.51248 5.92873 8.45468 5.95422 8.39105C5.97972 8.32742 5.99204 8.25928 5.99044 8.19075C5.98922 8.1196 5.9736 8.04944 5.94452 7.9845C5.91545 7.91956 5.87352 7.86118 5.82127 7.81288L5.06553 7.07982L4.35257 6.5101L5.64887 6.56648L8.7185 6.56648C8.79227 6.5683 8.86562 6.55482 8.93393 6.5269C9.00224 6.49897 9.06403 6.45722 9.11541 6.40426C9.1668 6.35129 9.20666 6.28825 9.2325 6.21913C9.25833 6.15 9.26958 6.07628 9.26553 6.0026C9.26909 5.92903 9.25751 5.85552 9.2315 5.78661C9.20549 5.7177 9.16561 5.65487 9.11432 5.602C9.06304 5.54914 9.00144 5.50737 8.93336 5.47928C8.86527 5.45119 8.79214 5.43738 8.7185 5.43871L5.65081 5.43871L4.35451 5.50352L5.05905 4.92861L5.81998 4.2014C5.87382 4.15313 5.91676 4.09395 5.94593 4.02778C5.9751 3.96162 5.98983 3.89 5.98914 3.81769C5.99074 3.74916 5.97842 3.68102 5.95293 3.61739C5.92743 3.55376 5.8893 3.49596 5.84083 3.44749C5.79236 3.39902 5.73456 3.36088 5.67093 3.33539C5.6073 3.30989 5.53915 3.29757 5.47063 3.29917C5.32812 3.29987 5.19111 3.35426 5.08692 3.45149L2.94803 5.55473C2.88426 5.61065 2.8333 5.67966 2.79863 5.75706C2.76395 5.83446 2.74638 5.91844 2.74711 6.00325L2.74646 6Z" fill="#1ec854"></path></svg>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                :
                <div className="flex flex-col items-center gap-1 md:gap-3 relative hover:opacity-50">
                    <div className="h-9 w-9 bg-gray-100 rounded-full flex items-end justify-center relative">
                        {player?.rating?.num && 
                            <div style={{ backgroundColor: `${player?.rating?.bgcolor}` }} className="flex gap-1 px-2 py-0.5 text-white absolute -top-2 -end-4 text-xs items-center justify-end rounded-full">
                                {player?.rating?.isTop?.isTopRating && 
                                    <img alt="MOTM" src="https://img.icons8.com/?size=512&id=85185&format=png" className="h-3 darktowhite"></img>
                                }
                                {player?.rating?.num}
                            </div>
                        }
                        
                        {player?.events?.sub?.subbedOut && 
                            <div className="flex flex-col absolute -top-6 -start-2 text-xs">
                                <div className="leading-lg text-white text-center">{player?.events?.sub?.subbedOut}'</div>
                                <div className=" w-5 h-5 bg-white brd flex items-center justify-center rounded-full">
                                    <svg width="12" height="12" viewBox="0 0 12 12" className="fill-red-500" xmlns="http://www.w3.org/2000/svg"><path d="M6.00016 0.16667C7.54442 0.175853 9.02283 0.793384 10.1148 1.88536C11.2068 2.97734 11.8243 4.45574 11.8335 6C11.8226 7.54519 11.2034 9.02388 10.1099 10.1157C9.01652 11.2076 7.53694 11.8247 5.99174 11.8333C4.44857 11.8231 2.97164 11.205 1.88122 10.113C0.790805 9.02101 0.174813 7.54318 0.16683 6C0.175845 4.45569 0.79332 2.97719 1.88533 1.88518C2.97735 0.793165 4.45585 0.175686 6.00016 0.16667ZM2.74646 6C2.74505 6.08586 2.76248 6.17099 2.79753 6.24938C2.83258 6.32777 2.8844 6.39752 2.94933 6.45371L5.08822 8.55695C5.19097 8.65642 5.32892 8.71118 5.47192 8.70926C5.54045 8.71086 5.60859 8.69854 5.67222 8.67305C5.73585 8.64755 5.79365 8.60942 5.84212 8.56095C5.8906 8.51248 5.92873 8.45468 5.95422 8.39105C5.97972 8.32742 5.99204 8.25928 5.99044 8.19075C5.98922 8.1196 5.9736 8.04944 5.94452 7.9845C5.91545 7.91956 5.87352 7.86118 5.82127 7.81288L5.06553 7.07982L4.35257 6.5101L5.64887 6.56648L8.7185 6.56648C8.79227 6.5683 8.86562 6.55482 8.93393 6.5269C9.00224 6.49897 9.06403 6.45722 9.11541 6.40426C9.1668 6.35129 9.20666 6.28825 9.2325 6.21913C9.25833 6.15 9.26958 6.07628 9.26553 6.0026C9.26909 5.92903 9.25751 5.85552 9.2315 5.78661C9.20549 5.7177 9.16561 5.65487 9.11432 5.602C9.06304 5.54914 9.00144 5.50737 8.93336 5.47928C8.86527 5.45119 8.79214 5.43738 8.7185 5.43871L5.65081 5.43871L4.35451 5.50352L5.05905 4.92861L5.81998 4.2014C5.87382 4.15313 5.91676 4.09395 5.94593 4.02778C5.9751 3.96162 5.98983 3.89 5.98914 3.81769C5.99074 3.74916 5.97842 3.68102 5.95293 3.61739C5.92743 3.55376 5.8893 3.49596 5.84083 3.44749C5.79236 3.39902 5.73456 3.36088 5.67093 3.33539C5.6073 3.30989 5.53915 3.29757 5.47063 3.29917C5.32812 3.29987 5.19111 3.35426 5.08692 3.45149L2.94803 5.55473C2.88426 5.61065 2.8333 5.67966 2.79863 5.75706C2.76395 5.83446 2.74638 5.91844 2.74711 6.00325L2.74646 6Z" fill="#e55e5b"></path></svg>
                                </div>
                            </div>
                        }
                        {player?.events?.g !== undefined && Array.from({ length: player.events.g }).map((_, index) => (
                            <div key={index} className="flex w-5 h-5 bg-white brd absolute -bottom-2 items-center justify-center rounded-full"
                                style={{ left: `${20 + index * 10}px` }}>
                                <img src="https://i.ibb.co/9tyd46p/SVG-to.png" alt={`goalIcon-${index}`} className="w-3 h-3" />
                            </div>
                        ))}
                        {player?.events?.as !== undefined && Array.from({ length: player.events.as }).map((_, index) => (
                            <div key={index} className="flex w-5 h-5 bg-white brd absolute -bottom-2 items-center justify-center rounded-full"
                                style={{ right: `${20 + index * 10}px` }}>
                                <img src="https://img.icons8.com/?size=512&id=110622&format=png" alt={`assistIcon-${index}`} className="w-4 h-4" />
                            </div>
                        ))}
                        {player?.events?.yc !== undefined && Array.from({ length: player.events.yc }).map((_, index) => (
                            <div key={index} className="flex w-5 h-5 bg-white brd absolute top-0 translate translate-y-1/2 items-center justify-center rounded-full"
                                style={{ right: `${28 + index * 10}px` }}>
                                <div className="w-2 h-3 rounded-sm bg-yellow-400" />
                            </div>
                        ))}
                        {player?.events?.rc !== undefined && Array.from({ length: player.events.rc }).map((_, index) => (
                            <div key={index} className="flex w-5 h-5 bg-white brd absolute top-0 translate translate-y-1/2 items-center justify-center rounded-full"
                                style={{ right: `${28 + index * 10}px` }}>
                                <div className="w-2 h-3 rounded-sm bg-red-400" />
                            </div>
                        ))}
                        <div className="overflow-hidden h-8 w-8 rounded-full">
                            <img className="h-full" alt="playerPhoto" onError={handleError} src={`https://images.fotmob.com/image_resources/playerimages/${player?.id}.png`} />
                        </div>
                    </div>
                    <div className={`text-sm text-nowrap truncate text-center ${player?.events?.sub?.subbedIn ? "text-black" : "text-gray-100"}`}>
                        <span className="font-medium">{player?.shirt}</span> {player?.name?.lastName}
                    </div>
                </div>
                }
            </div>
        </Link>
    )
}

export default PlayerLineUp
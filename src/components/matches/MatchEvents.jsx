import { Link } from "react-router-dom"

function MatchEvents(props) {
    const data = props.data
    const events = props.data?.content?.matchFacts?.events
    console.log(events)

    return (
        <div className="rounded-lg brd bg-white w-full py-4 flex flex-col gap-3">
            <div className="text-base font-medium text-center px-4">Match Events</div>
            <div className="brd05"></div>
            <div className="flex justify-between px-4">
                <img className="h-5 object-contain" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${data?.header?.teams?.[0]?.id}.png`} alt="teamLogo" />
                <img className="h-5 object-contain" src={`https://images.fotmob.com/image_resources/logo/teamlogo/${data?.header?.teams?.[1]?.id}.png`} alt="teamLogo" />
            </div>
            <div className="brd05"></div>
            {events?.events?.length > 0 ? 
                events?.events?.map((event, index) => (
                    <div className="flex flex-col gap-3 px-4" key={index}>
                        {event?.type === "Goal" ? 
                            <div className={`w-full flex ${event?.isHome ? "justify-start" : "justify-end"} items-center`}>
                                <Link to={"/player/" + (event?.playerId)}>
                                    <div className={`flex gap-3 items-center ${event?.isHome && "flex-row-reverse"}`}>
                                        <div className={`flex flex-col gap-2 ${event?.isHome ? "text-start" : "text-end"}`}>
                                            <div className="text-sm leading-3">{event?.fullName} ({event?.newScore[0]} - {event?.newScore[1]})</div>
                                            <div className="text-sm leading-3 text-gray-400">{event?.assistStr || event?.goalDescription}</div>
                                        </div>
                                        <img src="https://i.ibb.co/9tyd46p/SVG-to.png" alt={`goalIcon`} className="w-4 h-4" />
                                        <div className="text-sm font-bold">{event?.timeStr}'</div>
                                    </div>
                                </Link>
                            </div>
                            : event?.type === "Half" ?
                                <div className="text-center text-sm font-bold">{event?.halfStrShort}</div>
                            : event?.type === "AddedTime" ?
                                <div className="text-center text-sm font-medium">{event?.minutesAddedStr}</div>
                            : event?.type === "Substitution" ?
                                <div className={`w-full flex ${event?.isHome ? "justify-start" : "justify-end"} items-center`}>
                                    <div className={`flex gap-3 items-center ${event?.isHome && "flex-row-reverse"}`}>
                                        <div className={`flex flex-col gap-2 ${event?.isHome ? "text-start" : "text-end"}`}>
                                            <Link to={"/player/" + (event?.swap[0].id)}>
                                                <div className="text-sm leading-3 text-green-500">{event?.swap[0].name}</div>
                                            </Link>
                                            <Link to={"/player/" + (event?.swap[1].id)}>
                                                <div className="text-sm leading-3 text-red-500">{event?.swap[1].name}</div>
                                            </Link>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 28 28">
                                            <path d="M2.328 7.1V1.012a1.012 1.012 0 0 1 2.025 0V7.1h1.812a.5.5 0 0 1 .354.86l-2.824 2.811a.52.52 0 0 1-.719 0L.151 7.957A.5.5 0 0 1 .506 7.1z" transform="rotate(-90 15.876 4.39)" className="fill-red-500"></path>
                                            <path d="m3.687.144 2.824 2.825a.5.5 0 0 1-.354.86H4.345v6.084a1.012 1.012 0 0 1-2.025 0V3.829H.508a.5.5 0 0 1-.354-.86L2.978.144a.507.507 0 0 1 .709 0z" transform="rotate(-90 9.903 4.282)" className="fill-green-500"></path>
                                        </svg>
                                        <div className="text-sm font-bold">{event?.timeStr}'</div>
                                    </div>
                                </div>
                            : event?.type === "Card" ?
                                <div className={`w-full flex ${event?.isHome ? "justify-start" : "justify-end"} items-center`}>
                                    <Link to={"/player/" + (event?.player?.id)}>
                                        <div className={`flex gap-3 items-center ${event?.isHome && "flex-row-reverse"}`}>
                                            <div className={`flex flex-col gap-2 ${event?.isHome ? "text-start" : "text-end"}`}>
                                                <div className="text-sm leading-3">{event?.nameStr}</div>
                                            </div>
                                            {event?.card === "Yellow" ? <div className="w-3 h-4 rounded-sm bg-yellow-400" /> : <div className="w-3 h-4 rounded-sm bg-red-400" />}
                                            <div className="text-sm font-bold">{event?.timeStr}'</div>
                                        </div>
                                    </Link>
                                </div>
                            : event?.type === "MissedPenalty" ?
                                <div className={`w-full flex ${event?.isHome ? "justify-start" : "justify-end"} items-center`}>
                                    <Link to={"/player/" + (event?.player?.id)}>
                                        <div className={`flex gap-3 items-center ${event?.isHome && "flex-row-reverse"}`}>
                                            <div className={`flex flex-col gap-2 ${event?.isHome ? "text-start" : "text-end"}`}>
                                                <div className="text-sm leading-3">{event?.nameStr}</div>
                                                <div className="text-sm leading-3 text-gray-400">Missed Penalty</div>
                                            </div>
                                            <svg width="26" height="26" viewBox="0 0 26 26" fill="#000" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_251_1942)"><path d="M7.375 16.5077V10.252C7.375 10.0862 7.44078 9.92726 7.55792 9.80998C7.67506 9.6927 7.83399 9.62671 7.99976 9.62651H17.9995C18.1653 9.62671 18.3242 9.6927 18.4413 9.80998C18.5584 9.92726 18.6243 10.0862 18.6243 10.252V16.5077H20.5V10.252C20.4996 9.58894 20.2362 8.95313 19.7675 8.48407C19.2989 8.015 18.6633 7.75099 18.0002 7.75H7.99976C7.3367 7.75099 6.70111 8.015 6.23247 8.48407C5.76382 8.95313 5.5004 9.58894 5.5 10.252V16.5077H7.375Z" fill="var(--MFFullscreenColorScheme-eventIconColor)"></path><path d="M15.0603 17.1813L13.7553 15.8748L15.0588 14.5697C15.1684 14.451 15.2278 14.2946 15.2246 14.1331C15.2214 13.9716 15.1559 13.8175 15.0417 13.7033C14.9275 13.589 14.7736 13.5233 14.6121 13.52C14.4506 13.5167 14.294 13.576 14.1753 13.6855L12.8717 14.9905L11.5683 13.6855C11.4495 13.576 11.293 13.5167 11.1315 13.52C10.97 13.5233 10.816 13.589 10.7018 13.7033C10.5876 13.8175 10.5221 13.9716 10.5189 14.1331C10.5158 14.2946 10.5752 14.451 10.6848 14.5697L11.9883 15.8762L10.6833 17.1813C10.5958 17.2688 10.5363 17.3803 10.5122 17.5017C10.488 17.6231 10.5004 17.749 10.5478 17.8633C10.5951 17.9777 10.6753 18.0754 10.7782 18.1443C10.881 18.2131 11.002 18.2499 11.1257 18.25C11.2078 18.2502 11.289 18.234 11.3647 18.2024C11.4405 18.1709 11.5091 18.1246 11.5668 18.0663L12.8717 16.7613L14.1767 18.0663C14.2347 18.1244 14.3035 18.1706 14.3793 18.2021C14.4551 18.2336 14.5364 18.2498 14.6185 18.2498C14.7006 18.2498 14.7819 18.2336 14.8577 18.2021C14.9335 18.1706 15.0024 18.1244 15.0603 18.0663C15.1775 17.9488 15.2434 17.7897 15.2434 17.6237C15.2434 17.4578 15.1775 17.2987 15.0603 17.1813Z" fill="var(--MFFullscreenColorScheme-eventIconColor)"></path></g><defs><clipPath id="clip0_251_1942"><rect width="18" height="18" fill="white" transform="translate(4 4)"></rect></clipPath></defs></svg>
                                            <div className="text-sm font-bold">{event?.timeStr}'</div>
                                        </div>
                                    </Link>
                                </div>
                            : event?.type === "VAR" ?
                                <div className={`w-full flex ${event?.isHome ? "justify-start" : "justify-end"} items-center`}>
                                    <Link to={"/player/" + (event?.player?.id)}>
                                        <div className={`flex gap-3 items-center ${event?.isHome && "flex-row-reverse"}`}>
                                            <div className={`flex flex-col gap-2 ${event?.isHome ? "text-start" : "text-end"}`}>
                                                <div className="text-sm leading-3">{event?.nameStr}</div>
                                                <div className="text-sm leading-3 text-gray-400">{event?.VAR?.decision?.value}</div>
                                            </div>
                                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_688_8467)"><path d="M12.3379 12.2605H13.4149L12.8764 10.5798L12.3379 12.2605Z" fill="#000"></path><path d="M19.5094 5.94626H6.49162C6.2653 5.94566 6.04108 5.98974 5.83182 6.07594C5.62256 6.16214 5.43237 6.28876 5.27213 6.44858C5.11189 6.60841 4.98475 6.79827 4.898 7.00731C4.81126 7.21634 4.7666 7.44044 4.7666 7.66676V15.6168C4.7666 16.0743 4.94836 16.513 5.27186 16.8365C5.59536 17.16 6.03412 17.3418 6.49162 17.3418H19.5086C19.7351 17.3418 19.9595 17.2971 20.1687 17.2104C20.378 17.1238 20.5682 16.9967 20.7284 16.8365C20.8885 16.6763 21.0156 16.4862 21.1023 16.2769C21.189 16.0676 21.2336 15.8433 21.2336 15.6168V7.66676C21.2336 7.44051 21.189 7.21648 21.1023 7.00749C21.0156 6.7985 20.8885 6.60867 20.7284 6.44886C20.5682 6.28905 20.3781 6.16239 20.1689 6.07615C19.9598 5.9899 19.7356 5.94576 19.5094 5.94626ZM9.6386 13.9773C9.59214 14.0163 9.53271 14.0363 9.47211 14.0335H8.49861C8.43806 14.0369 8.37851 14.0171 8.33212 13.978C8.28957 13.9406 8.25924 13.8912 8.2451 13.8363L7.02187 9.61677L7.00987 9.55602C7.01033 9.52048 7.02425 9.48642 7.04885 9.46076C7.06077 9.44751 7.07535 9.43691 7.09163 9.42968C7.10791 9.42244 7.12554 9.41873 7.14336 9.41876H7.93611C7.96359 9.41778 7.99098 9.42224 8.01672 9.4319C8.04247 9.44155 8.06606 9.45622 8.08612 9.47502C8.12132 9.50826 8.14716 9.55015 8.1611 9.59651L8.98611 12.5763L9.81111 9.59651C9.82333 9.54833 9.84941 9.50479 9.88612 9.47127C9.9274 9.43487 9.98111 9.41578 10.0361 9.418H10.8296C10.847 9.41801 10.8641 9.42185 10.8798 9.42924C10.8954 9.43663 10.9093 9.44739 10.9204 9.46076C10.9437 9.48703 10.9568 9.52087 10.9571 9.55602C10.9572 9.57593 10.9552 9.59577 10.9511 9.61526L9.72187 13.8348C9.71107 13.8903 9.6817 13.9406 9.6386 13.9773ZM14.9681 13.99C14.9575 14.0031 14.9441 14.0137 14.929 14.0211C14.9138 14.0285 14.8972 14.0325 14.8804 14.0328H14.0936C14.0481 14.0341 14.0034 14.0207 13.9662 13.9945C13.929 13.9682 13.9013 13.9306 13.8874 13.8873L13.6691 13.2483H12.0836L11.8654 13.8873C11.8514 13.9305 11.8237 13.968 11.7865 13.9942C11.7493 14.0203 11.7045 14.0336 11.6591 14.032H10.8716C10.8548 14.0317 10.8382 14.0277 10.823 14.0204C10.8078 14.013 10.7945 14.0024 10.7839 13.9893C10.7593 13.9636 10.7456 13.9295 10.7456 13.894C10.7449 13.8741 10.7469 13.8541 10.7516 13.8348L12.1616 9.6085C12.1731 9.5531 12.2037 9.50354 12.2482 9.46854C12.2927 9.43355 12.3481 9.41539 12.4046 9.41727H13.3511C13.4075 9.41557 13.4627 9.43382 13.507 9.46879C13.5514 9.50377 13.5819 9.55323 13.5934 9.6085L15.0011 13.8348C15.0058 13.8541 15.0079 13.8741 15.0071 13.894C15.0074 13.9301 14.9933 13.9649 14.9681 13.9908V13.99ZM18.9851 13.99C18.9742 14.0036 18.9604 14.0145 18.9447 14.0219C18.929 14.0293 18.9117 14.033 18.8944 14.0328H18.0409C17.9858 14.0343 17.9317 14.0177 17.8869 13.9856C17.842 13.9535 17.8089 13.9077 17.7926 13.855L17.1266 12.424H16.5454V13.8663C16.5463 13.8882 16.5427 13.9101 16.5348 13.9306C16.5269 13.9511 16.515 13.9698 16.4996 13.9855C16.4852 14.0005 16.4678 14.0123 16.4485 14.0201C16.4293 14.028 16.4087 14.0318 16.3879 14.0313H15.5584C15.5381 14.0315 15.5181 14.0272 15.4998 14.0186C15.4815 14.01 15.4654 13.9975 15.4526 13.9818C15.423 13.9507 15.4069 13.9092 15.4076 13.8663V9.59127C15.4065 9.54689 15.4217 9.50363 15.4504 9.46976C15.4637 9.45382 15.4805 9.44111 15.4995 9.43254C15.5184 9.42397 15.5391 9.41979 15.5599 9.42027H17.2249C17.6761 9.39371 18.1212 9.53442 18.4751 9.8155C18.6284 9.95667 18.7483 10.1302 18.8261 10.3235C18.904 10.5168 18.9378 10.725 18.9251 10.933C18.9335 11.2077 18.8655 11.4793 18.7286 11.7175C18.5987 11.932 18.4111 12.1057 18.1871 12.2185L19.0039 13.8243C19.0153 13.8476 19.0214 13.8732 19.0219 13.8993C19.0209 13.9332 19.0079 13.9656 18.9851 13.9908V13.99Z" fill="#000"></path><path d="M17.2174 10.3668H16.5424V11.4542H17.2174C17.2897 11.4593 17.3623 11.4493 17.4306 11.4249C17.4989 11.4005 17.5613 11.3622 17.6141 11.3125C17.6617 11.2594 17.6984 11.1974 17.7219 11.1301C17.7455 11.0628 17.7555 10.9914 17.7514 10.9202C17.7581 10.7733 17.7088 10.6294 17.6134 10.5175C17.562 10.4655 17.5001 10.4251 17.4318 10.3991C17.3634 10.373 17.2903 10.362 17.2174 10.3668Z" fill="#000"></path><path d="M16.9211 19.3668C16.9225 19.1862 16.8522 19.0125 16.7257 18.8837C16.5991 18.7549 16.4267 18.6815 16.2461 18.6797H9.74362C9.65485 18.6804 9.56708 18.6986 9.48535 18.7333C9.40362 18.7679 9.32953 18.8184 9.26732 18.8817C9.2051 18.945 9.15599 19.02 9.1228 19.1023C9.0896 19.1847 9.07297 19.2727 9.07386 19.3615V19.3668C9.07218 19.4555 9.08802 19.5438 9.12049 19.6264C9.15295 19.709 9.2014 19.7845 9.26306 19.8483C9.32472 19.9122 9.39835 19.9633 9.47979 19.9987C9.56122 20.0341 9.64885 20.053 9.73762 20.0545H16.2446C16.4251 20.0529 16.5976 19.9797 16.7241 19.8511C16.8507 19.7224 16.921 19.5487 16.9196 19.3682L16.9211 19.3668Z" fill="#000"></path></g></svg>                                            
                                            <div className="text-sm font-bold">{event?.timeStr}'</div>
                                        </div>
                                    </Link>
                                </div>
                            : null   
                            }
                        {index !== events.events.length - 1 && <div className="brd05"></div>}
                    </div>
                ))
            : 
                <div className="w-100 py-8 flex flex-col items-center justify-center gap-4">
                    <svg width="90" height="88" viewBox="0 0 90 88" className="opacity-50" xmlns="http://www.w3.org/2000/svg"><rect x="12.5" y="11.5" width="32.5" height="24.1667" className="fill-gray-100"></rect><rect x="49.1667" y="13.1667" width="31.6667" height="45" className="fill-gray-100"></rect><rect x="19.1667" y="37.3334" width="31.6667" height="24.1667" className="fill-gray-100"></rect><path d="M24.3386 87.3334C26.0045 87.3334 27.3047 86.5127 29.2957 84.625L44.2483 71.0013H70.9029C83.1332 71.0013 90 63.9432 90 51.7557V19.9123C90 7.72477 83.1332 0.666687 70.9029 0.666687H19.0971C6.86682 0.666687 0 7.72477 0 19.9123V51.7557C0 63.9432 7.02934 71.0013 18.8126 71.0013H20.4379V82.9015C20.4379 85.5688 21.9007 87.3334 24.3386 87.3334ZM21.4537 34.8081C18.2032 34.8081 16.6185 33.2488 16.6185 30.048V22.0871C16.6185 18.8453 18.2032 17.286 21.4537 17.286H39.1693C42.3386 17.286 43.9639 18.8453 43.9639 22.0871V30.048C43.9639 33.2488 42.3386 34.8081 39.1693 34.8081H21.4537ZM55.6253 51.6736C52.4153 51.6736 50.8307 50.1553 50.8307 46.8725V24.9596C50.8307 21.7589 52.4153 20.1585 55.6253 20.1585H68.2212C71.4311 20.1585 73.0158 21.7589 73.0158 24.9596V46.8725C73.0158 50.1553 71.4311 51.6736 68.2212 51.6736H55.6253ZM26.2077 54.2999C22.9977 54.2999 21.4131 52.7406 21.4131 49.4988V44.1231C21.4131 40.9224 22.9977 39.322 26.2077 39.322H41.526C44.7359 39.322 46.2799 40.9224 46.2799 44.1231V49.4988C46.2799 52.7406 44.7359 54.2999 41.526 54.2999H26.2077Z" className="fill-gray-400"></path></svg>
                    <div className="text-base font-medium">No Events</div>
                </div>
            }
        </div>
    )
}

export default MatchEvents
function PlayerPosition(props) {
    const playerPositionData = props.data

    return (
        <>
            <div className="flex justify-between">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="text-base leading-snug font-medium">Primary Position</div>
                        <div className="text-xs leading-snug text-[#6d6a7f]">{playerPositionData?.primaryPosition?.label}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {playerPositionData?.nonPrimaryPositions && playerPositionData?.nonPrimaryPositions.length >= 1 &&
                        <>
                            <div className="text-base leading-snug font-medium">Secondary Position</div>
                            <div className="flex flex-wrap">
                                {playerPositionData?.nonPrimaryPositions.map((nonPrimaryPos, index) => (
                                    <div key={index} className="text-xs leading-snug text-[#6d6a7f]">
                                         {nonPrimaryPos?.label}{index < playerPositionData?.nonPrimaryPositions.length-1 && ",\u00A0"} 
                                    </div>
                                ))}
                            </div>
                        </>
                        }
                    </div>
                </div>
                <div className="flex">
                    <div style={{width: "170px", height: "230px"}} className="flex items-center justify-center relative">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 230" className="fillgray"><path d="M164 0H6C2.68629 0 0 2.68629 0 6V224C0 227.314 2.68629 230 6 230H164C167.314 230 170 227.314 170 224V6C170 2.68629 167.314 0 164 0Z" className="fillgray"></path><path d="M34 230V186.617C33.9992 186.351 34.1041 186.095 34.2915 185.906C34.479 185.717 34.7337 185.61 35 185.608H135C135.266 185.61 135.521 185.717 135.709 185.906C135.896 186.095 136.001 186.351 136 186.617V230H139V186.617C139.005 185.552 138.586 184.528 137.836 183.771C137.085 183.015 136.066 182.587 135 182.582H104.828C102.459 179.594 99.4446 177.18 96.0111 175.521C92.5776 173.861 88.8135 172.999 85 172.999C81.1866 172.999 77.4224 173.861 73.9889 175.521C70.5555 177.18 67.5414 179.594 65.172 182.582H35C33.9346 182.587 32.9146 183.015 32.1645 183.771C31.4144 184.528 30.9955 185.552 31 186.617V230H34ZM85 176.026C87.9343 176.027 90.8394 176.607 93.5494 177.732C96.2593 178.857 98.7208 180.506 100.793 182.583H69.207C71.2792 180.506 73.7407 178.857 76.4506 177.732C79.1606 176.607 82.0658 176.027 85 176.026Z" className="fill-white"></path><path d="M106 208H64.0001C62.9392 208 61.9218 208.421 61.1716 209.172C60.4215 209.922 60.0001 210.939 60.0001 212V230H63.0001V212C63.0001 211.735 63.1054 211.48 63.293 211.293C63.4805 211.105 63.7348 211 64.0001 211H106C106.265 211 106.52 211.105 106.707 211.293C106.895 211.48 107 211.735 107 212V230H110V212C110 210.939 109.579 209.922 108.828 209.172C108.078 208.421 107.061 208 106 208Z" className="fill-white"></path><path d="M34 0V43.383C33.9992 43.6493 34.104 43.905 34.2914 44.0942C34.4789 44.2833 34.7337 44.3904 35 44.392H135C135.266 44.3904 135.521 44.2833 135.709 44.0942C135.896 43.905 136.001 43.6493 136 43.383V0H139V43.383C139.004 44.4485 138.586 45.4721 137.836 46.2288C137.085 46.9855 136.065 47.4132 135 47.418H104.828C102.459 50.4061 99.4446 52.82 96.0111 54.4794C92.5776 56.1387 88.8134 57.0006 85 57.0006C81.1865 57.0006 77.4224 56.1387 73.9889 54.4794C70.5554 52.82 67.5413 50.4061 65.172 47.418H35C33.9345 47.4132 32.9146 46.9855 32.1644 46.2288C31.4143 45.4721 30.9955 44.4485 31 43.383V0H34ZM85 53.974C87.9342 53.9728 90.8394 53.393 93.5493 52.2679C96.2592 51.1428 98.7207 49.4944 100.793 47.417H69.207C71.2791 49.4945 73.7406 51.1429 76.4506 52.2681C79.1605 53.3932 82.0657 53.9729 85 53.974Z" className="fill-white"></path><path d="M106 22H64C62.9391 22 61.9217 21.5786 61.1716 20.8284C60.4214 20.0783 60 19.0609 60 18V0H63V18C63 18.2652 63.1054 18.5196 63.2929 18.7071C63.4804 18.8946 63.7348 19 64 19H106C106.265 19 106.52 18.8946 106.707 18.7071C106.895 18.5196 107 18.2652 107 18V0H110V18C110 19.0609 109.579 20.0783 108.828 20.8284C108.078 21.5786 107.061 22 106 22Z" className="fill-white"></path><path d="M170 114H107.444C107.064 108.306 104.534 102.97 100.367 99.0719C96.1993 95.1737 90.7063 93.0049 85 93.0049C79.2937 93.0049 73.8007 95.1737 69.6334 99.0719C65.4662 102.97 62.9363 108.306 62.556 114H0V117H62.556C62.9363 122.694 65.4662 128.03 69.6334 131.928C73.8007 135.826 79.2937 137.995 85 137.995C90.7063 137.995 96.1993 135.826 100.367 131.928C104.534 128.03 107.064 122.694 107.444 117H170V114ZM85 96C89.908 96.0076 94.6329 97.8645 98.2329 101.201C101.833 104.537 104.043 109.107 104.424 114H65.576C65.9566 109.107 68.1671 104.537 71.7671 101.201C75.3671 97.8645 80.092 96.0076 85 96ZM85 135C80.092 134.992 75.3671 133.135 71.7671 129.799C68.1671 126.463 65.9566 121.893 65.576 117H104.424C104.043 121.893 101.833 126.463 98.2329 129.799C94.6329 133.135 89.908 134.992 85 135Z" className="fill-white"></path></svg>
                        {playerPositionData?.positions?.map((position, index) => {
                            if (!position?.pitchPositionData) {
                                return null;
                            }
                            const complementY = (1 - position?.pitchPositionData?.top) * 100;
                            const percentY = (complementY.toFixed(2)-5) + '%';

                            const complementX = (1 - position?.pitchPositionData?.right) * 100;
                            const percentX = complementX.toFixed(2) + '%';

                            return (
                                <div key={index} className="posAbs" style={{ bottom: percentY, left: percentX }}>
                                    <div className={`text-white text-xs rounded-full px-2 py-0.5 flex items-center justify-center ${position?.strPos?.label === playerPositionData?.primaryPosition?.label ? "bg-green-500" : "bg-gray-600 opacity-30"}`}>
                                        {position?.strPosShort?.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )   
}

export default PlayerPosition
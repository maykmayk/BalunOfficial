function PlayerPrimaryStats(props) {
    const playerData = props.data
    console.log(playerData)
    return (
        <>
            <div className="flex flex-col basis-1/2 gap-5">
                <div className="flex flex-col">
                    <div className="text-lg font-medium leading-snug">{playerData?.playerInformation?.[0]?.value?.fallback}</div>
                    <div className="text-sm leading-snug text-[#6d6a7f]">{playerData?.playerInformation?.[0]?.title}</div>
                </div>
                <div className="brd05"></div>
                <div className="flex flex-col">
                    <div className="text-lg font-medium leading-snug">{playerData?.playerInformation?.[2]?.value?.fallback}</div>
                    <div className="text-sm leading-snug text-[#6d6a7f]">{playerData?.playerInformation?.[2]?.title}</div>
                </div>
                <div className="brd05"></div>
                <div className="flex flex-col">
                    <div className="text-lg font-medium leading-snug">{playerData?.playerInformation?.[4]?.value?.fallback}</div>
                    <div className="text-sm leading-snug text-[#6d6a7f]">{playerData?.playerInformation?.[4]?.title}</div>
                </div>
            </div>
            <div className="flex flex-col basis-1/2 gap-5">
                <div className="flex flex-col">
                    <div className="text-lg font-medium leading-snug">{playerData?.playerInformation?.[1]?.value?.fallback}</div>
                    <div className="text-sm leading-snug text-[#6d6a7f]">{playerData?.playerInformation?.[1]?.title}</div>
                </div>
                <div className="brd05"></div>
                <div className="flex flex-col">
                    <div className="text-lg font-medium leading-snug">{playerData?.playerInformation?.[3]?.value?.fallback}</div>
                    <div className="text-sm leading-snug text-[#6d6a7f]">{playerData?.playerInformation?.[3]?.title}</div>
                </div>
                <div className="brd05"></div>
                <div className="flex flex-col">
                    <div className="text-lg font-medium leading-snug">{playerData?.playerInformation?.[5]?.value?.fallback}</div>
                    <div className="text-sm leading-snug text-[#6d6a7f]">{playerData?.playerInformation?.[5]?.title}</div>
                </div>
            </div>
        </>
    )
}

export default PlayerPrimaryStats
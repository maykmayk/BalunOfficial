function NewsBlock(props) {
    const newsData = props.newsData
    const colorTeam= props.colorTeam

    return (
        <>
        <a href={newsData?.page?.url} target="_blank" rel="noopener noreferrer">
            <div className="w-60 flex flex-col rounded-lg bg-white brd">
                <div className="flex w-auto relative">
                    {newsData.imageUrl && <img src={newsData.imageUrl} className="object-cover rounded-lg" alt="newsImage"></img>}
                    <div className="absolute bottom-0 end-0 p-4">
                        {/* <span className={`w-fit ${props.colorTeam && `bg-[${props.colorTeam}] text-[${props.colorTeam}] border-[${props.colorTeam}]`} text-xs font-medium px-2.5 py-0.5 rounded border flex text-end`}>{newsData.sourceStr}</span> */}
                        <div className="text-orange-600 text-xs bg-orange-200 rounded-full px-3 py-0.5">
                            {newsData.sourceStr}
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <div className="text-base font-medium">{newsData.title}</div>
                </div>
            </div>
        </a>
        </>
    )
}

export default NewsBlock
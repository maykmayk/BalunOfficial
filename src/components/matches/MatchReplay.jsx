function MatchReplay(props) {
    const data = props.data
    return (
        <div className="flex flex-col gap-3 p-4 bg-white brd rounded-lg relative">
            <div className="text-base text-center font-medium">Match Highlights</div>
            <div className="absolute top-0 end-0 p-4 hidden md:block">
                <div className="text-gray-500 text-xs bg-gray-100 rounded-full px-3 py-0.5">
                    {data?.source}
                </div>
            </div>
            <a href={data?.url} target="_blank" rel="noreferrer">
                <div className="hidden md:flex xl:hidden w-full h-72 items-center justify-center bg-black rounded-lg relative hover:opacity-50">
                    <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:p-5 p-3 rounded-full md:h-20 md:w-20 h-12 w-12 bg-white brd">
                        <svg xmlns="http://www.w3.org/2000/svg" className="md:ms-2 ms-1 fillblack" viewBox="0 0 384 512"><path fill="#000" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                    </div>
                    <img src={data?.image} className="h-72 object-contain" alt="videoThumbnail"></img>
                </div>
                <div className="flex md:hidden xl:flex relative">
                    <img src={data?.image} className="w-full rounded-lg" alt="videoThumbnail"></img>
                    <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-full h-12 w-12 bg-white brd">
                        <svg xmlns="http://www.w3.org/2000/svg" className="ms-1 fillblack" viewBox="0 0 384 512"><path fill="#000" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default MatchReplay
import { NavLink } from "react-router-dom"

function BottomBar(props) {
    return (
        <>
        <div className="fixed bottom-0 left-0 z-50 w-full py-3 bg-white border-t border-gray-200">
            <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
                <div className="inline-flex flex-col items-center justify-center px-5">
                    <NavLink to="/matches/">
                        <div className="flex flex-col items-center gap-1">
                            <div className={`flex items-center justify-center h-6 w-6 ${props.isActive1 ? "fill-gray-800" : "fill-gray-400"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
                                    <path  d="M417.3 360.1l-71.6-4.8c-5.2-.3-10.3 1.1-14.5 4.2s-7.2 7.4-8.4 12.5l-17.6 69.6C289.5 445.8 273 448 256 448s-33.5-2.2-49.2-6.4L189.2 372c-1.3-5-4.3-9.4-8.4-12.5s-9.3-4.5-14.5-4.2l-71.6 4.8c-17.6-27.2-28.5-59.2-30.4-93.6L125 228.3c4.4-2.8 7.6-7 9.2-11.9s1.4-10.2-.5-15l-26.7-66.6C128 109.2 155.3 89 186.7 76.9l55.2 46c4 3.3 9 5.1 14.1 5.1s10.2-1.8 14.1-5.1l55.2-46c31.3 12.1 58.7 32.3 79.6 57.9l-26.7 66.6c-1.9 4.8-2.1 10.1-.5 15s4.9 9.1 9.2 11.9l60.7 38.2c-1.9 34.4-12.8 66.4-30.4 93.6zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm14.1-325.7c-8.4-6.1-19.8-6.1-28.2 0L194 221c-8.4 6.1-11.9 16.9-8.7 26.8l18.3 56.3c3.2 9.9 12.4 16.6 22.8 16.6h59.2c10.4 0 19.6-6.7 22.8-16.6l18.3-56.3c3.2-9.9-.3-20.7-8.7-26.8l-47.9-34.8z"/>
                                </svg>
                            </div>
                            <span className={`text-sm ${props.isActive1 ? "text-gray-800" : "text-gray-400"}`}>Matches</span>
                        </div>
                    </NavLink>
                </div>
                <div className="inline-flex flex-col items-center justify-center px-5">
                    <NavLink to="/">
                        <div className="flex flex-col items-center gap-1">
                            <div className={`flex items-center justify-center w-6 h-6 ${props.isActive2 ? "text-gray-800" : "text-gray-400"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"/>
                                    <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"/>
                                </svg>                    
                            </div>
                            <span className={`text-sm ${props.isActive2 ? "text-gray-800" : "text-gray-400"}`}>Leagues</span>
                        </div>
                    </NavLink>
                </div>
                <div className="inline-flex flex-col items-center px-5">
                    <NavLink to="#">
                        <div className="flex flex-col items-center gap-1">
                            <div className={`flex items-center justify-center w-6 h-6 ${props.isActive3 ? "text-gray-800" : "text-gray-400"}`}>
                                <svg className={`${props.isActive3 ? "fill-gray-800" : "fill-gray-400"}`} xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
                                    <path d="M32 96l320 0V32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32zM480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32H160v64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 64H480z"/>
                                </svg>
                            </div>
                            <span className={`text-sm ${props.isActive3 ? "text-gray-800" : "text-gray-400"}`}>Transfers</span>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    </>
    )
}

export default BottomBar
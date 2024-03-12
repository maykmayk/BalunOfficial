import React, { useEffect, useRef, useState } from "react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Label,
	ReferenceLine,
	ReferenceDot,
	Tooltip
  } from "recharts";

function Momentum(props) {
	const [chartDimensions, setChartDimensions] = useState({ width: 800, height: 200 });
	const chartContainerRef = useRef(null);

	useEffect(() => {
		const updateDimensions = () => {
		if (chartContainerRef.current) {
			const { width, height } = chartContainerRef.current.getBoundingClientRect();
			setChartDimensions({ width, height });
		}
		};

		window.addEventListener("resize", updateDimensions);
		updateDimensions();
		return () => {
			window.removeEventListener("resize", updateDimensions);
		};
	}, [props.data]);

	const data = props.data?.content?.momentum?.main?.data;
	console.log(data);

	let minutes = [];
	let values = [];

	data?.map((moment, index) => {
		minutes.push(moment.minute);
		values.push(moment.value);
	});

	const gradientOffset = () => {
		const dataMax = Math.max(...values);
		const dataMin = Math.min(...values);

		if (dataMax <= 0) {
			return 0;
		}
		if (dataMin >= 0) {
			return 1;
		}

		return dataMax / (dataMax - dataMin);
	};

	const off = gradientOffset();

	const CustomReferenceDot = props => {
		return (
			<svg x={props.cx} y={props.cy}>
				<svg width={window.innerWidth > 768 ? 20 : 15} height={window.innerWidth > 768 ? 20 : 15} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" fill="var(--GlobalColorScheme-Background-card)"></rect><path d="M8.99838 13.8464C12.2187 13.8464 14.8293 11.4356 14.8293 8.46176C14.8293 5.48792 12.2187 3.07715 8.99838 3.07715C5.77806 3.07715 3.16748 5.48792 3.16748 8.46176C3.16748 11.4356 5.77806 13.8464 8.99838 13.8464Z" fill="white"></path><path d="M8.56093 2H9.43557C9.47 2.0098 9.50507 2.0172 9.54052 2.02216C10.6137 2.09333 11.6539 2.42266 12.5726 2.98216C13.4439 3.49248 14.1928 4.1877 14.7664 5.01885C15.3401 5.84999 15.7245 6.79685 15.8927 7.79271C15.9405 8.047 15.965 8.30478 16 8.56141V9.43626C15.9902 9.47109 15.9828 9.50656 15.9778 9.54241C15.8943 10.7299 15.498 11.8741 14.8292 12.8587C14.3102 13.6548 13.6324 14.335 12.8384 14.8569C12.0443 15.3788 11.1511 15.731 10.2146 15.8915C9.95685 15.9393 9.69329 15.965 9.43323 16H8.5586C8.52889 15.9906 8.49847 15.9836 8.46764 15.979C7.28101 15.8999 6.13639 15.5083 5.14985 14.844C4.35133 14.3252 3.66886 13.6467 3.14542 12.8511C2.62198 12.0555 2.26891 11.1601 2.10845 10.2213C2.06064 9.96234 2.03499 9.69989 2 9.43977V8.56491C2.01983 8.39927 2.03732 8.23247 2.06064 8.06683C2.26238 6.59265 2.92772 5.22088 3.96043 4.14995C4.99315 3.07903 6.33968 2.36447 7.80525 2.10964C8.05597 2.06182 8.30904 2.03499 8.56093 2ZM12.3533 12.0923V12.1156C12.6041 12.1156 12.8548 12.1156 13.1044 12.1156C13.1359 12.1139 13.1667 12.1057 13.195 12.0917C13.2232 12.0777 13.2483 12.058 13.2688 12.034C13.8906 11.1708 14.2322 10.1373 14.2472 9.07348C14.2504 9.03584 14.2426 8.99809 14.2248 8.96477C14.207 8.93145 14.18 8.90399 14.1469 8.88569C13.7644 8.62206 13.3866 8.3526 13.0064 8.08548C12.9434 8.05677 12.8871 8.01538 12.8408 7.96391C12.7945 7.91244 12.7594 7.852 12.7375 7.78633C12.7156 7.72067 12.7075 7.6512 12.7136 7.58225C12.7198 7.51331 12.74 7.44637 12.7732 7.38561C12.9259 6.94235 13.0799 6.50026 13.2257 6.05583C13.2336 6.02544 13.2353 5.99376 13.2307 5.96269C13.2261 5.93162 13.2152 5.90181 13.1988 5.87503C12.5682 5.01784 11.691 4.37362 10.6845 4.02849C10.652 4.01415 10.6161 4.00938 10.581 4.01475C10.5459 4.02013 10.513 4.03541 10.4863 4.05882C10.1096 4.34578 9.73061 4.62923 9.3516 4.91385C9.30525 4.96204 9.24965 5.00038 9.18813 5.02657C9.12661 5.05276 9.06044 5.06626 8.99358 5.06626C8.92673 5.06626 8.86056 5.05276 8.79904 5.02657C8.73752 5.00038 8.68192 4.96204 8.63557 4.91385C8.26006 4.63273 7.88455 4.35277 7.51137 4.06815C7.48382 4.04255 7.4495 4.02541 7.41248 4.01879C7.37547 4.01217 7.33733 4.01635 7.30262 4.03083C6.29611 4.3753 5.41886 5.01917 4.78834 5.87619C4.77193 5.90296 4.7611 5.93278 4.75649 5.96385C4.75188 5.99491 4.75359 6.0266 4.76152 6.05699C4.90729 6.50141 5.06239 6.94351 5.21399 7.38676C5.24679 7.4476 5.26679 7.51451 5.27275 7.58337C5.27872 7.65223 5.27052 7.72158 5.24867 7.78715C5.22682 7.85272 5.19178 7.91314 5.1457 7.96464C5.09962 8.01615 5.04349 8.05767 4.98076 8.08666C4.60408 8.35144 4.2309 8.61739 3.85189 8.87752C3.81503 8.89796 3.78492 8.92871 3.76524 8.96599C3.74557 9.00328 3.73718 9.04551 3.74111 9.08749C3.76169 10.1417 4.0985 11.1654 4.70787 12.0258C4.72767 12.0582 4.75632 12.0841 4.79042 12.1007C4.82453 12.1172 4.86265 12.1236 4.90029 12.1192C5.36676 12.1075 5.83323 12.1017 6.29388 12.0947C6.3604 12.0841 6.42836 12.0868 6.49382 12.1027C6.55928 12.1186 6.62092 12.1474 6.67517 12.1873C6.72942 12.2273 6.77519 12.2776 6.80984 12.3354C6.84448 12.3931 6.8673 12.4572 6.87697 12.5239C7.01458 12.9718 7.15335 13.4186 7.28746 13.8677C7.29508 13.9022 7.31241 13.9339 7.33741 13.9589C7.36242 13.9839 7.39404 14.0012 7.42857 14.0088C8.43954 14.3255 9.52314 14.3255 10.5341 14.0088C10.5728 13.9999 10.608 13.9799 10.6355 13.9513C10.663 13.9228 10.6817 13.8868 10.6892 13.8479C10.8222 13.3988 10.9621 12.952 11.0997 12.5041C11.1212 12.3735 11.1932 12.2567 11.3001 12.1788C11.407 12.1008 11.5403 12.0681 11.6711 12.0876C11.9067 12.0946 12.1294 12.0923 12.3533 12.0923Z" fill="#000"></path><path d="M8.99943 11.186C8.7312 11.186 8.46181 11.1801 8.19358 11.186C8.08092 11.1953 7.96847 11.1656 7.87506 11.1019C7.78166 11.0382 7.71297 10.9444 7.68048 10.836C7.48223 10.3426 7.28281 9.84919 7.08456 9.35577C7.00526 9.15747 6.92363 8.95917 6.85133 8.75737C6.8031 8.65563 6.7944 8.53958 6.82695 8.43179C6.85949 8.324 6.93094 8.23217 7.0274 8.17414C7.58173 7.75265 8.13879 7.33465 8.69856 6.92017C8.78013 6.84752 8.88555 6.80739 8.99476 6.80739C9.10398 6.80739 9.20939 6.84752 9.29097 6.92017C9.85462 7.33698 10.4152 7.75769 10.9726 8.18229C11.0695 8.2399 11.1408 8.3323 11.172 8.44066C11.2032 8.54901 11.192 8.66518 11.1405 8.76553C10.8641 9.47707 10.5796 10.1863 10.2916 10.8932C10.2567 10.9884 10.1914 11.0694 10.1058 11.1236C10.0202 11.1779 9.919 11.2022 9.81808 11.193C9.54636 11.1825 9.27231 11.1871 8.99943 11.186Z" fill="#000"></path></svg>
			</svg>
		);
	  };
	
	const CustomToolTip = ({ active, payload, label }) => {
		return (
			<div className="bg-white rounded-lg  flex items-center justify-center px-2" style={{
				transform: 'translate(-25px,0px)',
			  }} >
    			{label >= 44 && label <= 46 ? "HT" : label >= minutes[minutes.length-1] ? "FT" : label + "'"}
			</div>
		);
	};

	return (
		<div className="w-full flex flex-col rounded-lg py-4 bg-white brd gap-4">
			<div className="text-center font-medium text-base px-4">Match Momentum</div>
			<div className="brd05"></div>
			<div className="h-32 md:h-64 relative" ref={chartContainerRef}>
				<AreaChart width={chartDimensions.width} height={chartDimensions.height} data={data} margin={{ top: 10, right: 20, left: -40, bottom: 10}}>
					<XAxis dataKey={"minute"} stroke="#e8e8e8" strokeWidth={4} strokeDasharray="0, 10" strokeLinecap="round" tick={false}/>
					<YAxis strokeWidth={0} tick={false}/>
					{window.innerWidth > 1028 &&
						<Tooltip 
							cursor={{ stroke: "#e8e8e8", strokeWidth: 2 }}
							isAnimationActive={false}
							position={{ y: 230 }}
							allowEscapeViewBox={{ x: true, y: true }}
							content={<CustomToolTip />}
						/>
					}
					{/* <ReferenceLine x={45} stroke="#e8e8e8"
						strokeWidth={4}
						strokeDasharray="0.0001, 9.85704"
						strokeLinecap="round"
						label= {<Label position="bottom" offset={-5} value="HT" style={{ textAnchor: "middle", fill: "#000", backgroundColor: "#fff", padding: "10px" }} />}
					/>
					<ReferenceLine x={0}
						stroke="#fff"
						strokeWidth={0}
						label= {<Label position="bottom" offset={-5} value="0" style={{ textAnchor: "middle", fill: "#000", backgroundColor: "#fff", padding: "10px" }} />}
					/>
					<ReferenceLine x={90}
						stroke="#fff"
						strokeWidth={0}
						label= {<Label position="bottom" offset={-5} value="FT" style={{ textAnchor: "middle", fill: "#000", backgroundColor: "#fff", padding: "10px" }} />}
					/> */}
					<defs>
						<linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
							<stop offset={off} stopColor={props.colorData?.home} stopOpacity={1} />
							<stop offset={off} stopColor={props.colorData?.away} stopOpacity={1} />
						</linearGradient>
					</defs>
					<Area type="monotone" dataKey="value" strokeWidth={0} fill="url(#splitColor)" fillOpacity={1} />
					{props.data?.content?.matchFacts?.events?.events?.map((goal, index) => {
						if (goal?.type === "Goal") {
							return (
								<ReferenceDot key={index} x={goal.time} y={goal?.isHome ? 100 : -100} shape={<CustomReferenceDot />} />
							);
						}
						return null;
					})}
				</AreaChart>
			</div>
		</div>
	);
}

export default Momentum;
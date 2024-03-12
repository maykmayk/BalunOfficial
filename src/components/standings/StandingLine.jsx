import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StandingLine(props) {
    const [borderColors, setBorderColors] = useState([]);

    useEffect(() => {
        const getBorderColors = async () => {

            var colors = await Promise.all(props.qualifyingTeams.map(async (competition) => {
                const color = competition.indices && competition.indices.includes(props.index-1)
                    && competition.color;
                return color;
            }));

            colors = colors?.filter(elemento => typeof elemento === 'string')

            setBorderColors(colors[0]);
        };

        getBorderColors();
    }, [props.teamId]);

    const handleError = (event) => {
        event.target.src = "https://www.fotmob.com/_next/static/media/team_fallback.3ae01170.png";
    };

    return (
        <Link to={"/team/" + (props.teamId)}>
            <div className="flex justify-between  px-4">
                <div className="flex gap-3 items-center basis-6/12">
                    <div className="font-medium text-sm text-end">{props.index}</div>
                    <div className="w-2 h-2 rounded-full border-4" style={{ borderColor: borderColors || "#cbd5e1" }}></div>
                    <img className="h-7 object-fit" onError={handleError} src={`https://images.fotmob.com/image_resources/logo/teamlogo/${props.teamId}.png`} alt="teamLogo" />
                    <div className="text-sm font-medium">{props.shortName}</div>
                </div>
                <div className="flex items-center basis-5/12 text-end">
                    <div className="text-sm text-[#6d6a7f] basis-4/12 lg:block lg:basis-2/12">{props.teamPlayed}</div>
                    <div className="text-sm text-[#6d6a7f] basis-4/12 hidden lg:block lg:basis-2/12">{props.teamWins}</div>
                    <div className="text-sm text-[#6d6a7f] basis-4/12 hidden lg:block lg:basis-2/12">{props.teamDraws}</div>
                    <div className="text-sm text-[#6d6a7f] basis-4/12 hidden lg:block lg:basis-2/12">{props.teamLose}</div>
                    <div className="text-sm text-[#6d6a7f] basis-4/12 lg:block lg:basis-2/12">{props.teamDR}</div>
                    <div className="text-sm font-medium basis-4/12 lg:block lg:basis-2/12">{props.teamPoints}</div>                
                </div>
            </div>
        </Link>
    );
}

export default StandingLine;
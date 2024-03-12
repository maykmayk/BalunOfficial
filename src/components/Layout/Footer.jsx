import { Link } from "react-router-dom"

function Footer(props) {
    return (
        <footer class={`bg-white rounded-lg shadow m-4 ${props.side && "md:ms-64"}`}>
            <div class="w-full p-4 md:flex md:items-center md:justify-between">
                <span class="text-sm text-gray-500 sm:text-center">Balun Experiment - Mayk
                </span>
                <ul class="flex gap-5 flex-wrap items-center text-sm font-medium text-gray-500 sm:mt-0">
                    <li>
                        <Link to="/league-list/" class="hover:underline">Leagues</Link>
                    </li>
                    <li>
                        <Link to="#" class="hover:underline">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link to="#" class="hover:underline">Licensing</Link>
                    </li>
                    <li>
                        <Link to="#" class="hover:underline">Contact</Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer
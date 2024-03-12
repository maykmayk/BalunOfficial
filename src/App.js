import { Routes, Route } from "react-router-dom"
import TeamDetail from "./pages/TeamDetail"
import Matches from "./pages/Matches"
import PlayerDetail from "./pages/PlayerDetails"
import MatchDetail from "./pages/MatchDetails"
import Leagues from "./pages/Leagues"
import LeagueList from "./pages/LeagueList"

function App() {
    return (
        <>
			<Routes>
				<Route path="/" exact element={<Matches />} />
				<Route path="/team/:id" exact element={<TeamDetail />} />
				<Route path="/player/:id" exact element={<PlayerDetail />} />
				<Route path="/league/:id" exact element={<Leagues />} />
				<Route path="/league-list/" exact element={<LeagueList />} />
				<Route path="/match-details/:id" exact element={<MatchDetail />} />
			</Routes>
        </>
    )
}

export default App
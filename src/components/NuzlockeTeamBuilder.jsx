import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import gymLeaderData from "../data/gymleaderdata.json"
import TypeGrid from "./TypeGrid"
import { fetchAllTypes } from "./FetchPokemon"
import Teamdisplay from "./Teamdisplay"


export default function NuzlockeTeamBuilder({ teamBuildFor }) {

	const leaders = gymLeaderData[teamBuildFor.region] || [];
	const [selectedLeaders, setSelectedLeaders] = useState([]);
	const [types, setTypes] = useState([]);

	useEffect(() => {
	fetchAllTypes()
		.then(data => setTypes(data))
		.catch(err => console.error("Failed to load types", err))
	}, [])

	const toggleLeader = idx => {
		setSelectedLeaders(prev =>
		prev.includes(idx)
			? prev.filter(i => i !== idx)
			: [...prev, idx]
		)
	}
    return (
        <div className="teambuilder">
            <div className="teambuilder-header">
                <div className="teambuilder-currentgame">
                    <img className="teambuilder-header-icon" src={teamBuildFor.src} alt={teamBuildFor.alt}/>
                    { teamBuildFor.alt }
                </div>
                <div className="teambuilder-monolocke">
                    Monolocke
                </div>
            </div>
            <div className="teambuilder-title">
                Current Team
            </div>
            <div className="teambuilder-row">
                <div>
                    <Teamdisplay />
                </div>
                <div>
                    Add
                </div>
                <div>
                    Box
                </div>
            </div>
            <div className="teambuilder-row">
                <div>
                    <div className="teambuilder-title">
                        Weakness
                    </div>
                    <div>
							<TypeGrid types={types} />
                    </div>
                </div>
                <div>
                    <div className="teambuilder-title">
                    Current badges / Max Level Cap: 
                    </div>
                    <div className="teambuilder-badge-grid">
                        {leaders.map((ldr, i) => (
                            <div
                                key={i}
                                className={`leader-card${selectedLeaders.includes(i) ? " selected" : ""}`}
                                onClick={() => toggleLeader(i)}
                            >
                                <div className="leader-name">{ldr.name}</div>
                                <div className="leader-cap">Lvl {ldr.levelcap}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div className="teambuilder-title">
                    Route log
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

NuzlockeTeamBuilder.propTypes = {
  selectedGame: PropTypes.shape({
    src:  PropTypes.string.isRequired,
    alt:  PropTypes.string.isRequired,
  }).isRequired
}
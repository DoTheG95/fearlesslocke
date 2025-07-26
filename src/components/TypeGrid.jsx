// src/components/TypeGrid.jsx
import React from "react"
import PropTypes from "prop-types"
import TypeCard from "./PokemonTypeCards"
import "../App.css"

export default function TypeGrid({
  types,
  selectedTypes = [],       // ← default to empty array
  onTypeClick   = () => {}  // ← default to no-op
}) {
  return (
    <div className="type-grid">
      {types.map(t=>(
        <TypeCard
          key={t.id}
          {...t}
          active={selectedTypes.includes(t.name)}
          onClick={()=>onTypeClick(t.name)}
        />
      ))}
    </div>
  )
}

TypeGrid.propTypes = {
  types:         PropTypes.array.isRequired,
  selectedTypes: PropTypes.array,
  onTypeClick:   PropTypes.func
}

import React, { useState, useEffect } from 'react';
import '../App.css';
import { fetchPokedex, fetchAllTypes } from '../components/FetchPokemon';
import TypeGrid from '../components/TypeGrid';
import DexSelector from '../components/DexSelector';
import SearchBar from '../components/SearchBar';
import PokemonGrid from '../components/PokemonGrid';

const API_BASE = process.env.REACT_APP_POKEMON_API_URL;

// Pokémon type colours for set headers
const TYPE_COLOURS = {
  normal:   '#A8A878', fire:     '#F08030', water:    '#6890F0',
  electric: '#F8D030', grass:    '#78C850', ice:      '#98D8D8',
  fighting: '#C03028', poison:   '#A040A0', ground:   '#E0C068',
  flying:   '#A890F0', psychic:  '#F85888', bug:      '#A8B820',
  rock:     '#B8A038', ghost:    '#705898', dragon:   '#7038F8',
  dark:     '#705848', steel:    '#B8B8D0', fairy:    '#EE99AC',
};

const ALL_TYPES = Object.keys(TYPE_COLOURS);

// ─────────────────────────────────────────────────────────────────────────────
// TeamSlot
// ─────────────────────────────────────────────────────────────────────────────
function TeamSlot({ pokemon, onRemove }) {
  return (
    <div style={styles.filledSlot} title={pokemon.name}>
      <img src={pokemon.sprite} alt={pokemon.name} style={styles.slotSprite} />
      <span style={styles.slotName}>{pokemon.name}</span>
      <button onClick={() => onRemove(pokemon.id)} style={styles.removeBtn} title="Remove">×</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TeamPanel  — one team's expanded view
// ─────────────────────────────────────────────────────────────────────────────
function TeamPanel({ team, activeTeamId, onSetActiveTeam, onRemove, onClear, onRename, onDelete, typeColour, collapsed, onToggle }) {
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(team.name);
  const isActive = team.id === activeTeamId;

  const commitRename = () => {
    const trimmed = draftName.trim();
    if (trimmed) onRename(team.id, trimmed);
    setEditing(false);
  };

  return (
    <div style={{ ...styles.teamPanel, borderColor: isActive ? typeColour : 'rgba(255,255,255,0.1)' }}>
      {/* Team row header */}
      <div style={{ ...styles.teamPanelHeader, cursor: 'pointer', marginBottom: collapsed ? 0 : '0.4rem' }} onClick={onToggle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
          {editing ? (
            <input
              autoFocus
              value={draftName}
              onChange={e => setDraftName(e.target.value)}
              onBlur={commitRename}
              onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setEditing(false); }}
              style={styles.nameInput}
              onClick={e => e.stopPropagation()}
            />
          ) : (
            <span
              style={{ ...styles.teamPanelName, color: isActive ? typeColour : '#ccc' }}
              onClick={e => { e.stopPropagation(); setEditing(true); }}
              title="Click to rename"
            >
              {team.name} <span style={styles.editHint}>✏</span>
            </span>
          )}
          <span style={styles.countBadge}>{team.members.length} Pokémon</span>
          <span style={{ ...styles.collapseIcon, color: typeColour }}>{collapsed ? '▶' : '▼'}</span>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
          <button
            onClick={() => onSetActiveTeam(isActive ? null : team.id)}
            style={{
              ...styles.selectBtn,
              background: isActive ? typeColour : 'transparent',
              borderColor: typeColour,
              color: isActive ? '#111' : typeColour,
            }}
          >
            {isActive ? '✓ Selected' : 'Select'}
          </button>
          <button onClick={() => onClear(team.id)} style={styles.clearBtn}>Clear</button>
          <button onClick={() => onDelete(team.id)} style={styles.deleteBtn} title="Delete team">🗑</button>
        </div>
      </div>

      {/* Members */}
      {!collapsed && team.members.length > 0 && (
        <div style={styles.slotsGrid}>
          {team.members.map(poke => (
            <TeamSlot key={poke.id} pokemon={poke} onRemove={id => onRemove(team.id, id)} />
          ))}
        </div>
      )}

      {!collapsed && team.members.length === 0 && (
        <p style={{ ...styles.emptyMsg, padding: '0.3rem 0' }}>No Pokémon yet — select this team and use <strong>+ Add</strong> on the grid.</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SetSection  — collapsible section for one type-set
// ─────────────────────────────────────────────────────────────────────────────
function SetSection({ set, activeTeamId, onSetActiveTeam, onRemoveMember, onClearTeam, onRenameTeam, onDeleteTeam, onAddTeamToSet, onDeleteSet, collapsed, onToggleSet, collapsedTeams, onToggleTeam, onExpandAllTeams, onCollapseAllTeams }) {
  const colour = TYPE_COLOURS[set.type] || '#e8b84b';
  const totalMembers = set.teams.reduce((n, t) => n + t.members.length, 0);

  return (
    <div style={{ ...styles.setSection, borderColor: colour }}>
      {/* Set header */}
      <div style={styles.setHeader} onClick={() => onToggleSet(set.id)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ ...styles.typeChip, background: colour }}>
            {set.type.charAt(0).toUpperCase() + set.type.slice(1)}
          </span>
          <span style={styles.setMeta}>{set.teams.length} teams · {totalMembers} Pokémon</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
          {!collapsed && (
            <>
              <button onClick={() => onExpandAllTeams(set.id)} style={styles.expandCollapseBtn}>Expand all</button>
              <button onClick={() => onCollapseAllTeams(set.id)} style={styles.expandCollapseBtn}>Collapse all</button>
            </>
          )}
          <button onClick={() => onAddTeamToSet(set.id)} style={{ ...styles.addTeamBtn, borderColor: colour, color: colour }}>
            + Add Team
          </button>
          <button onClick={() => onDeleteSet(set.id)} style={styles.deleteBtn} title="Delete set">🗑</button>
          <span style={{ ...styles.collapseIcon, color: colour }}>{collapsed ? '▶' : '▼'}</span>
        </div>
      </div>

      {/* Teams */}
      {!collapsed && (
        <div style={styles.teamsContainer}>
          {set.teams.length === 0 ? (
            <p style={styles.emptyMsg}>No teams yet — click <strong>+ Add Team</strong> above.</p>
          ) : (
            set.teams.map(team => (
              <TeamPanel
                key={team.id}
                team={team}
                activeTeamId={activeTeamId}
                onSetActiveTeam={onSetActiveTeam}
                onRemove={onRemoveMember}
                onClear={onClearTeam}
                onRename={onRenameTeam}
                onDelete={onDeleteTeam}
                typeColour={colour}
                collapsed={collapsedTeams.has(team.id)}
                onToggle={() => onToggleTeam(team.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SetsManager  — the full panel
// ─────────────────────────────────────────────────────────────────────────────
function SetsManager({ sets, isOpen, activeTeamId, onSetActiveTeam, onCreateSet, onDeleteSet, onAddTeamToSet, onDeleteTeam, onRemoveMember, onClearTeam, onRenameTeam }) {
  const [showTypePicker, setShowTypePicker] = useState(false);
  const [collapsedSets, setCollapsedSets] = useState(() => new Set(sets.map(s => s.id)));
  const [collapsedTeams, setCollapsedTeams] = useState(() => new Set(sets.flatMap(s => s.teams.map(t => t.id))));
  const usedTypes = sets.map(s => s.type);

  const allTeamIds = sets.flatMap(s => s.teams.map(t => t.id));

  const toggleSet = id => setCollapsedSets(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const toggleTeam = id => setCollapsedTeams(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const expandAllTeams = setId => {
    const teamIds = sets.find(s => s.id === setId)?.teams.map(t => t.id) || [];
    setCollapsedTeams(prev => { const next = new Set(prev); teamIds.forEach(id => next.delete(id)); return next; });
  };

  const collapseAllTeams = setId => {
    const teamIds = sets.find(s => s.id === setId)?.teams.map(t => t.id) || [];
    setCollapsedTeams(prev => { const next = new Set(prev); teamIds.forEach(id => next.add(id)); return next; });
  };

  const expandEverything = () => {
    setCollapsedSets(new Set());
    setCollapsedTeams(new Set());
  };

  const collapseEverything = () => {
    setCollapsedSets(new Set(sets.map(s => s.id)));
    setCollapsedTeams(new Set(allTeamIds));
  };

  // Collapse newly added teams by default
  const allTeamIdsKey = allTeamIds.join(',');
  const prevTeamIdsRef = React.useRef(new Set(allTeamIds));
  React.useEffect(() => {
    const prev = prevTeamIdsRef.current;
    allTeamIds.forEach(id => {
      if (!prev.has(id)) {
        setCollapsedTeams(ct => { const next = new Set(ct); next.add(id); return next; });
      }
    });
    prevTeamIdsRef.current = new Set(allTeamIds);
  }, [allTeamIdsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen) return null;

  return (
    <div style={styles.managerOverlay}>
      <div style={styles.managerBox}>
        {/* Top bar */}
        <div style={styles.managerTopBar}>
          <span style={styles.managerTitle}>⚔ Team Sets</span>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {sets.length > 0 && (
              <>
                <button onClick={expandEverything} style={styles.expandCollapseBtn}>Expand all</button>
                <button onClick={collapseEverything} style={styles.expandCollapseBtn}>Collapse all</button>
              </>
            )}
            <button onClick={() => setShowTypePicker(p => !p)} style={styles.newSetBtn}>
              {showTypePicker ? 'Cancel' : '+ New Set'}
            </button>
          </div>
        </div>

        {/* Type picker */}
        {showTypePicker && (
          <div style={styles.typePicker}>
            <p style={styles.typePickerLabel}>Choose a type for this set:</p>
            <div style={styles.typePickerGrid}>
              {ALL_TYPES.map(type => {
                const used = usedTypes.includes(type);
                const colour = TYPE_COLOURS[type];
                return (
                  <button
                    key={type}
                    disabled={used}
                    onClick={() => { onCreateSet(type); setShowTypePicker(false); }}
                    style={{
                      ...styles.typePickerBtn,
                      background: used ? 'rgba(255,255,255,0.04)' : `${colour}22`,
                      borderColor: used ? '#333' : colour,
                      color: used ? '#444' : colour,
                      cursor: used ? 'default' : 'pointer',
                    }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                    {used && <span style={{ fontSize: '0.65rem', marginLeft: '3px' }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Sets list */}
        {sets.length === 0 && !showTypePicker && (
          <p style={styles.emptyMsg}>No sets yet — click <strong>+ New Set</strong> to group your teams by type.</p>
        )}

        {sets.map(set => (
          <SetSection
            key={set.id}
            set={set}
            activeTeamId={activeTeamId}
            onSetActiveTeam={onSetActiveTeam}
            onRemoveMember={onRemoveMember}
            onClearTeam={onClearTeam}
            onRenameTeam={onRenameTeam}
            onDeleteTeam={onDeleteTeam}
            onAddTeamToSet={onAddTeamToSet}
            onDeleteSet={onDeleteSet}
            collapsed={collapsedSets.has(set.id)}
            onToggleSet={toggleSet}
            collapsedTeams={collapsedTeams}
            onToggleTeam={toggleTeam}
            onExpandAllTeams={expandAllTeams}
            onCollapseAllTeams={collapseAllTeams}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────
export default function Fearlesslocke() {
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDex, setSelectedDex] = useState('1');

  const [greyedPokemon, setGreyedPokemon] = useState(() => {
    try { return JSON.parse(localStorage.getItem('greyedPokemon')) || []; } catch { return []; }
  });
  const [monolocke, setMonolocke] = useState(false);

  // sets: [{ id, type, teams: [{ id, name, members: [{id, name, sprite}] }] }]
  const [sets, setSets] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fearlessSets')) || []; } catch { return []; }
  });
  const [setsOpen, setSetsOpen] = useState(false);
  const [activeTeamId, setActiveTeamId] = useState(null);

  useEffect(() => {
    try { localStorage.setItem('greyedPokemon', JSON.stringify(greyedPokemon)); } catch {}
  }, [greyedPokemon]);

  useEffect(() => {
    try { localStorage.setItem('fearlessSets', JSON.stringify(sets)); } catch {}
  }, [sets]);

  useEffect(() => {
    setLoading(true); setError(null);
    Promise.all([fetchPokedex(selectedDex), fetchAllTypes()])
      .then(([pokes, typeData]) => { setPokemonList(pokes); setTypes(typeData); })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedDex]);

  useEffect(() => {
    if (monolocke) setSelectedTypes(prev => prev.length > 1 ? [prev[0]] : prev);
  }, [monolocke]);

  // ── Helpers: walk all teams across all sets ────────────────────────────────
  const allTeams = sets.flatMap(s => s.teams);
  const activeTeam = allTeams.find(t => t.id === activeTeamId) || null;

  // ── Sets CRUD ──────────────────────────────────────────────────────────────
  const createSet = type => {
    const id = Date.now().toString();
    setSets(prev => [...prev, { id, type, teams: [] }]);
  };

  const deleteSet = setId => {
    setSets(prev => prev.filter(s => s.id !== setId));
    if (sets.find(s => s.id === setId)?.teams.some(t => t.id === activeTeamId)) {
      setActiveTeamId(null);
    }
  };

  const addTeamToSet = setId => {
    const id = Date.now().toString();
    setSets(prev => prev.map(s => {
      if (s.id !== setId) return s;
      return { ...s, teams: [...s.teams, { id, name: `Team ${s.teams.length + 1}`, members: [] }] };
    }));
    setActiveTeamId(id);
  };

  const deleteTeam = teamId => {
    setSets(prev => prev.map(s => ({ ...s, teams: s.teams.filter(t => t.id !== teamId) })));
    if (activeTeamId === teamId) setActiveTeamId(null);
  };

  const renameTeam = (teamId, name) => {
    setSets(prev => prev.map(s => ({
      ...s, teams: s.teams.map(t => t.id === teamId ? { ...t, name } : t)
    })));
  };

  const clearTeam = teamId => {
    const team = allTeams.find(t => t.id === teamId);
    if (team) {
      const memberIds = team.members.map(m => m.id);
      setGreyedPokemon(prev => prev.filter(id => !memberIds.includes(id)));
    }
    setSets(prev => prev.map(s => ({
      ...s, teams: s.teams.map(t => t.id === teamId ? { ...t, members: [] } : t)
    })));
  };

  function collectSpeciesNames(chain) {
    let names = [chain.species.name];
    chain.evolves_to.forEach(child => { names = names.concat(collectSpeciesNames(child)); });
    return names;
  }

  const fetchChainIds = async (pokemonId, pokemonName) => {
    let speciesNames = [];
    try {
      const sp = await fetch(`${API_BASE}pokemon-species/${pokemonName}`);
      if (!sp.ok) throw new Error();
      const spData = await sp.json();
      const ch = await fetch(spData.evolution_chain.url);
      if (!ch.ok) throw new Error();
      speciesNames = collectSpeciesNames((await ch.json()).chain);
    } catch {}
    return pokemonList.filter(p => speciesNames.includes(p.name)).map(p => p.id);
  };

  const removeMember = async (teamId, pokemonId) => {
    setSets(prev => prev.map(s => ({
      ...s, teams: s.teams.map(t =>
        t.id === teamId ? { ...t, members: t.members.filter(p => p.id !== pokemonId) } : t
      )
    })));
    const poke = pokemonList.find(p => p.id === pokemonId);
    if (!poke) return;
    const chainIds = await fetchChainIds(pokemonId, poke.name);
    setGreyedPokemon(prev => prev.filter(id => !chainIds.includes(id)));
  };

  const handleAddToTeam = async (pokemonId, pokemonName) => {
    if (!activeTeamId) return;
    const poke = pokemonList.find(p => p.id === pokemonId);
    if (!poke) return;

    setSets(prev => prev.map(s => ({
      ...s, teams: s.teams.map(t => {
        if (t.id !== activeTeamId) return t;
        if (t.members.some(m => m.id === pokemonId)) return t;
        return {
          ...t,
          members: [...t.members, {
            id: poke.id, name: poke.name,
            sprite: poke.sprite || poke.spriteUrl || poke.image
          }]
        };
      })
    })));

    const chainIds = await fetchChainIds(pokemonId, pokemonName);
    setGreyedPokemon(prev => Array.from(new Set([...prev, ...chainIds])));
  };

  const handleTypeClick = typeName => {
    setSelectedTypes(prev => {
      if (prev.includes(typeName)) return prev.filter(t => t !== typeName);
      if (monolocke) return [typeName];
      if (prev.length < 2) return [...prev, typeName];
      return [prev[1], typeName];
    });
  };

  const filteredList = pokemonList.filter(p =>
    p.name.toLowerCase().includes(filterText.toLowerCase()) &&
    selectedTypes.every(t => p.types.includes(t))
  );

  const totalTeams = sets.reduce((n, s) => n + s.teams.length, 0);
  const disabledIds = greyedPokemon;

  const activeTypeColour = activeTeam
    ? (TYPE_COLOURS[sets.find(s => s.teams.some(t => t.id === activeTeamId))?.type] || '#e8b84b')
    : '#e8b84b';

  if (loading) return <p>Loading Pokémon & types…</p>;
  if (error) return <p style={{ color: 'salmon' }}>Error: {error}</p>;

  return (
    <div className="App">
      <TypeGrid types={types} selectedTypes={selectedTypes} onTypeClick={handleTypeClick} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <DexSelector
          options={[
            { id: '1',  name: 'National' }, { id: '2',  name: 'Kanto'  },
            { id: '7',  name: 'Johto'    }, { id: '15', name: 'Hoenn'  },
            { id: '6',  name: 'Sinnoh'   }, { id: '9',  name: 'Unova'  },
            { id: '12', name: 'Kalos'    }, { id: '21', name: 'Alola'  },
            { id: '27', name: 'Galar'    }, { id: '31', name: 'Paldea' },
          ]}
          value={selectedDex}
          onChange={setSelectedDex}
        />

        <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <input type="checkbox" checked={monolocke} onChange={() => setMonolocke(!monolocke)} style={{ marginRight: '0.5rem' }} />
          Toggle Monolocke
        </label>

        <button
          onClick={() => setSetsOpen(o => !o)}
          style={{ ...styles.createTeamBtn, ...(setsOpen ? styles.createTeamBtnActive : {}) }}
        >
          {setsOpen ? '📋 Team Sets' : '⚔ Create Team'}
          {totalTeams > 0 && <span style={styles.teamBadge}>{totalTeams}</span>}
        </button>
      </div>

      <SetsManager
        sets={sets}
        isOpen={setsOpen}
        activeTeamId={activeTeamId}
        onSetActiveTeam={setActiveTeamId}
        onCreateSet={createSet}
        onDeleteSet={deleteSet}
        onAddTeamToSet={addTeamToSet}
        onDeleteTeam={deleteTeam}
        onRemoveMember={removeMember}
        onClearTeam={clearTeam}
        onRenameTeam={renameTeam}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0' }}>
        <SearchBar
          value={filterText}
          onChange={setFilterText}
          onResetFilters={() => { setFilterText(''); setSelectedTypes([]); }}
          onResetGreyed={() => setGreyedPokemon([])}
        />
      </div>

      {activeTeam && (
        <div style={{ ...styles.teamModeBar, borderColor: activeTypeColour, color: activeTypeColour }}>
          ✦ Adding to <strong>{activeTeam.name}</strong> — hit <strong>+ Add</strong> on any card
        </div>
      )}

      <PokemonGrid
        pokemonList={filteredList}
        greyedPokemon={greyedPokemon}
        onCardClick={() => {}}
        activeTeamId={activeTeamId}
        teamMemberIds={disabledIds}
        onAddToTeam={(id, name) => handleAddToTeam(id, name)}
        onRemoveFromTeam={(id, name) => removeMember(activeTeamId, id, name)}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const styles = {
  createTeamBtn: {
    padding: '0.45rem 1.1rem',
    borderRadius: '8px',
    border: '2px solid #e8b84b',
    background: 'transparent',
    color: '#e8b84b',
    fontWeight: 700,
    fontSize: '0.9rem',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s ease',
    letterSpacing: '0.03em',
  },
  createTeamBtnActive: {
    background: '#e8b84b',
    color: '#1a1a2e',
  },
  teamBadge: {
    position: 'absolute',
    top: '-8px', right: '-8px',
    background: '#e05252',
    color: '#fff',
    borderRadius: '50%',
    width: '18px', height: '18px',
    fontSize: '0.7rem', fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center',
  },

  // Manager
  managerOverlay: {
    width: '100%', display: 'flex', justifyContent: 'center',
    padding: '0.5rem 1rem', boxSizing: 'border-box',
  },
  managerBox: {
    width: '100%', maxWidth: '900px',
    background: 'rgba(255,255,255,0.03)',
    border: '2px solid rgba(232,184,75,0.4)',
    borderRadius: '14px',
    padding: '1rem 1.25rem',
    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
  },
  managerTopBar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '0.85rem',
  },
  managerTitle: {
    fontWeight: 800, fontSize: '1.05rem', color: '#e8b84b', letterSpacing: '0.05em',
  },
  newSetBtn: {
    padding: '0.3rem 0.9rem',
    borderRadius: '6px',
    border: '1px dashed rgba(232,184,75,0.6)',
    background: 'transparent',
    color: '#e8b84b',
    fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
  },

  // Type picker
  typePicker: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '0.75rem 1rem',
    marginBottom: '0.85rem',
  },
  typePickerLabel: {
    fontSize: '0.8rem', color: '#999', marginBottom: '0.5rem', textAlign: 'center',
  },
  typePickerGrid: {
    display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center',
  },
  typePickerBtn: {
    padding: '0.25rem 0.7rem',
    borderRadius: '5px',
    border: '1px solid',
    fontSize: '0.78rem', fontWeight: 700,
    transition: 'all 0.15s',
  },

  // Set section
  setSection: {
    border: '1px solid',
    borderRadius: '10px',
    marginBottom: '0.6rem',
    overflow: 'hidden',
  },
  setHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0.6rem 0.9rem',
    background: 'rgba(255,255,255,0.04)',
    cursor: 'pointer',
    userSelect: 'none',
  },
  typeChip: {
    padding: '0.15rem 0.6rem',
    borderRadius: '4px',
    fontSize: '0.78rem', fontWeight: 800,
    color: '#111',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  setMeta: {
    fontSize: '0.75rem', color: '#777',
  },
  addTeamBtn: {
    padding: '0.2rem 0.65rem',
    borderRadius: '5px',
    border: '1px solid',
    background: 'transparent',
    fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
  },
  collapseIcon: {
    fontSize: '0.7rem', marginLeft: '0.25rem',
  },
  teamsContainer: {
    padding: '0.5rem 0.75rem 0.75rem',
    display: 'flex', flexDirection: 'column', gap: '0.5rem',
  },

  // Team panel
  teamPanel: {
    border: '1px solid',
    borderRadius: '8px',
    padding: '0.5rem 0.75rem',
    background: 'rgba(255,255,255,0.02)',
    transition: 'border-color 0.15s',
  },
  teamPanelHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '0.4rem',
  },
  teamPanelName: {
    fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
  },
  editHint: {
    fontSize: '0.65rem', opacity: 0.4, marginLeft: '3px',
  },
  nameInput: {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid #e8b84b',
    borderRadius: '5px',
    color: '#e8b84b', fontWeight: 700, fontSize: '0.9rem',
    padding: '0.1rem 0.4rem', outline: 'none',
  },
  countBadge: { fontSize: '0.7rem', color: '#666' },

  selectBtn: {
    padding: '0.2rem 0.65rem',
    borderRadius: '5px',
    border: '1px solid',
    fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
    transition: 'all 0.15s',
  },
  expandCollapseBtn: {
    background: 'none',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#999',
    borderRadius: '5px',
    padding: '0.2rem 0.55rem',
    fontSize: '0.72rem',
    cursor: 'pointer',
    fontWeight: 600,
  },
  clearBtn: {
    background: 'none', border: '1px solid #e05252', color: '#e05252',
    borderRadius: '5px', padding: '0.2rem 0.55rem',
    fontSize: '0.72rem', cursor: 'pointer', fontWeight: 600,
  },
  deleteBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    fontSize: '0.85rem', opacity: 0.5, padding: '0 2px',
  },

  // Slots
  slotsGrid: {
    display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem',
  },
  filledSlot: {
    border: '2px solid rgba(232,184,75,0.5)',
    borderRadius: '8px', width: '72px',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    position: 'relative', background: 'rgba(232,184,75,0.06)',
    padding: '0.2rem 0.1rem',
  },
  slotSprite: { width: '48px', height: '48px', imageRendering: 'pixelated' },
  slotName: {
    fontSize: '0.55rem', color: '#ddd',
    textTransform: 'capitalize', textAlign: 'center',
  },
  removeBtn: {
    position: 'absolute', top: '1px', right: '3px',
    background: 'none', border: 'none',
    color: '#e05252', fontWeight: 700, fontSize: '0.8rem',
    cursor: 'pointer', padding: 0, lineHeight: 1,
  },

  emptyMsg: {
    textAlign: 'center', color: '#555', fontSize: '0.82rem', padding: '0.5rem 0',
  },

  teamModeBar: {
    textAlign: 'center', fontSize: '0.82rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid',
    borderRadius: '6px',
    padding: '0.4rem', marginBottom: '0.5rem',
    letterSpacing: '0.02em',
    maxWidth: '600px', margin: '0 auto 0.5rem',
  },
};
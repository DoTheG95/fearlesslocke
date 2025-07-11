import React,  { useEffect } from 'react';

export default function Rules() {

   useEffect(() => {
      const loginbutton = document.getElementById('nav-rules')
      if (loginbutton) loginbutton.classList.add('hidden')
      return () => {
      if (loginbutton) loginbutton.classList.remove('hidden')
      }
   }, []);

  return (
    <div class="App">
         <header className="App-header"> Welcome to the Fearless Nuzlocke Challenge</header>
         <p>
            This challenge is inspired by the fan-favourite rule set <em>Nuzlocke</em><br />
            with a spin from League of Legends' <em>Fearless Draft</em> system.
         </p>

         <section>
            <h2>Core Nuzlocke Rules</h2>
            <ol>
            <li><strong>Type Lock:</strong> At the start of each run, choose one Pokémon type. Only Pokémon of that type may be caught or used.</li>
            <li><strong>First Encounter:</strong> You may catch only the first wild Pokémon of your chosen type encountered in each area.</li>
            <li><strong>Faint = Release:</strong> If a Pokémon faints, it is considered dead and must be permanently boxed or released.</li>
            <li><strong>Nickname:</strong> Nickname every Pokémon to strengthen your bond and make losses more meaningful.</li>
            <li><strong>No Healing Items in Battle:</strong> Healing items (Potions, Berries, etc.) may not be used during battles. Only Pokémon Center healing is allowed between fights.</li>
            <li><strong>No Duplicates:</strong> Once you catch a species, you cannot catch another of the same species in that run.</li>
            <li><strong>No Over-Leveling:</strong> Your Pokémon may not exceed the level of the next Gym Leader's (or Elite Four member's) highest-level Pokémon.</li>
            </ol>
         </section>

         <section>
            <h2>Fearless Draft Additions</h2>
            <p>
            Inspired by League of Legends' Fearless Draft, you cannot reuse any Pokémon across runs—even in different generations.
            The goal is to complete a Monotype run for each type using every available Pokémon in the National Pokédex.
            </p>
            <ol>
            <li><strong>All-Type Completion:</strong> To beat the challenge, complete a Monotype run for <em>every</em> type in each generation you play.</li>
            <li><strong>No Repeat Usage:</strong> Any Pokémon used in one run is permanently ineligible for future runs, including its evolutions.</li>
            <li><strong>Generation Pool Limit:</strong> You may only use Pokémon available in that game's Pokédex (e.g., 151 species in Gen I).</li>
            <li><strong>Sequential Runs:</strong> Start and finish each type run (to Champion) before moving on to the next.</li>
            <li><strong>Exceptions:</strong> In cases of limited typing (e.g., Gen I and II), you may reuse a Pokémon if no alternative exists. Document any exceptions clearly.</li>
            </ol>
         </section>
      </div>
  );
}

import React, { useState, useEffect } from 'react';
import Main from './Main';
import Welcome from './Welcome';
import { fetchPokemons, searchPokemon } from '../utils/api';


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const pokemonData = await fetchPokemons();
        setPokemons(pokemonData);
        setFilteredPokemons(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    getPokemons();
  }, []);

  const handleSearch = (term) => {
    if (term) {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPokemons(filtered);
    } else {
      setFilteredPokemons(pokemons);
    }
  };

  function handleClear(){
    setFilteredPokemons(pokemons);
  }
  return (
    <div className="page">
      <Main onSearch={handleSearch} onClear={handleClear}/>
      <Welcome pokemons={filteredPokemons} />
    </div>
  );
}

export default App;
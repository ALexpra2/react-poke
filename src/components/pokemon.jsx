import { useEffect, useState } from 'react';
import './pokemon.css';
import '../index.css';

function GetPokemon() {
  // Variables de estado
  const [nombre, setNombre] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPokemon = async (name) => {
    if (!name.trim()) {  // Evita llamadas vacías a la API
      setPokemon(null);
      setError(null);
      setLoading(false);
      return;
    }

   
    setError(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) {
        throw new Error("Pokemon no encontrado");
      }
      const data = await response.json();
      setPokemon(data);
      setError(null);
    } catch (error) {
      setPokemon(null);  // Genero los valores de pokemon, loading y error para luego usarlos en el return
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar la solicitud cada vez que cambia nombre
  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {   // Para que no se cargue en cada letra
      getPokemon(nombre);
    }, 1000);
    return () => clearTimeout(delay);
  }, [nombre]); // Cuando cambia el nombre (variable de estado) vuelve a renderizar la función

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='nombre'>Introduce el nombre del pokemon</label>
        <input
          type='text'
          id='nombre'
          placeholder='Nombre'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </form>

      {loading && <div className='loader-containerr'><span class="loader"></span></div>>}

      {error && <h2 className='error'>Pokemon no encontrado</h2>}

      {pokemon && (
        <div className='pokemonCard'>
          <h1>{pokemon.name}</h1>
          <img src={pokemon?.sprites?.front_default} alt='Imagen del pokemon ' />
          <h2>Altura: {pokemon.height} </h2>
          <h2>Peso: {pokemon.weight} </h2>
        </div>
      )}
    </>
  );
}

/*
¿Por qué ponemos {pokemon && ...}?
React no puede mostrar un objeto anidado como el de la API por lo que tengo que verificar que exista antes de renderizarlo.
Si tengo más objetos anidados, por ejemplo sprites, le ponemos ? y ya validamos esos objetos.

Si error es true, se renderiza el <h2>. Si no, nos daría un error de "no reading property of null" en la consola.
*/

export default GetPokemon;
import { useEffect, useState } from 'react';
import './pokemon.css';
import '../index.css'

function GetPokemon () {
    const [nombre, setNombre] = useState('')
    const [pokemon, setPokemon] = useState(null)
    const [error, setError] = useState('')
    
    //cargar la solicitud cada vez que cambia nombre
    useEffect(()=>{
      if(nombre) {
        getPokemon(nombre)
      }
    }, [nombre])
  
    const getPokemon = async (name) => {
      //Eliminamos el mensaje de error al encontrar un pokemon
      setError('');
      try {
        const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${name}`)
        if(!response.ok){
          throw new Error("Pokemon no encontrado");
        }
        const data = await response.json()
        setPokemon(data)
      } catch (error) {
        setPokemon(null)            //genero los valores de pokemon y error para luego usarlos en el return
        setError(error.message)
      }
    }
  
    const handleSubmit = e => {
      e.preventDefault();
      getPokemon(nombre)
    }
  
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
        {error && <h2 className='error'>Pokemon no encontrado</h2>}
        
        {pokemon && (
          <div className='pokemonCard'>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt='Imagen del pokemon '/>          
              <h2>Altura: {pokemon.height} </h2>
              <h2>Peso: {pokemon.weight} </h2>
          </div>
         )}
  
      </>
    )
  
  };

/*{pokemon && .....   Si pokemon tiene un valor se renderiza el div con la información del Pokémon.*/

//Si error es true, se renderiza el <h2>.
  
export default GetPokemon
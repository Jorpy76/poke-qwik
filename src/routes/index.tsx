import { component$, useSignal, $ } from '@builder.io/qwik';
import { Link, type DocumentHead, useNavigate } from '@builder.io/qwik-city';

import { PokemonImage } from '../components/pokemons/pokemon-image';

export default component$(() => {
  const pokemonId = useSignal(1); // useSignal se usa para primitivos, booleans, numbers, strings useStore(); // useStore se usa para objetos
  const showBackImage = useSignal(false);
  const isVisibleImage = useSignal(true);
  const nav = useNavigate();

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0) return;
    pokemonId.value += value;
  });

  const goToPokemon = $((id: number) => {
    nav(`/pokemon/${pokemonId.value}/`)
  });

  return (
    <>
      <h1 class='mb-4'>Hola Qwik</h1>
      <h3>Aprendiendo Qwik con Fernando Herrera</h3>
      <span class='mt-4 text-2xl'>Buscador de pokemones</span>
      <span class='text-6xl'>{pokemonId}</span>

      {/*<Link href={`/pokemon/${pokemonId.value}/`}>
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isVisibleImage.value}
        />
      </Link>*/}

      <div onClick$={()=>{
        goToPokemon(pokemonId.value)
      }}>
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isVisibleImage.value}
        />
        
      </div>

      <div class='mt-4'>
        <button
          type='button'
          onClick$={() => changePokemonId(-1)}
          class='btn btn-primary mr-4'
        >
          Anterior
        </button>
        <button
          type='button'
          onClick$={() => changePokemonId(1)}
          class='btn btn-primary mr-4'
        >
          Siguiente
        </button>
        <button
          type='button'
          onClick$={() => (showBackImage.value = !showBackImage.value)}
          class='btn btn-primary mr-4'
        >
          Voltear
        </button>
        <button
          type='button'
          onClick$={() => (isVisibleImage.value = !isVisibleImage.value)}
          class='btn btn-primary mr-4'
        >
          Revelar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Pokeqwik',
  meta: [
    {
      name: 'description',
      content: 'Primera App con Qwik y Tailwind',
    },
  ],
};

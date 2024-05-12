import { component$, useSignal, $, useContext } from '@builder.io/qwik';
import { Link, type DocumentHead, useNavigate } from '@builder.io/qwik-city';

import { PokemonImage } from '../components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export default component$(() => {
	const nav = useNavigate();

	const pokemonGame = useContext(PokemonGameContext);

	// const pokemonId = useSignal(1); // useSignal se usa para primitivos, booleans, numbers, strings useStore(); // useStore se usa para objetos
	// const showBackImage = useSignal(false);
	// const isVisibleImage = useSignal(true);

	const changePokemonId = $((value: number) => {
		if (pokemonGame.pokemonId + value <= 0) return;
		pokemonGame.pokemonId += value;
	});

	const goToPokemon = $((id: number) => {
		nav(`/pokemon/${id}/`);
	});

	return (
		<>
			<h1 class='mb-4'>Hola Qwik</h1>
			<h3>Aprendiendo Qwik con Fernando Herrera</h3>
			<span class='mt-4 text-2xl'>Buscador de pokemones</span>
			<span class='text-6xl'>{pokemonGame.pokemonId}</span>

			{/*<Link href={`/pokemon/${pokemonId.value}/`}>
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isVisibleImage.value}
        />
      </Link>*/}

			<div
				onClick$={() => {
					goToPokemon(pokemonGame.pokemonId);
				}}
			>
				<PokemonImage
					id={pokemonGame.pokemonId}
					backImage={pokemonGame.showBackImage}
					isVisible={pokemonGame.isPokemonVisible}
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
					onClick$={() =>
						(pokemonGame.showBackImage = !pokemonGame.showBackImage)
					}
					class='btn btn-primary mr-4'
				>
					Voltear
				</button>
				<button
					type='button'
					onClick$={() =>
						(pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible)
					}
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

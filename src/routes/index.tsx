import { component$, $ } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { usePokemonGame } from '~/hooks/use-pokemon-game';
import { PokemonImage } from '../components/pokemons/pokemon-image';

export default component$(() => {
	const nav = useNavigate();
	const {
		isPokemonVisible,
		nextPokemon,
		pokemonId,
		previousPokemon,
		showBackImage,
		toggleFromBack,
		toggleVisisble,
	} = usePokemonGame();

	const goToPokemon = $((id: number) => {
		nav(`/pokemon/${id}/`);
	});

	return (
		<>
			<h1 class='mb-4'>Hola Qwik</h1>
			<h3>Aprendiendo Qwik con Fernando Herrera</h3>
			<span class='mt-4 text-2xl'>Buscador de pokemones</span>
			<span class='text-6xl'>{pokemonId}</span>

			<div
				onClick$={() => {
					goToPokemon(pokemonId.value);
				}}
			>
				<PokemonImage
					id={pokemonId.value}
					backImage={showBackImage.value}
					isVisible={isPokemonVisible.value}
				/>
			</div>

			<div class='mt-4'>
				<button
					type='button'
					onClick$={previousPokemon}
					class='btn btn-primary mr-4'
				>
					Anterior
				</button>
				<button
					type='button'
					onClick$={nextPokemon}
					class='btn btn-primary mr-4'
				>
					Siguiente
				</button>
				<button
					type='button'
					onClick$={toggleFromBack}
					class='btn btn-primary mr-4'
				>
					Voltear
				</button>
				<button
					type='button'
					onClick$={toggleVisisble}
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

import { component$, useComputed$ } from '@builder.io/qwik';
import {
	type DocumentHead,
	Link,
	routeLoader$,
	useLocation,
} from '@builder.io/qwik-city';

import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
import { getSmallPokemons } from '~/helpers/get-pokemons';
import type { SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(
	async ({ pathname, redirect, query }) => {
		const offset = Number(query.get('offset')) || 0;
		if (offset < 0 || Number.isNaN(offset)) throw redirect(301, pathname);

		return getSmallPokemons(offset);

		// const resp = await fetch(
		// 	`https://pokeapi.co/api/v1/pokemon?limit=10&offset=${offset}`,
		// );
		// const data = (await resp.json()) as PokemonListResponse;
		// return data.results;
	},
);

export default component$(() => {
	const pokemons = usePokemonList();
	const location = useLocation();

	const currentOffset = useComputed$<number>(() => {
		const offsetString = new URLSearchParams(location.url.search);
		return Number(offsetString.get('offset')) || 0;
	});

	return (
		<>
			<div class='flex flex-col'>
				<span class=' my-5 text-5xl'>Status</span>
				<span>Offset: {currentOffset}</span>
				<span>
					Está cargando la página: {location.isNavigating ? 'Si' : 'No'}
				</span>
			</div>

			<div class='mt-10'>
				<Link
					href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
					class='btn btn-primary mr-2'
				>
					Anteriores
				</Link>

				<Link
					href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
					class='btn btn-primary mr-2'
				>
					Siguientes
				</Link>
			</div>

			<div class='grid grid-cols-6 mt-5'>
				{pokemons.value.map(({ name, id }) => (
					<div
						key={name}
						class='m-5 flex flex-col justify center items-center'
					>
						<PokemonImage id={id} />
						<span class='capitalize'>{name}</span>
					</div>
				))}
			</div>

			<Modal>
				<div q:slot='title'>Nombre del Pokemon</div>
				<span>Hola Mundo</span>
				<PokemonImage id='1' />

			</Modal>
		</>
	);
});

export const head: DocumentHead = {
	title: 'SRR List',
	meta: [
		{
			name: 'description',
			content: 'Qwik site description',
		},
	],
};

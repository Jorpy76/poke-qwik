import { component$, useComputed$ } from '@builder.io/qwik';
import {
	type DocumentHead,
	Link,
	routeLoader$,
	useLocation,
	type RequestHandler,
} from '@builder.io/qwik-city';
import type { PokemonListResponse, BasicPokemonInfo } from '~/interfaces';

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(
	async ({ pathname, redirect, query }) => {
		const offset = Number(query.get('offset')) || 0;
		if (offset < 0) throw redirect(301, pathname);
		const resp = await fetch(
			`https://pokeapi.co/api/v1/pokemon?limit=10&offset=${offset}`,
		);
		const data = (await resp.json()) as PokemonListResponse;
		return data.results;
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
				<span>Está cargando la página: xxxx</span>
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
				{pokemons.value.map(pokemon => (
					<div
						key={pokemon.name}
						class='m-5 flex flex-col justify center items-center'
					>
						<span class='capitalize'>{pokemon.name}</span>
					</div>
				))}
			</div>
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

import { component$, useComputed$ } from '@builder.io/qwik';
import {
	type DocumentHead,
	Link,
	routeLoader$,
	useLocation,
} from '@builder.io/qwik-city';
import type { PokemonListResponse, BasicPokemonInfo } from '~/interfaces';

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(async () => {
	const resp = await fetch(
		'https://pokeapi.co/api/v2/pokemon?limit=10&offset=20',
	);
	const data = (await resp.json()) as PokemonListResponse;

	console.log(data);
	return data.results;
});

export default component$(() => {
	const pokemons = usePokemonList();

	const location = useLocation();

	//console.log(location);
	//console.log(location.url.searchParams.get('offset'));

	const currentOffset = useComputed$<number>(() => {

		//const offsetString = location.url.searchParams.get('offset');
		const offsetString = new URLSearchParams(location.url.search)
		return (Number(offsetString.get('offset')) || 0)

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
					href={'/pokemons/list-ssr/?offset=10'}
					class='btn btn-primary mr-2'
				>
					Anteriores
				</Link>

				<Link
					href={'/pokemons/list-ssr/?offset=20'}
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

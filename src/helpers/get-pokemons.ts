import type { PokemonListResponse, SmallPokemon } from '../interfaces';

export const getSmallPokemons = async (
	offset = 0,
	limit = 10,
): Promise<SmallPokemon[]> => {
	const resp = await fetch(
		`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
	);
	const data = (await resp.json()) as PokemonListResponse;

	return data.results.map(({ name, url }) => {
		const segments = url.split('/');
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const id = segments.at(-2)!;

		return { id, name };
	});
};

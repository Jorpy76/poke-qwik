import { createContextId } from '@builder.io/qwik';
import { SmallPokemon } from '~/interfaces';

export interface PokemonListState {
	currentPage: number;
	isLoading: boolean;
	pokemons: SmallPokemon[];
}

// Contexto = PokemonListContext
// id => pokemon.list-context (id)

export const PokemonListContext = createContextId<PokemonListState>(
	'pokemon.list-context',
);

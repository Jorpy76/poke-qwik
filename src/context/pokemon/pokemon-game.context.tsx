import { createContextId } from '@builder.io/qwik';

export interface PokemonGameState {
	isPokemonVisible: boolean;
	pokemonId: number;
	showBackImage: boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>(
	'pokemon.game-context',
);

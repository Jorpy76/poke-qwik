import {
	Slot,
	component$,
	useContextProvider,
	useStore,
	useVisibleTask$,
  useTask$,
} from '@builder.io/qwik';

import {
	type PokemonListState,
	PokemonListContext,
} from './pokemont-list.context';
import {
	type PokemonGameState,
	PokemonGameContext,
} from './pokemon-game.context';

export const PokemonProvider = component$(() => {
	const pokemonGame = useStore<PokemonGameState>({
		isPokemonVisible: true,
		pokemonId: 4,
		showBackImage: false,
	});

	const pokemonList = useStore<PokemonListState>({
		currentPage: 1,
		isLoading: false,
		pokemons: [],
	});

	useContextProvider(PokemonListContext, pokemonList);
	useContextProvider(PokemonGameContext, pokemonGame);

	useVisibleTask$(() => {
		//Solo se ejecuta del lado del cliente. Los task son ejecutados de forma secuencial
		//NOTE: leer del local storage

		if (localStorage.getItem('pokemon-game')) {
      console.log(localStorage.getItem('pokemon-game'));
      
			const {
        isPokemonVisible = true,
        pokemonId = 4,
        showBackImage = false,
      }  = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;

      pokemonGame.isPokemonVisible = isPokemonVisible;
      pokemonGame.pokemonId = pokemonId;
      pokemonGame.showBackImage = showBackImage;
		}
	});

	useVisibleTask$(({ track }) => {
		//Solo se ejecuta del lado del cliente

		track(() => [
			pokemonGame.isPokemonVisible,
			pokemonGame.pokemonId,
			pokemonGame.showBackImage,
		]);

		localStorage.setItem('pokemonGame', JSON.stringify(pokemonGame));
	});

	return <Slot />;
});

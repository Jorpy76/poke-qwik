import { component$ } from '@builder.io/qwik';

interface Props {
	id: number;
}

export const PokemonImage = component$((props: Props) => {
	return (
		<img
			src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
			alt='Pokemon Sprite'
			width='200'
			height='200'
		/>
	);
});

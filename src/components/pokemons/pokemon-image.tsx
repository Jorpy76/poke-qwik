import { component$ } from '@builder.io/qwik';

interface Props {
	id: number;
	size?: number;
}

export const PokemonImage = component$(({id, size=200 }: Props) => {
	return (
		<img
			src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
			alt='Pokemon Sprite'
			style= {{ width: `${size}px`, height: `${size}px` }}
		/>
	);
});

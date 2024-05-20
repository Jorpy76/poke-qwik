import {
	component$,
	useComputed$,
	useSignal,
	useTask$,
} from '@builder.io/qwik';

interface Props {
	id: number | string;
	size?: number;
	backImage?: boolean;
	isVisible?: boolean;
}

export const PokemonImage = component$(
	({ id, size = 200, backImage = false, isVisible = true }: Props) => {
		const imageLoaded = useSignal(false);
		const imageSize = 200;

		useTask$(({ track }) => {
			// useTask$ se utiliza para disparar efectos secundarios. track es una función que se ejecuta cuando cambia un valor.
			track(() => id);
			imageLoaded.value = false;
		});

		const imageUrl = useComputed$(() => {
			return backImage
				? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
				: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
		});

		return (
			<div
				class='flex items-center justify-center'
				style={{
					width: `${imageSize}px`,
					height: `${imageSize}px`,
				}}
			>
				{!imageLoaded.value }
				<img
					src={imageUrl.value}
					alt='Pokemon Sprite'
					style={{
						width: '200px',

						height: '200px',
					}}
					onLoad$={() => {
						// setTimeout(() => {

						imageLoaded.value = true;

						// }, 1000);
					}}
					class={[
						{
							'brightness-0': !isVisible,
						},

						'transition-all',
					]}
					width={imageSize}
					height={size}
				/>
			</div>
		);
	},
);

import { component$, useSignal, useTask$ } from '@builder.io/qwik';

interface Props {
	id: number;
	size?: number;
	backImage: boolean;
	isVisible?: boolean;
}

export const PokemonImage = component$(
	({ id, size = 200, backImage = false, isVisible = false }: Props) => {
		const imageLoaded = useSignal(false);

		useTask$(({ track }) => {
			// useTask$ se utiliza para disparar efectos secundarios. track es una función que se ejecuta cuando cambia un valor.
			track(() => id);
			imageLoaded.value = false;
		});

		return (
			<div
				class='flex items-center justify-center'
				style={{ width: `${size}px`, height: `${size}px` }}
			>
				{!imageLoaded.value && <span>Cargando...</span>}
				<img
					src={
						backImage
							? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
							: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
					}
					alt='Pokemon Sprite'
					style={{ width: `${size}px`, height: `${size}px` }}
					onLoad$={() => {
						// setTimeout(() => {
						imageLoaded.value = true;
						// }, 1000);
					}}
          class={[{
            'hidden': !imageLoaded.value,
            'brightness-0': isVisible
          }, 'transition-all']}
				/>
			</div>
		);
	},
);

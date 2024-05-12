import { component$ } from '@builder.io/qwik';
import { useCounter } from '~/hooks/use-counter';

export default component$(() => {

  const {counter, increment, decrease} = useCounter(0);

	return (
		<>
			<span class='text-2xl'>Counter</span>
			<span class='text-7xl'>{counter.value}</span>

			<div class='mt-6'>
				<button onClick$= { decrease } class='btn btn-primary mr-6'> -1 </button>
				<button onClick$= { increment } class='btn btn-primary'> +1 </button>
			</div>
		</>
	);
});

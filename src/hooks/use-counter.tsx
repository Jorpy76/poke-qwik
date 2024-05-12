import {$, useSignal, useComputed$ } from '@builder.io/qwik';

export const useCounter = (initialValue: number) => {
	const counter = useSignal(initialValue);

	const increment = $(() => {
		counter.value++
	});

	const decrease = $(() => {
		counter.value--
	});
   return {
    counter: useComputed$(() => counter.value),
    increment:increment,
    decrease:decrease
  }

  
};

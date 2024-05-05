import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <h1>Hola desde SSR</h1>
    </>
  );
});

export const head: DocumentHead = {
  title: 'SRR List',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};

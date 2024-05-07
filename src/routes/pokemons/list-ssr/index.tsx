import { component$ } from '@builder.io/qwik';
import  { type DocumentHead, Link, routeLoader$ } from '@builder.io/qwik-city';

export const usePokemonList = routeLoader$(async () => {

  const resp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=10');
  const data = await resp.json();

  console.log(data)
  return data
  
})

export default component$(() => {

  const pokemonResp = usePokemonList();

  return (
    <>
    <div class='flex flex-col'>
      <span class=' my-5 text-5xl'>Status</span>
      <span>Págima actual: xxxx</span>
      <span>Está cargando la página: xxxx</span>
    </div>

    <div class='mt-10'>
      <Link class='btn btn-primary mr-2'>
      Anteriores
      </Link>
      <Link class='btn btn-primary mr-2'>
      Siguientes
      </Link>
    </div>

    <div class='grid grid-cols-6 mt-5'>
      <span class='m-5 flex flex-col justify center items-center'>Pokemon</span>
      <span class='m-5 flex flex-col justify center items-center'>Pokemon</span>
      <span class='m-5 flex flex-col justify center items-center'>Pokemon</span>
      <span class='m-5 flex flex-col justify center items-center'>Pokemon</span>
      <span class='m-5 flex flex-col justify center items-center'>Pokemon</span>
      <span class='m-5 flex flex-col justify center items-center'>Pokemon</span>
      <span class='m-5 flex flex-col justify center items-center'>Pokemon</span>
    </div>

    <div>
      {JSON.stringify(pokemonResp.value)}
    </div>
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

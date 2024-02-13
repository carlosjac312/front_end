import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";

type Character = {
    name:string,
    height:string,
    mass:string,
    gender:string,
    birth_year:string
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Character>) => {
    try {
      const url = new URL(_req.url);
      const name = url.searchParams.get("name") || "Luke";
      const persona = await Axios.get(
        `https://swapi.dev/api/people?search=${name}`,
      );
      return ctx.render(persona.data.results[0]);
    } catch (error) {
      throw new Error("La Api va mal o el numero de pagina no existe");
    }
  },
};

const Page = (props: PageProps<Character>) => {
  const name = props.data.name;
  const height = props.data.height;
  const mass  = props.data.mass;
  const gender = props.data.gender;
  const birth_year = props.data.birth_year;
  return (
    <div>
      <h1>Nombre: {name}</h1>
      <h2>Altura: {height}</h2>
      <h2>Peso: {mass}</h2>
      <h2>Genero: {gender}</h2>
      <h2>Año de nacimiento: {birth_year}</h2>
    </div>
  );
};

export default Page;

import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";

type Naves = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
};

type Data = {
  pagina: string;
  lista: Naves[];
};

//ir de pagina en pagina
//https://rickandmortyapi.com/api/character?page=2
export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    try {
      const url = new URL(_req.url);
      const page = url.searchParams.get("page") || "1";
      const spaceships = await Axios.get(
        `https://swapi.dev/api/starships?page=${page}`,
      );
      return ctx.render({ lista: spaceships.data.results, pagina: page });
    } catch (error) {
      throw new Error("La Api va mal o el numero de pagina no existe");
    }
  },
};

const Page = (props: PageProps<Data>) => {
  const { lista, pagina } = props.data;
  return (
    <div>
      <h1>Naves de StarWars</h1>
      <ul>
        {lista.map((ship) => {
          return (
            <div>
              <h2>{ship.name}</h2>
              <p>Modelo: {ship.model}</p>
              <p>Manufacture: {ship.manufacturer}</p>
              <p>Costo en creditos: {ship.cost_in_credits}</p>
            </div>
          );
        })}
      </ul>
        {parseInt(pagina) > 1 && (
          <a href={`/starships?page=${parseInt(pagina) - 1}`}>Previous</a>
        )}&nbsp; | &nbsp;
        <form method={"get"} target={"/starships"}>
          <input name={"page"}></input>
        </form>
        |
        {parseInt(pagina) < 4 && (
          <a href={`/starships?page=${parseInt(pagina) + 1}`}>Next</a>
        )}
    </div>
  );
};

export default Page;

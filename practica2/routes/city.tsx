import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import City from "../components/Ciudad.tsx";

type City = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  population: number;
  is_capital: boolean;
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, City, null>) => {
    const url = new URL(_req.url);
    const name = url.searchParams.get("name");
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) {
      return new Response("Error - NINJA API KEY NOT FOUND", { status: 500 });
    }
    const urlNinja = "https://api.api-ninjas.com/v1/city?limit=10&name=" + name;
    try {
      if(!name) return ctx.render(undefined);
      const response = await axios.get<City[]>(urlNinja, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      });
      if(name){
        if (response.data.length === 0) {
          return new Response("City not found", { status: 404 });
        }
      }
      return ctx.render(response.data[0]);
    } catch (error) {
      console.error(error);
      return new Response("Error", { status: 500 });
    }
  },
};

const Page = (props: PageProps<City>) => {
    const ciudad = props.data;
    if(!ciudad){
        return (
            <div class="whiteBack">
              <h2 class="p1">Buscar Ciudad</h2>
              <form method={"get"} action={"/city"}>
                  <input name={"name"} class="preetySearch"></input>
                  <button type="submit" class="primary">Search</button>
                </form>
                <a href="/">Volver al indice</a>
            </div>
          );
    }
    else {
        return <City name={ciudad.name} latitude={ciudad.latitude} longitude={ciudad.longitude} country={ciudad.country} population={ciudad.population} is_capital={ciudad.is_capital}></City>;
    }
};

export default Page;
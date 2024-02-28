import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import Dog from "../components/Perro.tsx";

type Dog = {
  name: string;
  max_height_male: number;
  max_height_female: number;
  max_weight_male: number;
  max_weight_female: number;
  good_with_children: number;
  good_with_other_dogs: number;
  good_with_strangers: number;
  image_link: string;
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Dog >) => {
    const url = new URL(_req.url);
    const name = url.searchParams.get("name");
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) {
      return new Response("Error - NINJA API KEY NOT FOUND", { status: 500 });
    }
    const urlNinja = "https://api.api-ninjas.com/v1/dogs?name=" + name;
    try {
      if(!name) return ctx.render(undefined);
      const response = await axios.get<Dog[]>(urlNinja, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      });
      if(name){
        if (response.data.length === 0) {
          return new Response("Dog not found", { status: 404 });
        }
      }
      return ctx.render(response.data[0]);
    } catch (error) {
      console.error(error);
      return new Response("Error", { status: 500 });
    }
  },
};

const Page = (props: PageProps<Dog>) => {
    const perro = props.data;
    if(!perro){
        return (
            <div class="whiteBack">
              <h2 class="p1">Buscar Perro</h2>
              <form method={"get"} action={"/dog"}>
                  <input name={"name"}></input>
                  <button type="submit" class="secondary">Search</button>
                </form>
                <a href="/">Volver al indice</a>
            </div>
          );
    }
    else {
        return <Dog name={perro.name} max_height_male={perro.max_height_male} max_height_female={perro.max_height_female} max_weight_male={perro.max_weight_male} max_weight_female={perro.max_weight_female} good_with_children={perro.good_with_children} good_with_other_dogs={perro.good_with_other_dogs } good_with_strangers={perro.good_with_strangers} image_link={perro.image_link}></Dog>;
    }
  };
  
  export default Page;
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import User from "../components/Usuario.tsx";

type User = {
  username: string;
  sex: string;
  address: string;
  email: string;
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, User>) => {
    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) {
      return new Response("Error - NINJA API KEY NOT FOUND", { status: 500 });
    }
    const urlNinja = "https://api.api-ninjas.com/v1/randomuser";
    try {
      const response = await axios.get<User>(urlNinja, {
        headers: {
          "X-Api-Key": API_KEY,
        },
      });
      if (!response.data) {
        return new Response("Algo fue mal", { status: 404 });
      }
      return ctx.render(response.data);
    } catch (error) {
      console.error(error);
      return new Response("Error", { status: 500 });
    }
  },
};

const Page = (props: PageProps<User>) => {
  const usuario = props.data;
  return <User username={usuario.username} sex={usuario.sex} address={usuario.address} email={usuario.email} ></User>;
};

export default Page;

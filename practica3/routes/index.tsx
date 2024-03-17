import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import {jobOffer} from "../types.ts"
import { JobOffers } from "../islands/JobOffers.tsx";

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext) => {
    try {
      const results = await axios.get<{
        data: jobOffer[]
      }>("https://arbeitnow.com/api/job-board-api");
      return ctx.render(results.data.data);
    } catch (error) {
      return new Response("Error", { status: 500 });
    }
  },
};

const Page=(props:PageProps<jobOffer[]>) => {
  const offers:jobOffer[] = props.data;
  return (
    <JobOffers jobs={offers}/>
  );
}

export default Page;

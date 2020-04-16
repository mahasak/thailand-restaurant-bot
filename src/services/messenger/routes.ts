import { Request, Response } from "express";
import { getPlacesByName } from "./WebhookController";
import { checkSearchParams } from "../../middleware/checks";

export default [
  {
    path: "/api/v1/search",
    method: "get",
    handler: [
        checkSearchParams,
      async ({ query }: Request, res: Response) => {
        const result = await getPlacesByName(query.q.toString());
        res.status(200).send(result);
      }
    ]
  }
];
import { Request, Response } from "express";
import { processRequest, verifySubscription } from "./provider/messenger/";

export default [
    {
        path: "/webhook/messenger",
        method: "get",
        handler: [
            async (req: Request, res: Response) => verifySubscription(req, res)
        ]
    },
    {
        path: "/webhook/messenger",
        method: "post",
        handler: [
            async (req: Request, res: Response) => processRequest(req, res)
        ]
    },
];
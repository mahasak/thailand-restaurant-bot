import { Request, Response } from "express";
import dotenv from "dotenv";
import { setupBotMenu } from "./setupBotMenu"

dotenv.config();

export const verifySubscription = async (req: Request, res: Response) => {
    console.log(req.query);
    console.log(req);
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === process.env.FB_WEBHOOK_VERIFY_TOKEN) {
        console.log("Validating webhook");
        setupBotMenu();
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.")
        
        res.sendStatus(403);
    }
};
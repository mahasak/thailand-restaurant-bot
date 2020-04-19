import { Request, Response } from "express";
import { handleMessage } from "./handleMessage";

export const processRequest = async (req: Request, res: Response) => {
    const data = req.body;
    console.log("process request");

    if (data.object == 'page') {
        data.entry.forEach((entry: any) => {
            const pageID = entry.id;
            const timeOfEvent = entry.time;

            entry.messaging.forEach((event: any) => {
                let sender_psid = event.sender.id;
                console.log('Sender PSID: ' + sender_psid);

                if (event.message) {
                    handleMessage(sender_psid, event.message);
                }// else if (webhook_event.postback) {
                //    handlePostback(sender_psid, webhook_event.postback);
                //}
            })
            /*
            entry.messaging.forEach((event: any) => {
                if (event.message) {
                    receivedMessage(event)
                } else if (event.delivery) {
                    receivedDeliveryConfirmation(event)
                } else if (event.postback) {
                    receivedPostback(event)
                } else if (event.read) {
                    receivedMessageRead(event)
                } else if (event.account_linking) {
                    receivedAccountLink(event)
                } else {
                    console.log(`Webhook received unknown messagingEvent: ${event}`)
                }
            });
            */
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
}

import { Request, Response } from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

export const verifySubscription = async (req: Request, res: Response) => {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === process.env.FB_WEBHOOK_VERIFY_TOKEN) {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
};

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
};

const handleMessage = (sender_psid: any, received_message: any) => {

    let response;

    if (received_message.is_echo) {
        console.log(`Received echo for message ${received_message.id} and app ${received_message.app_id} with metadata ${received_message.metadata}`)
        return
    } else {
        console.log(received_message)
    } /*else i{
        const quickReplyPayload = quickReply.payload
        console.log(`Quick reply for message ${messageId} with payload ${quickReplyPayload}`)

        sendTextMessage(senderID, "Quick reply tapped")
        return
    }*/

    if (received_message.text) {
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
        }
    }

    callSendAPI(sender_psid, response);
}

const callSendAPI = async (sender_psid: any, response: any) => {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response,
        "access_token": process.env.PAGE_ACCESS_TOKEN
    }

    await fetch('https://graph.facebook.com/v2.6/me/messages?access_token=' + process.env.PAGE_ACCESS_TOKEN, {
        method: 'post',
        body: JSON.stringify(request_body),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
}

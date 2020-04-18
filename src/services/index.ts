import messengerRoutes from "./messenger/routes";
import chatbotRoutes from "./chatbot/routes";
export default [
    ...chatbotRoutes, 
    ...messengerRoutes
];
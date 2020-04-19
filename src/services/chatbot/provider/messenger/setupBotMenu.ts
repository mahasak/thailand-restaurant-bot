import { getPageInfo, setupPersistentMenu } from './api'

export const setupBotMenu = async() => {

  const botMenu = [
    {
      "locale": "default",
      "composer_input_disabled": false,
      "call_to_actions": [
        {
          "type": "postback",
          "title": "Menu",
          "payload": "FOOD_MENU"
        },
        {
          "type": "postback",
          "title": "Cart",
          "payload": "CART"
        },
        {
          "type": "postback",
          "title": "Checkout",
          "payload": "INVOICE"
        }
      ]
    }
  ];

  const getStarted = {
    "payload": "FOOD_MENU"
  };

  console.log('setup bot menu');
  setupPersistentMenu(botMenu, getStarted);
}
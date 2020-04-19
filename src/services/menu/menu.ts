
export const getMenus = async (receiver: string, menus: any) => {
  const getMenus = menus.forEach((menu: { name: string; imageUrl: string; price: string; code: string; url: string; }) => getMenuTemplate(
    menu.name,
    menu.imageUrl,
    menu.price,
    menu.code,
    menu.url
  ));
  return {
    "recipient": {
      "id": receiver,
    },
    "message": {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [
            getMenus,
          ]
        }
      }
    }
  }
}

export const getMenuTemplate = async (menuName: string, imageUrl: string, price: string, menuCode: string, menuURl: string) => {
  return {
    "title": menuName,
    "image_url": imageUrl,
    "subtitle": price,
    "default_action": {
      "type": "web_url",
      "url": menuURl,
      "webview_height_ratio": "tall",
    },
    "buttons": [
      {
        "type": "web_url",
        "url": menuURl,
        "title": "View Detail"
      }, {
        "type": "postback",
        "title": "Add to Cart",
        "payload": `ADD_MENU_${menuCode}`
      }, {
        "type": "postback",
        "title": "Remove from Cart",
        "payload": `REMOVE_MENU_${menuCode}`
      }
    ]
  }
}
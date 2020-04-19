import { Request, Response } from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const API_VERSION = 'v6.0';
const PAGE_INFO = `https://graph.facebook.com/${API_VERSION}/me`;
const MESSAGE_API = `https://graph.facebook.com/${API_VERSION}/me/messages`;
const PROFILE_API = `https://graph.facebook.com/${API_VERSION}/me/messenger_profile`;

export const sendMessage = async (psid: any, response: any) => {
  let request_body = {
    "recipient": {
      "id": psid
    },
    "message": response,
    "access_token": process.env.PAGE_ACCESS_TOKEN
  }

  await invokeApi(MESSAGE_API, request_body);
}

export const setupPersistentMenu = async (psid: any, menu: any) => {
  let request_body = {
    "persistent_menu": menu,
    "access_token": process.env.PAGE_ACCESS_TOKEN
  }

  await invokeApi(PROFILE_API, request_body);
}

const invokeApi = async (api: string, payload: any) => {
  await fetch(api, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
}

export const getPageInfo = async () => {
  const url = new URL(PAGE_INFO);
  const params: any = {
    access_token: process.env.PAGE_ACCESS_TOKEN,
    fields: 'id'
  }
  
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  const response = await fetch(url, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
}
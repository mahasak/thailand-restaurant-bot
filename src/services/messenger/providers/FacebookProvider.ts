import axios from "axios";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

export const getPlaces = async (query: string) => {
  const key = process.env.OPEN_CAGE_DATA_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${query}&key=${key}&limit=20&no_annotations=1`;
  
  //const response = await axios.get(url);
  const response = await fetch(url);
  //const response = await axios.get(url, {transformResponse: []}).then(response => response.data );
  console.log(response);
  //const resp = await response.json();
  //return response;
  console.log(response);
  return response;
};
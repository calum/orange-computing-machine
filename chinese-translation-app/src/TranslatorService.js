/**
 * This file handles the translation of the text and any interactions with 
 * the elastic database.
 * 
 * The translation service is a HTTP POST request to the Java backend.
 */
import axios from "axios";

const TRANSLATION_URL = "http://localhost:8080/translate";

export const translateText = async (text) => {
  const message = {
    message: text,
  }
  const response = await axios.post(TRANSLATION_URL, message);
  return response.data;
}


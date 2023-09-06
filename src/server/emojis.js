import React from "react";
import { fetchData } from "./api";
import { useEffect, useState } from "react";

const emojisList = () => {
  const [emojis, setEmojis] = useState([]);
  useEffect(() => {
    async function fetchDataFromApi() {
      try {
        const result = await fetchData("emojis/all");
        setEmojis(result);
      } catch (error) {
        console.log("Failed to fetch data from API");
      }
    }

    fetchDataFromApi();
  }, []);

  const emojisList = [];
  emojis.forEach((emoji) => {
    switch (emoji.name) {
      case "happy":
        emojisList.push("😊");
        break;
      case "sad":
        emojisList.push("😢");
        break;
      case "angry":
        emojisList.push("😡");
        break;
      case "sleepy":
        emojisList.push("😴");
        break;
      case "superhappy":
        emojisList.push("😁");
        break;
      default:
        emojisList.push("😊");
        break;
    }
  });

  return emojisList;
};

export default emojisList;

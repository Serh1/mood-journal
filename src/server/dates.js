import React, { useEffect, useState } from "react";
import { fetchData } from "./api";

const Dates = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    async function fetchDataFromApi() {
      try {
        const result = await fetchData("days/all");
        setDates(result);
      } catch (error) {
        console.log("Failed to fetch data from API");
      }
    }

    fetchDataFromApi();
  }, []);

  console.log(dates);
  const result = dates.map((date) => {
    return { day: date.date[2], mood: date.emojiId, reason: date.reason };
  });

  return result;
};

export default Dates;

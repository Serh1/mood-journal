import React, { useState } from "react";
import "./Tracker.css";
import TextField from "@mui/material/TextField";
import Button from "../Button/Button";
import Cal from "../Calendar";
import { useEffect } from "react";
import { Dayjs } from "dayjs";
import { fetchData } from "../../server/api";
import emojisList from "../../server/emojis";
import { DayMood } from "../../class/DayMood";
import { set } from "date-fns";

const Tracker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [dates, setDates] = useState();
  const [highlightedDays, setHighlightedDays] = useState([]);

  const textRef = React.createRef();

  useEffect(() => {
    const day = findSelectedDay(selectedDate);
    textRef.current.value = day ? day.reason : "No reason";
  }, [textRef]);

  const fetchAllDays = async () => {
    try {
      const result = await fetchData("days/all");

      const dates = result.map((day) => {
        const findEmoji = emojis.find((emoji) => emoji.id === day.emojiId);
        const mood = findEmoji ? findEmoji.emoji : "😐";
        return new DayMood(day.date[2], mood, day.reason);
      });

      setHighlightedDays(dates);
    } catch (error) {
      console.log("Failed to fetch data from API");
    }
  };

  useEffect(() => {
    fetchAllDays();
  }, []);

  console.log(highlightedDays);
  const handleDateSelected = (date) => {
    setSelectedDate(date);
  };

  const findSelectedDay = (selectedDate) => {
    let result = null;
    if (selectedDate) {
      result = highlightedDays.find(
        (item) => item.day === parseInt(selectedDate.toISOString().slice(8, 10))
      );
    }
    return result ? result : { mood: "__", reason: null };
  };

  const handleSelectMood = (emoji) => {
    if (selectedDate) {
      // Add the selected date to the list of highlighted days
      if (
        !highlightedDays.find(
          (item) =>
            item.day === parseInt(selectedDate.toISOString().slice(8, 10))
        )
      ) {
        setHighlightedDays((prevDays) => [
          ...prevDays,
          new DayMood(
            parseInt(selectedDate.toISOString().slice(8, 10)),
            emoji,
            textRef.current.value
          ),
        ]);
      } else {
        // Update the mood of the selected date
        const updatedHighlightedDays = highlightedDays.map((item) => {
          if (item.day === parseInt(selectedDate.toISOString().slice(8, 10))) {
            item.mood = emoji;
          }
          return item;
        });
        setHighlightedDays(updatedHighlightedDays);
      }
    }
  };

  return (
    <section id="TrackerContainer">
      <div className="MoodContainer">
        <div className="CalendarContainer">
          <Cal
            onDateSelected={handleDateSelected}
            daysToHighlight={highlightedDays}
          />
        </div>
        <div className="MoodSelector">
          <div className="title">Mood Selector</div>
          <div className="SelectedData">
            <TextField
              label="Selected Date"
              value={
                selectedDate ? selectedDate.toISOString().substr(0, 10) : ""
              }
              disabled
            />
            <div className="MoodInSelectedDate">
              {selectedDate ? findSelectedDay(selectedDate).mood : "😊"}
            </div>
          </div>
          <div className="ButtonList">
            <Button
              text="😊"
              onSelectText={handleSelectMood.bind(null, "😊")}
            />{" "}
            <Button
              text="😴"
              onSelectText={handleSelectMood.bind(null, "😴")}
            />{" "}
            <Button
              text="☹️"
              onSelectText={handleSelectMood.bind(null, "☹️")}
            />{" "}
            <Button
              text="😁"
              onSelectText={handleSelectMood.bind(null, "😁")}
            />
            <Button
              text="😡"
              onSelectText={handleSelectMood.bind(null, "😡")}
            />
          </div>
          <TextField
            label="Reason"
            multiline
            rows={3}
            className="ReasonTextField"
            inputRef={textRef}
            InputLabelProps={{
              shrink: true, // Keep the label up when text is present
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Tracker;

import React, { useState } from "react";
import "./Tracker.css";
import TextField from "@mui/material/TextField";
import Button from "../Button/Button";
import Cal from "../Calendar";
import { useEffect } from "react";
import { Dayjs } from "dayjs";
import { fetchData } from "../../server/api";
import emojisList from "../../server/emojis";
import Dates from "../../server/dates";

const Tracker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [emojiList, setEmojiList] = useState(emojisList());

  const textRef = React.createRef();

  useEffect(() => {
    const day = findSelectedDay(selectedDate);
    textRef.current.value = day ? day.reason : "No reason";
  }, [selectedDate]);

  const [highlightedDays, setHighlightedDays] = useState([
    { day: 1, mood: "😊", reason: "I am happy" },
    { day: 5, mood: "😡", reason: null },
    { day: 3, mood: "😁", reason: null },
    { day: 13, mood: "😴", reason: null },
  ]);

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

  const handleInputReason = () => {};

  const handleSelectMood = (emoji) => {
    const currentMood = document.getElementsByClassName("MoodInSelectedDate");
    currentMood.innerHTML = "";
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
          {
            day: parseInt(selectedDate.toISOString().slice(8, 10)),
            mood: emoji,
            reason: textRef.current.value,
          },
        ]);
        console.log(highlightedDays);
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
            onChange={handleInputReason}
          />
        </div>
      </div>
    </section>
  );
};

export default Tracker;

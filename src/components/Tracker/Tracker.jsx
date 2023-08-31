import React, { useState } from "react";
import "./Tracker.css";
import TextField from "@mui/material/TextField";
import Button from "../Button/Button";
import Cal from "../Calendar";

const Tracker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 3, 12]);

  const handleDateSelected = (date) => {
    setSelectedDate(date);
  };

  function convertUTCDateToLocalDate(date) {
    var newDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60 * 1000
    );
    return newDate;
  }

  const handleSelectMood = (text) => {
    const currentMood = document.getElementsByClassName("MoodInSelectedDate");
    // currentMood.textConent = text;
    currentMood.innerHTML = "";

    console.log(currentMood);
    if (selectedDate) {
      // Add the selected date to the list of highlighted days
      setHighlightedDays((prevDays) => [
        ...prevDays,
        parseInt(selectedDate.toISOString().slice(8, 10)),
      ]);
      console.log(highlightedDays);
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
            <div className="MoodInSelectedDate">😴</div>
          </div>
          <div className="SelectMood">
            <div className="ButtonList">
              <Button text="😊" onSelectText={handleSelectMood} />
              <Button text="😴" onSelectText={handleSelectMood} />
              <Button text="☹️" onSelectText={handleSelectMood} />
              <Button text="😁" onSelectText={handleSelectMood} />
              <Button text="😡" onSelectText={handleSelectMood} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tracker;

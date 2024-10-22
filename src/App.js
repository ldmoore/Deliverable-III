import React, { useState, useEffect } from 'react';
import './App.css';
import Reminder from './Reminder';

function App() {

  const [reminders, setReminders] = useState(() => {
    const savedReminders = localStorage.getItem("reminderList");
    return savedReminders ? JSON.parse(savedReminders) : [];
  });

  const submitButton = () => {
      let reminderContent = window.prompt("Enter a reminder");
      if (!reminderContent) return alert("Reminder cannot be empty");
      if (reminderContent.length > 445) return alert("Reminder must be less than 446 characters.");
      const newReminder = { reminderContent, id: Math.random() };
      const newReminders = [...reminders, newReminder];
      setReminders(newReminders);

      localStorage.setItem("reminderList", JSON.stringify(newReminders));
  };

  const handleDelete = (index) => {
      const updatedReminders = reminders.filter((_, i) => i !== index);
      setReminders(updatedReminders);
      localStorage.setItem("reminderList", JSON.stringify(updatedReminders));
  };

  const handleSpeak = (index) => {
      const reminder = reminders[index];
      const message = new SpeechSynthesisUtterance(reminder.reminderContent);
      window.speechSynthesis.speak(message);
  }

  useEffect(() => {
      const savedReminders = localStorage.getItem("reminderList");
      if (savedReminders) {
          setReminders(JSON.parse(savedReminders));
      }
  }, []);

  return (
    <div className="App">
      <h1>Reminder Lister</h1>

      <button onClick={submitButton}>Add Reminder</button>

      {reminders.length > 0 ? (
        <div className="reminder-list">
        {reminders.map((reminder, index) => (
          <Reminder
            content={reminder.reminderContent}
            key={index}
            deleteAction={() => handleDelete(index)}
            speakAction={() => handleSpeak(index)}/>
        ))}
        </div>
      ) : (
        <p id="noReminder">No reminders yet... you're either really on top of your work or don't have enough to do</p>
      )}
    </div>
  );
}

export default App;

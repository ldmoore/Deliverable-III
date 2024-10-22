import './Reminder.css';

function Reminder({ content, deleteAction, speakAction }) {
  return (
    <div className="Reminder">
        <p>{content}</p>
        <button onClick={deleteAction}>Done!</button>
        <button className="speak" onClick={speakAction}>Read</button>
    </div>
  );
}

export default Reminder;

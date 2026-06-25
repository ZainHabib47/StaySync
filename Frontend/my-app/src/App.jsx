import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  let [sender, setSender] = useState("");
  let [reciver, setReciver] = useState("");
  let [msg, setMsg] = useState("");
  let [allMessages, setAllMessages] = useState([]);

  const sendingMessageFunction = async () => {
    const res = await fetch("http://localhost:5000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender,
        reciver,
        msg,
      }),
    });

    const data = await res.json();
    console.log("Response:", data);
  };

  const showAllMessages = async () => {
    const res = await fetch("http://localhost:5000/api/showAllMessages");
    const data = await res.json();
    setAllMessages(data.data);
  };

  useEffect(() => {
    showAllMessages();
  }, []);

  return (
    <>
      <div className="bg-amber-950 text-[#f5f4f5] m-5 p-5 flex flex-col gap-3">
        <input
          className="text-center"
          type="text"
          value={reciver}
          placeholder="ReciverName"
          onChange={(e) => {
            setReciver(e.target.value);
          }}
        />
        <input
          className="text-center"
          type="text"
          value={sender}
          placeholder="Sender"
          onChange={(e) => {
            setSender(e.target.value);
          }}
        />
        <input
          className="text-center"
          type="text"
          value={msg}
          placeholder="Enter Your Message"
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <input
          className="border-black border-2 rounded-2xl bg-green-500"
          type="button"
          value="messageSend"
          onClick={sendingMessageFunction}
        />
      </div>
      <div className="bg-amber-600 w-[50vw] h-[60vh] relative ml-100">
        <h1 className="text-amber-300 text-center ">
          All Messages Will be Shown Here!
        </h1>
        <div className="messages grid grid-cols-3 auto-rows-min gap-4">
          {allMessages.map((items) => (
            <div key={items._id} className="bg-white text-black p-3 rounded">
              <h3>Sender: {items.sender}</h3>
              <h3>Receiver: {items.reciver}</h3>
              <p>Message: {items.msg}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;

import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("http://localhost:5000");

function MessageBox({ onReceive, user, room }) {
  const [msg, setMsg] = useState("");

  function handleChange(e) {
    setMsg(e.target.value);
  }

  const sendMessage = () => {
    socket.emit("send_message", { message: msg , room, user});
    setMsg("");
  };

  useEffect(() => {
    const handleMessage = (data)=>{
      onReceive(data);
    };

    socket.on("receive_message", handleMessage);

    return ()=>{
      socket.off("receive_message", handleMessage);
    }
  }, [onReceive]);

  return (
    <div className="w-full flex items-center justify-center gap-[2%] p-5">
      <input
        type="text"
        className="basis-[90%] h-fit rounded-2xl p-4 focus:outline-none"
        placeholder="Type Message Here"
        value={msg}
        onChange={handleChange}
      />
      <button
        className="basis-[8%] p-3 bg-primary-blue rounded-xl"
        onClick={sendMessage}
      >
        <i className="ri-send-plane-2-line text-slate-200 text-lg"></i>
      </button>
    </div>
  );
}

function MessageSpace({ text, userName }) {
  return (
    <div className="w-[90%] h-[80%] flex flex-col items-start space-y-4 p-10 overflow-scroll">
      {text &&
        text.map((t) => {
          return (<div className={(t.user==userName)?"w-full flex justify-end":"w-full flex justify-start"}>
          <div className="flex flex-col gap-[2px]">
          <h1 className="px-2">{(t.user==userName)?"You":t.user}</h1>
            <div className={(t.user==userName)?"min-w-12 w-fit bg-primary-blue text-white h-fit p-3 rounded-lg" : "min-w-12 w-fit bg-white text-slate-900 h-fit p-3 rounded-lg"} >{t.message}</div>
            </div>
            </div>);
        })}
    </div>
  );
}

function ChatBanner({setDetails}) {
  const [joined, setJoined] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [userName, setUserName] = useState("");
  const [submit, setSubmit] = useState(false);

  const joinRoom = ()=>{
    socket.emit("join_room", roomCode);
  }

  return (
    <div className="w-full h-fit bg-white flex justify-center items-center p-5 space-x-4">
      <input
        type="text"
        className="p-2 basis-[20%] rounded-md bg-gray-100 focus:outline-none"
        placeholder="Enter room code"
        value={roomCode}
        onChange={(event)=>{
          setRoomCode(event.target.value);
        }}
        style={{display:joined?"none":"block"}}
      />
      <button className="basis-[10%] p-2 bg-primary-blue rounded-md text-white" onClick={()=>{
        roomCode && setJoined(true);
      }}
      style={{display:joined?"none":"block"}}>
        Join
      </button>
      <input type="text" className="p-2 basis-[20%] rounded-md bg-gray-100 focus:outline-none" placeholder="Enter Name" style={{display:joined&&!submit?"block":"none"}}
        value={userName}
        onChange={(event)=>{
          setUserName(event.target.value);
        }}
      />
      <button className="basis-[10%] p-2 bg-primary-blue rounded-md text-white" onClick={()=>{
        if(userName) 
          joinRoom();
        setDetails({userName, roomCode});
        setSubmit(true);
      }}
      style={{display:joined&&!submit?"block":"none"}}>
        Save
      </button>
      <h1 className="font-semibold text-xl" style={{display:submit?"block":"none"}}>{roomCode}</h1>
      </div>
  );
}

export default function Messages() {
  const [dispText, setDispText] = useState([]);
  const [userName, setUserName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  function setDisplayText(data) {
    setDispText((prevText) => {
      return [...prevText, data];
    });
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <ChatBanner setDetails={(data)=>{
        setUserName(data.userName);
        setRoomCode(data.roomCode);
      }}/>
      <div className="h-full w-full flex-col justify-end p-5 bg-gray-100 relative">
        <MessageSpace text={dispText} userName={userName}/>
        <MessageBox onReceive={(data) => setDisplayText(data)} user={userName} room={roomCode}/>
      </div>
    </div>
  );
}

import React, { useState, useCallback } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
export default function Jamming() {
  return (
    <Routes>
      <Route element={<JammingHome />} path="/jamming"></Route>
      <Route element={<JammingRoom />} path="/room/:roomID"></Route>
    </Routes>
  );
}

function JammingHome() {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const handleJoinRoom = useCallback(() => {
    if (!value) return;
    navigate(`/room/${value}`);
  }, [navigate, value]);

  return (
    <div className="bg-gray-100 h-screen flex-1 flex justify-center items-center">
      <div className="bg-white w-96 h-96 flex justify-center items-center rounded-lg p-8">
        <input
          className="border-2 px-4 py-2 rounded-l-lg"
          type="text"
          placeholder="Enter room code"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="bg-gray-300 rounded-r-lg px-4 py-2"
          onClick={handleJoinRoom}
        >
          Join
        </button>
      </div>
    </div>
  );
}

function JammingRoom() {
  const { roomID } = useParams();
  const myMeeting = async (element) => {
    const appID = 962839740;
    const serverSecret = "8d82c4a7f1d653786b86d95378431e08";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      "Username"
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: ` http://10.52.5.59:3000/room/${roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };
  return (
    <div className="flex justify-center items-center w-full">
      <div ref={myMeeting} />
    </div>
  );
}
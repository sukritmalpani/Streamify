import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaVolumeUp } from "react-icons/fa";
import { FaPlay, FaPause, FaEye } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";

export default function Viewer() {
  const [paused, setPaused] = useState(false);
  const [peer, setPeer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const videoContainerRef = useRef(null);

  const [messages, setMesages] = useState([])
  const inputRef = useRef(null);

  let name = JSON.parse(localStorage.getItem("user")).name

  const socket = io("http://localhost:5001")

  useEffect(() => {

    return () => {
      socket.on("connect", () => {
        console.log("Connected to Socket.io Server")
      })
      // socket.disconnect(); 

    };

  }, [])

  socket.on("receive-chat-message", (data) => {
    setMesages([...messages, data])
    console.log(data)
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name !== ''
      && name !== null
      && inputRef.current.value !== '' &&
      inputRef.current.value !== null) {
      const newMessage = `${name}:${inputRef.current.value}`
      socket.emit("send-chat-message", newMessage)

      socket.emit("save-chat", { message: newMessage, id: "64e0f4dd94fe7308aa27db3a" })

      inputRef.current.value = ""
    }
  }

  async function init() {
    const newPeer = createPeer();
    newPeer.addTransceiver("video", { direction: "recvonly" });
    newPeer.addTransceiver("audio", { direction: "recvonly" });
    setPeer(newPeer);
  }

  function createPeer() {
    const newPeer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
      ],
    });
    newPeer.ontrack = handleTrackEvent;
    newPeer.onnegotiationneeded = () => handleNegotiationNeededEvent(newPeer);

    return newPeer;
  }

  async function handleNegotiationNeededEvent(peer) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };

    const { data } = await axios.post(
      "http://localhost:5000/consumer",
      payload
    );
    console.log(data)
    if (data?.message) {
      setError(data.message);
      toast.error(data.message);
    }
    if (!(data?.message)) {
      console.log("hello jdbahc")
      axios.get("http://localhost:3001/chats/64e0f4dd94fe7308aa27db3a").then((result) => {
        console.log(result.data.chat)
        let arr = []
        result.data.chat.map((item) => {
          arr.push(item)
        })
        console.log("arr" + arr)
        setMesages(arr)
      })
    }
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function handleTrackEvent(e) {
    e.streams[0].getTracks().forEach((track) => {
      if (track.kind === "video") {
        videoRef.current.srcObject = new MediaStream([track]);
      } else if (track.kind === "audio") {
        const audioElement = document.getElementById("audio");
        if (!audioElement.srcObject) {
          audioElement.srcObject = new MediaStream([track]);
          audioElement.play();
        }
      }
    });
  }

  const togglePause = () => {
    if (peer) {
      const videoTrack = videoRef.current.srcObject.getTracks()[0];
      if (paused) {
        videoTrack.enabled = true;
      } else {
        videoTrack.enabled = false;
      }
      setPaused(!paused);
    }
  };

  const enterFullScreen = () => {
    if (videoContainerRef.current) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      } else if (videoContainerRef.current.mozRequestFullScreen) {
        videoContainerRef.current.mozRequestFullScreen();
      } else if (videoContainerRef.current.webkitRequestFullscreen) {
        videoContainerRef.current.webkitRequestFullscreen();
      } else if (videoContainerRef.current.msRequestFullscreen) {
        videoContainerRef.current.msRequestFullscreen();
      }
    }
  };
  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    videoRef.current.volume = newVolume;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setMuted(false);
  };
  const toggleMute = () => {
    const newMuted = !muted;
    audioRef.current.muted = newMuted;
    setMuted(newMuted);
  };

  return (
    <div className="flex  bg-[#44455B] min-h-screen flex-row justify-around items-center h-full ">
      <ToastContainer />
      <div className=" bg-gradient-to-r m-5 rounded-lg from-purple-800 to-blue-400 p-4 w-10/12 h-full">
        <div className="rounded-lg bg-white p-2" ref={videoContainerRef}>
          <video
            ref={videoRef}
            autoPlay
            className="rounded-lg w-full"
            onTimeUpdate={() => {
              setCurrentTime(videoRef.current.currentTime);
              setDuration(videoRef.current.duration);
            }}
          ></video>
        </div>
        <div className="flex p-2">
          <audio ref={audioRef} autoPlay id="audio"></audio>
          <button
            className="h-10 w-36 m-2 flex flex-row justify-around items-center  bg-[#16a085] hover:bg-[#27ae60] hover:scale-110 duration-300 text-white py-2 px-4 rounded-full"
            id="my-button"
            onClick={init}
          >
            <FaEye />
            View Stream
          </button>
          <button
            className="h-10 w-32
             m-2 p-3 flex flex-row justify-around items-center  bg-[#16a085] hover:bg-[#27ae60] hover:scale-110 duration-300 text-white py-2 px-4 rounded-full"
            onClick={togglePause}
          >
            {paused ? <FaPlay /> : <FaPause />}
            {paused ? "Resume" : "Pause"}
          </button>
          <button
            className=" h-10 w-36 p-3 m-2 flex flex-row justify-around items-center  bg-[#16a085] hover:bg-[#27ae60] hover:scale-110 duration-300 text-white rounded-full"
            onClick={enterFullScreen}
          >
            <BsArrowsFullscreen />
            Full Screen
          </button>
          <div className="flex justify-around items-center ml-10 ">
            <FaVolumeUp />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="m-2 range range-xs range-error"
            />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r rounded-lg from-purple-800 to-blue-700 p-2 h-full">
        <div className="flex flex-col justify-between rounded-lg bg-white p-2 h-[40rem] w-96">
          {/* in above div justify-end was changed to justify-between */}
          <div style={{ height: "34rem", overflowY: "auto" }}>
            {/* above is the div inside which our chats are displayed */}
            {
              messages.map((item, index) => {
                return (
                  <div key={index} style={{ padding: "3px 5px", fontWeight: "600", fontSize: "medium" }}>{item}</div>
                )
              })
            }
          </div>
          <div >
            {/* above is the div inside which chats div is there and input field and send button is there  */}
            <div className="flex overflow-scroll" style={{ marginLeft: "10px" }}>chats</div>
            <div className="flex" >
              {/* above is the flex container for the input box and send button */}
              <form action="" className='send-container flex justify-center items-center w-full' onSubmit={(e) => handleSubmit(e)} >
                <input ref={inputRef} className="message-input appearance-none block h-10 w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-3 m-1 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Type your messages here..." />
                <button className="send-button h-10 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-md border-4 text-white py-1 px-2 rounded" type="button">
                  <AiOutlineSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState , useRef} from "react";
import axios from "axios";
import { FaPlay, FaPause } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CircularProgress, LinearProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";
import { io } from "socket.io-client";

export default function Publisher() {
  const [stream, setStream] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const { user } = useAuthContext();

  const [messages, setMesages] = useState([])
  const inputRef = useRef(null);
  // const user =  JSON.parse(localStorage.getItem("user"))
  // const name = user?.email.split("@")[0]
  const socket = io("http://localhost:5001")

  useEffect(() => {

    return () => {
      axios.get("http://localhost:3001/chats/64e0f4dd94fe7308aa27db3a").then((result) => {
        console.log(result.data.chat)
        let arr = []
        result.data.chat.map((item) => {
          arr.push(item)
        })

        setMesages(arr)
      })
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
    if (name!== ''
      && name!== null
      && inputRef.current.value !== '' &&
      inputRef.current.value !== null) {
      const newMessage = `${name}:${inputRef.current.value}`
      socket.emit("send-chat-message", newMessage)

      socket.emit("save-chat", { message: newMessage, id: "64e0f4dd94fe7308aa27db3a" })

      inputRef.current.value = ""
    }
  }

  async function init() {
    setLoading(true);
    setTimeout(async () => {
      console.log("OK");
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      document.getElementById("video").srcObject = mediaStream;
      const peer = createPeer();
      mediaStream.getTracks().forEach((track) => peer.addTrack(track, mediaStream));
      setLoading(false);
      setStarted(true);
      toast.success("You are live now");
      setIsPaused(false);
    }, 5000);
  }
  function createPeer() {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
      ],
    });
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
    return peer;
  }

  async function handleNegotiationNeededEvent(peer) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };
    console.log("Here");

    const { data } = await axios.post(
      "http://localhost:5000/broadcast",
      payload
    );

    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function togglePause() {
    if (stream) {
      stream.getTracks().forEach((track) => {
        if (isPaused) {
          track.enabled = true;
        } else {
          track.enabled = false;
        }
      });
      setIsPaused(!isPaused);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex  bg-[#44455B] flex-row min-h-screen justify-center items-center h-full">
        <div className="flex rounded-lg p-5 flex-row min-h-screen min-w-full justify-around items-center h-full">
          <div className=" bg-gradient-to-r m-5 rounded-lg from-purple-800 to-blue-700 p-4 w-6/12 h-full">
            <div className="rounded-lg bg-white p-2">
              <video className="rounded-lg w-full" autoPlay id="video"></video>
              {loading && <><LinearProgress /> {started ? "Restarting Your Stream" : "Starting Your Stream"}</>}
            </div>
            <div className="flex ">
              <button
                disabled={loading}
                className="mt-4 h-10 w-32 flex flex-row justify-around items-center ml-20 mr-20 bg-[#16a085] hover:bg-[#27ae60] hover:scale-110 duration-300 text-white py-2 px-4 rounded-full"
                id="my-button"
                onClick={init}
              >
                <FaPlay />
                {started ? "Restart" : "Start"}
              </button>
              {started &&
                <button
                  id="pause-button"
                  className="mt-4 h-10 w-32 flex flex-row justify-around items-center ml-15 mr-20 bg-[#F9AB40] hover:bg-[#c0392b] hover:scale-110 duration-300  text-white py-2 px-4 rounded-full"
                  onClick={togglePause}
                >
                  {isPaused ? <FaPlay /> : <FaPause />}
                  {isPaused ? "Resume" : "Pause"}
                </button>
              }
            </div>
          </div>



          <div className="bg-gradient-to-r rounded-lg from-purple-800 to-blue-700 p-2 h-full">
            <div className="rounded-lg bg-white p-2 h-[40rem] w-96">
              {
                messages.map((item, index) => {
                  return (
                    <div key={index} style={{padding:"3px 5px",fontWeight:"600",fontSize:"medium"}}>{item}</div>
                  )
                })
              }
            </div>
            <form action="" className='send-container' onSubmit={(e) => handleSubmit(e)} >
              <input
                type="text"
                className='message-input'
                ref={inputRef}
                style={{margin:"10px 0px",padding:"5px" ,width:"100%"}}
              />
              <button type='submit' className='send-button' style={{width:"100%",backgroundColor:"lightgray"}}>Send</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

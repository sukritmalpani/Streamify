import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlay, FaPause } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CircularProgress, LinearProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";


export default function Publisher() {
  const [stream, setStream] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const { user } = useAuthContext();
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
          <div className=" bg-gradient-to-r m-5 rounded-lg from-purple-800 to-blue-700 p-4 w-10/12 h-full">
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
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

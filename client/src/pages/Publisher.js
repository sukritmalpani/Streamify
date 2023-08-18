import React, { useState } from 'react';
import axios from 'axios';

export default function Publisher() {
    const [stream, setStream] = useState(null);
    const [isPaused, setIsPaused] = useState(false);

    async function init() {
        console.log("OK");
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
        document.getElementById("video").srcObject = mediaStream;
        const peer = createPeer();
        mediaStream.getTracks().forEach(track => peer.addTrack(track, mediaStream));
    }

    function createPeer() {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                }
            ]
        });
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
        return peer;
    }

    async function handleNegotiationNeededEvent(peer) {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        const payload = {
            sdp: peer.localDescription
        };
        console.log("Here");
        const { data } = await axios.post('http://localhost:5000/broadcast', payload);

        const desc = new RTCSessionDescription(data.sdp);
        peer.setRemoteDescription(desc).catch(e => console.log(e));
    }

    function togglePause() {
        if (stream) {
            stream.getTracks().forEach(track => {
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
            <div>
                <button id="my-button" onClick={init}>Start</button>
                <button id="pause-button" onClick={togglePause}>
                    {isPaused ? 'Resume' : 'Pause'}
                </button>
                <video autoPlay id="video"></video>
            </div>
        </div>
    );
}

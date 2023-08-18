import React, { useState, useRef } from 'react';
import axios from 'axios';

export default function Viewer() {
    const [paused, setPaused] = useState(false);
    const [peer, setPeer] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [muted, setMuted] = useState(false);


    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const videoContainerRef = useRef(null);

    async function init() {
        const newPeer = createPeer();
        newPeer.addTransceiver('video', { direction: 'recvonly' });
        newPeer.addTransceiver('audio', { direction: 'recvonly' });
        setPeer(newPeer);
    }

    function createPeer() {
        const newPeer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.stunprotocol.org'
                }
            ]
        });
        newPeer.ontrack = handleTrackEvent;
        newPeer.onnegotiationneeded = () => handleNegotiationNeededEvent(newPeer);

        return newPeer;
    }

    async function handleNegotiationNeededEvent(peer) {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        const payload = {
            sdp: peer.localDescription
        };

        const { data } = await axios.post('http://localhost:5000/consumer', payload);
        const desc = new RTCSessionDescription(data.sdp);
        peer.setRemoteDescription(desc).catch(e => console.log(e));
    }

    function handleTrackEvent(e) {
        e.streams[0].getTracks().forEach(track => {
            if (track.kind === 'video') {
                videoRef.current.srcObject = new MediaStream([track]);
            } else if (track.kind === 'audio') {
                const audioElement = document.getElementById('audio');
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
        <div>
            <h1>Viewer</h1>
            <div className="video-container" ref={videoContainerRef}>
                <video
                    ref={videoRef}
                    autoPlay
                    className="video-player"
                    onTimeUpdate={() => {
                        setCurrentTime(videoRef.current.currentTime);
                        setDuration(videoRef.current.duration);
                    }}
                ></video>
                <div className="progress-container">
                </div>
                <button className="fullscreen-button" onClick={enterFullScreen}>
                    Full Screen
                </button>
            </div>
            <audio ref={audioRef} autoPlay id='audio'></audio>
            <button onClick={togglePause}>{paused ? "Resume" : "Pause"}</button>
            <button id="my-button" onClick={init}>View Stream</button>
            <div className="volume-control">
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
        </div>
    );
}

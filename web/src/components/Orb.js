import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import orb_img from "../images/orb.gif";

  // Recording elements 
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);


const pulse = keyframes`
  0% {
    transform: scale(1) rotate(0deg);
  }

  50% {
    transform: scale(1.2) rotate(10deg);
  }

  100% {
    transform: scale(1) rotate(0deg);
  }
`;

const OrbBase = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;

  &.available {
    background: radial-gradient(circle at center, #2196f3 60%, rgba(33,150,243,0.1) 100%);
    box-shadow: 0 0 10px #2196f3, 0 0 20px #2196f3, 0 0 30px #2196f3;
  }

  &.listening {
    background: radial-gradient(circle at center, #f44336 60%, rgba(244,67,54,0.1) 100%);
    box-shadow: 0 0 10px #f44336, 0 0 20px #f44336, 0 0 30px #f44336;
  }

  &.thinking {
    background: radial-gradient(circle at center, #ff9800 60%, rgba(255,152,0,0.1) 100%);
    box-shadow: 0 0 10px #ff9800, 0 0 20px #ff9800, 0 0 30px #ff9800;
    animation: ${pulse} 2s infinite;
  }

  &.communication {
    background: radial-gradient(circle at center, #4caf50 60%, rgba(76,175,80,0.1) 100%);
    box-shadow: 0 0 10px #4caf50, 0 0 20px #4caf50, 0 0 30px #4caf50;
  }
`;


const getColor = (state) => {
    switch (state) {
      case 'available':
        return '#2196f3';
      case 'listening':
        return '#f44336';
      case 'thinking':
        return '#ff9800';
      case 'communication':
        return '#4caf50';
      default:
        return '#2196f3';
    }
  };


  const handleStartRecording = async () => {
    if (window.MediaRecorder) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    }
  };

  const handleStopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);

      const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
      recordedChunksRef.current = [];

      // You can then upload the blob to your API endpoint for transcription
      // const formData = new FormData();
      // formData.append('audio', blob);
      // await fetch('YOUR_API_ENDPOINT', { method: 'POST', body: formData });
    }
  };


const Orb = ({ state }) => {


  return (
    <OrbBase onClick={recording ? handleStopRecording : handleStartRecording} className={state}>
      
      <img style={{maxWidth: '100%', height: 'auto'}} src={orb_img} alt="orb"></img>
    </OrbBase>
  );
};

export default Orb;
  
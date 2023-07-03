import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

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

const positions = [
    { top: '-10px', left: '40px' },
    { top: '40px', right: '-10px' },
    { bottom: '-10px', left: '40px' },
    { top: '40px', left: '-10px' },
    { bottom: '-10px', right: '-10px' },
  ];

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
  

// Define the styled component for the ripple
const Ripple = styled.div`
  position: absolute;
  border: 2px solid ${(props) => getColor(props.state)};
  border-radius: 50%;
  animation: ${(props) => ripple(props.duration)} infinite linear;
  animation-delay: ${(props) => props.delay}s;
`;

// Define the ripple animation
const ripple = (duration) => keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
`;

// Define the ripple component
const RippleComponent = ({ state, index }) => {
  // Randomize the duration between 0.5s and 2.5s
  const duration = Math.random() * 2 + 0.5;

  return (
    <Ripple state={state} duration={duration} delay={index * 0.1} />
  );
};

const Orb = ({ state }) => {
  const ripples = Array.from({ length: 20 }).map((_, i) => (
    <RippleComponent state={state} index={i} key={i} />
  ));

  return (
    <OrbBase className={state}>
      {(state === 'listening' || state === 'communication') && ripples}
    </OrbBase>
  );
};

export default Orb;
  
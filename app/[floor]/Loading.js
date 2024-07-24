'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% { opacity: 0; }
  40% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const riseAndFall = keyframes`
  0% { transform: translateY(100px); opacity: 0; }
  25% { transform: translateY(0); opacity: 1; }
  75% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-100px); opacity: 0; }
`;

const Container = styled.div`
  position: fixed;
  top: -10rem;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 29, 32, 1);
  animation: ${fadeIn} 4s ease-out;
  overflow: hidden;
`;

const BuildingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(100px);
`;

const Floor = styled.div`
  width: 200px;
  height: 40px;
  background-color: #C5A697;
  margin-bottom: 5px;
  border-radius: 5px;
  animation: ${riseAndFall} 3s infinite;
  animation-delay: ${props => props.delay}s;
`;

const Window = styled.div`
  width: 30px;
  height: 30px;
  background-color: #F5E6D3;
  margin: 5px;
  border-radius: 3px;
  display: inline-block;
`;

const EmptyWindow = styled.div`
  width: 30px;
  height: 30px;
  background-color: transparent;
  margin: 5px;
  border-radius: 3px;
  display: inline-block;
`;

const LoadingText = styled.div`
  font-family: roboto;
  font-size: 24px;
  color: #8B4513;
  margin-top: 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const generateWindows = () => {
  const windows = [<Window key="0" />, <Window key="1" />, <Window key="2" />, <Window key="3" />, <Window key="4" />];
  const emptyIndex = Math.floor(Math.random() * windows.length);
  windows[emptyIndex] = <EmptyWindow key="empty" />;
  return windows;
};

const Loading = () => (
  <Container>
    <BuildingContainer>
      {[...Array(4)].map((_, index) => (
        <Floor key={index} delay={index * 0.2}>
          {generateWindows()}
        </Floor>
      ))}
      <LoadingText>Finding Your Dream Home...</LoadingText>
    </BuildingContainer>
  </Container>
);

export default Loading;

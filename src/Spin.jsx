import React, { useState, useRef, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import './spinWheel.css';
import sound from './assets/sound.mp3';
import Confetti from 'react-confetti';
import diwali from "./assets/diwali.jpg";
import happyDiwali from "./assets/happy-diwali.mp3";
import jackpot from "./assets/jackpot.mp3";
import point from "./assets/point.png";
import goldenCircle from "./assets/golden-circle.png";
import betterLuckNextTime from "./assets/better-luck-next-time.mp3";
import undraw from "./assets/undraw.svg"
import { TypeAnimation } from 'react-type-animation';
import btn from "./assets/btn.png"


// Generate prize array based on specific probabilities
function generateArray() {
  const targetCounts = {
    0: 6, 
    1: 3, 
    2: 6, 
    3: 3, 
    4: 6,
    5: 3, 
    6: 7, 
    7: 1
  };
  const result = [];
  for (const [number, count] of Object.entries(targetCounts)) {
    for (let i = 0; i < count; i++) {
      result.push(Number(number));
    }
  }
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const prizeMapping = {
  0: { option: 'Better luck next time!', prize: 'Better luck next time!' },
  1: { option: 'Happy Diwali', prize: 'Happy Diwali!' },
  2: { option: 'Better luck next time!', prize: 'Better luck next time!' },
  3: { option: 'Happy Diwali', prize: 'Happy Diwali!' },
  4: { option: 'Better luck next time!', prize: 'Better luck next time!' },
  5: { option: 'Happy Diwali', prize: 'Happy Diwali!' },
  6: { option: 'Better luck next time!', prize: 'Better luck next time!' },
  7: { option: 'Jackpot!', prize: 'Jackpot!!' },
};

const SpinWheel = () => {
  const [loading, setLoading] = useState(true); // New loading state
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [prizeMessage, setPrizeMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [spinCount, setSpinCount] = useState(0); 
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const resultArray = useRef(generateArray());
  const audioRef = useRef(null);
  
  const handleSpinClick = () => {
    setButtonDisabled(true);
    const newSpinCount = spinCount + 1;
    setSpinCount(newSpinCount);
    const newPrizeIndex = resultArray.current[spinCount % resultArray.current.length];
    setPrizeIndex(newPrizeIndex);
    setMustSpin(true);
    setPrizeMessage('');
    setShowConfetti(false);

    if (audioRef.current) {
      audioRef.current.src = sound;
      audioRef.current.play();
    }
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setButtonDisabled(false); // Enable button when spinning stops
    const prize = prizeMapping[prizeIndex].prize;
    setPrizeMessage(prize);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      if (prize === 'Happy Diwali!') {
        audioRef.current.src = happyDiwali;
        setShowConfetti(true);
      } else if (prize === 'Jackpot!!') {
        audioRef.current.src = jackpot;
      } else if (prize === 'Better luck next time!') {
        audioRef.current.src = betterLuckNextTime;
      }
      audioRef.current.play();
    }
  };

  useEffect(() => {   
    console.log(resultArray);
     
    setTimeout(() => setLoading(false), 6000); // Simulate loading delay
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="undraw-wrapper">
          <img className='undraw' src={undraw} alt="" />          
        </div>        
        <div className='type-wrapper'>

        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            'Apex Diwali Spinner......',
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            'Apex Wishes You A Happy Diwali......',
            1000
          ]}
          wrapper="span"
          speed={50}          
          className='type-animation'
          repeat={Infinity}
          />
        </div>
      </div>
    );
  }

  return (
    <div data-aos="zoom-out" className='container'>
      {/*  */}
      <img className='bg-1' src={diwali} alt="Diwali Background" />
      <h1 style={{ zIndex: '10' }}>Apex Diwali Spin</h1>
      <div className='wheelly' style={{ position: 'relative', transform: 'scale(1.4) rotate(-45deg)' }}>
        <img className='gold-circle' src={goldenCircle} alt="" />
        <div className='point-wrapper'>
        <img 
          className={`point ${mustSpin ? 'pendulum' : ''}`} 
          src={point} 
          alt="Point" 
        />
        </div>
        <div className='btn-wrapper'>
          <img className='btn' src={btn} alt="" />
        </div>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeIndex}
          data={Object.values(prizeMapping)}
          onStopSpinning={handleStopSpinning}
          backgroundColors={[
            '#e63946', '#2a9d8f', '#e63946', '#2a9d8f', '#e63946', 
            '#2a9d8f', '#e63946', 'Goldenrod'
          ]}
          textColors={['white']}
          innerRadius={10}
          spinDuration={0.4}
          radiusLineWidth={0.1}
          innerBorderWidth={0}
          outerBorderWidth={0}
          fontSize={16}
          
        />
        <button onClick={handleSpinClick} disabled={buttonDisabled}>Spin</button>
      </div>
      <audio ref={audioRef} />
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      {prizeMessage && (
        <div className='prize-message'>
          <h2>Congratulations!</h2>
          <p style={{ color: "white", fontSize: "4rem" }}>{prizeMessage}</p>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;

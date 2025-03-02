"use client";

import { useState, useEffect } from "react";
import { Howl } from "howler";

export default function Prank() {
  const [glitch, setGlitch] = useState(false);
  const [cursor, setCursor] = useState(false);


    const playPrank = new Howl({
      src: ["/sound/brotherlouieprank.mp3"], 
      volume: 0.5,
    });
  
  


  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (glitch) {
      interval = setInterval(() => {
        document.body.style.backgroundColor = ["red", "black", "purple", "green"][
          Math.floor(Math.random() * 4)
        ];
        document.body.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
      }, 100);
    }

    return () => {
      clearInterval(interval);
      document.body.style.backgroundColor = "";
      document.body.style.transform = "";
    };
  }, [glitch]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (cursor) {
      interval = setInterval(() => {
        window.moveBy(Math.random() * 20 - 10, Math.random() * 20 - 10);
      }, 50);
    }

    return () => clearInterval(interval);
  }, [cursor]);

  const triggerVirus = () => {
    setGlitch(true);
    setCursor(true);

    setTimeout(() => setGlitch(false), 5000);
    setTimeout(() => setCursor(false), 7000);
  };



    const jlbClick = (e : React.MouseEvent) => {
      e.preventDefault(); // Prevent default mailto action for toast to appear first
        
      triggerVirus();
      playPrank.play();
  
      setTimeout(() => {
        
        console.log(
          "\x1b[7m" + // Invert colors
          `
    
   ▗▖▗▖   ▗▄▄▖ 
   ▐▌▐▌   ▐▌ ▐▌
   ▐▌▐▌   ▐▛▀▚▖
▗▄▄▞▘▐▙▄▄▖▐▙▄▞▘
                                                                                           
          ` +
          "\x1b[0m" // Reset colors
        );

        
    }, 1000);
    };


  return (
   
        <a href="mailto:louie@digitalfeet.com" onClick={jlbClick}>❤️</a> 
     

  );
}
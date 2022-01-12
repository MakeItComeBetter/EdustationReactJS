import React, { useEffect, useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Avatar, Hidden} from '@mui/material';

const Audio = () => {
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    let temp = document.createElement('audio');
    temp.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    temp.type = "audio/ogg";

    let audio = document.querySelector('audio');
    audio ? console.log(":)") : document.body.append(temp);


    play ? audio?.play() : audio?.pause();

    const timer = setInterval(() => setCurrentTime(calculateTime(audio?.duration - audio?.currentTime)), 1000);

    const setColor = setInterval(() => {
      let spans = document.getElementsByClassName('color_span');
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

      function random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
      }
    
      let color = random_rgba();
      let tag = spans[getRandomInt(spans.length)]
      if(play) tag.style.color = color;
      // tag.style.height = `${getRandomInt(spans.length)*10}px`

    }, 1000)

    return () => {
      clearInterval(timer);
      clearInterval(setColor);
    }

  }, [play]);





  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  }



  return (
    <div className="audio_progress">
      <div className="audio_container">
        <Hidden only={['xs', 'sm']}>
          <audio id="audio">
            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/ogg" />
          </audio>
        </Hidden>
        <Avatar sizes="small" className="audio_btn" onClick={() => setPlay(!play)}>
          {
            play ?
              <PauseIcon color="error" /> :
              <PlayArrowIcon color="error" />
          }
        </Avatar>
        <div className="audio_track">
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
          <span className="color_span">-</span>
        </div>
        <div>
          <small>{currentTime}</small>
        </div>
      </div>
    </div>

  )
}

export default Audio

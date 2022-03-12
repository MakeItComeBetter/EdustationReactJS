import React, { useEffect, useState } from "react";
import { IconButton, Hidden } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useDispatch } from "react-redux";
import { ON_SNACK } from "../../constance/ActionTypes";

const ButtonAudio = ({ src, id }) => {
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const dispatch = useDispatch();
  const [currentSrc, setCurrentSrc] = useState(null);

  useEffect(() => {
    
    let audios = document.querySelectorAll('audio');
    let timer = 0;
    for(let i of audios){
      i.src =  currentSrc;
      if (id === i?.id && src === currentSrc){
        if (play){
          i?.play().then(() => {
          }).catch(() => {
            i?.pause();
            dispatch({type: ON_SNACK, payload: {message: "Can't not play this record", severity: 'warning'}})
          })
          timer = setInterval(() => setCurrentTime(calculateTime(i?.duration - i?.currentTime)),  1000 );
        }else {
          i?.pause();
        }
      }else {
        i?.pause();
        continue;
      }
    }

    

     

    return () => {
      clearInterval(timer);
    };
  }, [play, src, id, dispatch, currentSrc]);

  useEffect(() => {
    setCurrentSrc(src)
    if (play){
    }
  }, [play, currentSrc, src])
  

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    if (secs === 0) {
      setPlay(false);
    }
    return `${minutes}:${returnedSeconds}`;
  };

  return (
    <React.Fragment>
      <IconButton
        size="small"
        className='audio_btn_non_bgrd'
        onClick={() => setPlay(!play)}
      >
        {play ? <PauseIcon color="error" /> : <PlayArrowIcon color="error" />}
      </IconButton>
      <Hidden only={["xs", "sm"]}>
        <span>{currentTime}</span>
      </Hidden>
      <audio id={id} hidden>
          <source src={currentSrc} type="audio/ogg" />
        </audio>
    </React.Fragment>
  );
};

export default ButtonAudio;

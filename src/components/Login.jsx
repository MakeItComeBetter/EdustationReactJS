import React, { useState, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { BASE_PATH, FORGOT_PASSWORD_PATH } from '../constance/urlPath';
import LoadingButton from '@mui/lab/LoadingButton';
import { useHistory } from 'react-router-dom';

const Login = ({ loginFirebase, signUpFirebase, loginWithFacebook, currentUser }) => {
  const navigator = useHistory();
  const [checkError, setCheckError] = useState(false);
  const [errorMes, setErrorMes] = useState("");
  const [ip, setIp] = useState('');
  const [onSignUp, setOnSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendForm, setSendForm] = useState({
    user: {
      username: "",
      email: window.localStorage.getItem('emailForSignIn'),
      password: "",
      ip_address: ip
    }
  });

  useEffect(() => {
    const getIpAddress = () => {
      fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(result => setIp(result.ip))
        .catch(e => console.log(e.message))
    }
    getIpAddress();

    return () => {

    }
  }, [checkError, ip])

  useEffect(() => {
      if (currentUser){
        navigator.push(BASE_PATH)
      }
  }, [currentUser, navigator])

  function handleChange(event) {
    if (errorMes.length > 0) setErrorMes("");
    if (checkError) setCheckError(!checkError);

    let temp = { ...sendForm }
    Object.keys(temp.user).forEach(element => {
      if (element === event.target.name) {
        temp.user[element] = event.target.value.toString().trim();
      }
    });
    setSendForm(temp);
  }

  const checkValidationsForm = (form) => {
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const regexUsername = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
    let error = false;
    if (!regexEmail.test(form?.user?.email)) {
      error = true;
      setErrorMes("Email not valid format. Please check this again.");
    };
    if (!regexUsername.test(form?.user?.username)) {
      setErrorMes("Username not valid format. Please check this again.")
      error = true;
    };
    if (String(form?.user?.password).length < 6) {
      error = true;
      setErrorMes("Password must be length > 6 character");
    };
    if (error) setCheckError(error);
    return error;
  }

  const handelSubmit = async (e) => {
    e.preventDefault();



    if (onSignUp) {
      const hasErr = checkValidationsForm(sendForm);
      if (hasErr) return;
    }

    if (onSignUp) {
      try {
        setLoading(true);
        await signUpFirebase(navigator, sendForm.user.username, sendForm.user.email, sendForm.user.password);
      } catch (e) {
        setCheckError(true);
        setErrorMes(e.message);
        setLoading(false);
        return
      }

    }
    else {
      try {
        setLoading(true);
        await loginFirebase(navigator, sendForm.user.email, sendForm.user.password);
      } catch (e) {
        setLoading(false);
        setCheckError(true);
        setErrorMes("Email or password could not valid!");
        return
      }
    }
    setLoading(false);
  }


  return (
    <Grid container className="login">
      <Grid item xs={11} sm={4}>
        <h3 className="sessions__title">
          Sign {`${onSignUp ? 'up' : 'in'}`} to EduStation
        </h3>
        <form className="sessions__form" noValidate>
          {
            onSignUp ?
              <TextField
                type="text"
                autoComplete="current-username"
                margin="dense"
                // variant="filled"
                size="small"
                placeholder="Enter your username"
                name="username"
                value={sendForm?.user?.username ? sendForm?.user?.username : ''}
                fullWidth={true}
                error={checkError}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              /> : ""
          }
          <TextField
            type="email"
            autoComplete="current-email"
            margin="dense"
            // variant="filled"
            size="small"
            placeholder="Enter your email"
            name="email"
            value={sendForm?.user?.email ? sendForm?.user?.email : ''}
            fullWidth={true}
            error={checkError}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            type="password"
            autoComplete="current-password"
            margin="dense"
            // variant="filled"
            value={sendForm?.user?.password ? sendForm?.user?.password : ''}
            size="small"
            name="password"
            placeholder="Enter your password"
            fullWidth={true}
            error={checkError}
            onChange={handleChange}
            helperText={errorMes}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          {
            onSignUp ?
              <div>
                <br />
              </div>
              : <FormControlLabel
                control={<Checkbox checked={true ? true : false} color="primary" />}
                label="Choose login with firebase."
              />
          }
          <LoadingButton
            loading={loading}
            type="submit"
            onClick={handelSubmit}
            fullWidth
            variant="contained"
            color={onSignUp ? "primary" : "error"}
            className="login__btn"
            sx={{
              borderRadius: 15
            }}
            disabled={loading ? true : false}
          >
            {`${onSignUp ? 'Confirm' : ' Sign in'}`}
          </LoadingButton>
          <Grid item xs={12} className="login__footer">
            <Grid item xs={6}>
              <Link to={FORGOT_PASSWORD_PATH} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs={6}>
              <span onClick={() => setOnSignUp(!onSignUp)}>{onSignUp ? "I having an account and verified this. " : "Don't have an account? Sign Up"}</span>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <button type="button" onClick={() => loginWithFacebook(navigator)}>Login with facebook</button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default Login

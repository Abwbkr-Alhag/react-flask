import { AccountCircle } from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';
import { Checkbox, Box, Button, FormGroup, InputAdornment, Stack, TextField } from '@mui/material';
import { Typography } from '@material-ui/core';
import { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import ValidateEmail from '../../utils/emailVerify';
import ValidatePassword from '../../utils/passwordVerify';
import httpClient from '../../utils/httpClient';
import AuthContext, { AuthActionKind } from '../../context/AuthProvider';
import Loading from '../../components/Loading/Loading';
import useStyles from './LoginStyles';

function Login() {
  const classes = useStyles();
  
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const globalState = useContext(AuthContext);
  let navigate = useNavigate();

  enum loginActionKind {
    LOGIN = 'Login',
    UPDATE_EMAIL = 'Update Email',
    UPDATE_PASSWORD = 'Update Password',
  }

  interface loginForm {
    email: string,
    password: string,
  }

  interface loginFormAction {
    type: loginActionKind,
    payload: loginForm;
  }

  function reducer(state:loginForm, action:loginFormAction):loginForm {
    const { type, payload } = action;
    switch (type) {
      case loginActionKind.LOGIN:
        if (state.email.length === 0 || state.password.length === 0) {
          setErrorMsg("You must supply an email and a password")
        }
        setLoading(true)
        httpClient.post("//localhost:5000/login", {
          email:state.email,
          password:state.password,
        }).then((res) => {
          globalState.setAuth({type: AuthActionKind.LOGIN, payload: { id: res.data.id, user: true, isAdmin: res.data.isAdmin, email: res.data.email}})
          setLoading(false)
          navigate("/")
        }).catch((err) => {
          setErrorMsg(err.response.data.error)
          setLoading(false)
        })
        return state
      case loginActionKind.UPDATE_EMAIL:
        return { ...state, email:payload.email}
      case loginActionKind.UPDATE_PASSWORD:
        return { ...state, password:payload.password}
      default:
        console.log("State not defined!")
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
  } as loginForm);

  const debouncedEmail = useDebounce(state.email, 500);
  const debouncedPassword = useDebounce(state.password, 500);

  useEffect(
    () => {
      if (state.email) {
        setEmailError(!ValidateEmail(debouncedEmail))
      } else {
        setEmailError(false);
      }
    },
    [state.email, debouncedEmail]
  );

  useEffect(
    () => {
      if (state.password) {
        setPasswordError(!ValidatePassword(debouncedPassword))
      } else {
        setPasswordError(false);
      }
    },
    [state.password, debouncedPassword]
  );

  return (
    <>
      {loading && <Loading/>}
      <Box className={classes.container}>
        <Box className={classes.background}/>
        <Box className={classes.login}>
          <Box className={classes.counterSkew}>
            <FormGroup className={classes.form}>
              <Typography variant="h3" className={classes.title}>Avarance Login</Typography>
              <TextField variant="outlined" label={emailError ? 'Incorrect Email Format' : 'Email'} className={classes.innerForm} required 
              error={emailError}
              autoComplete='off'
              onChange={(event) => dispatch({type: loginActionKind.UPDATE_EMAIL, payload:{...state, email: event.target.value}})}
              type="email"
                InputProps={{
                  startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                  ),
              }}>
                
              </TextField>
              <TextField variant="outlined" label={passwordError ? 'Password Must be Greater than Eight Characters' : 'Password'} className={classes.innerForm} required 
                type="password"
                error={passwordError}
                onChange={(event) => dispatch({type: loginActionKind.UPDATE_PASSWORD, payload:{...state, password: event.target.value}})}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
              }}>
              </TextField>
              <Typography className={classes.error}>{errorMsg}</Typography>
              <Stack direction="row" className={`${classes.innerForm} ${classes.loginContainer}`}>
                <Stack direction="row" className={classes.checkBoxContainer}>
                  <Checkbox className={classes.checkbox} defaultChecked={true}/>
                  <Typography variant="body1">Remember Me?</Typography>
                </Stack>
                <Button 
                  className={classes.loginButton}
                  onClick={() => dispatch({type: loginActionKind.LOGIN, payload:{...state}})}
                  variant="contained">Login</Button>
              </Stack>
              <Stack direction="row" className={`${classes.innerForm} ${classes.linkContainer}`}>
                <Link className={classes.outLinks} to="/register">Register Now</Link>
                <Link className={classes.outLinks} to="/forgot-password">Forgot Password?</Link>
              </Stack>
            </FormGroup>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Login
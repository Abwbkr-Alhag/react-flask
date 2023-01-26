// Material UI Icons
import { AccountCircle } from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';
// Material UI Components
import { Box, Button, FormGroup, InputAdornment, Stack, TextField, Typography } from '@mui/material';
// React Components
import { useEffect, useReducer, useState, useContext } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
// Insourced Components
import useDebounce from '../../hooks/useDebounce';
import ValidateEmail from '../../utils/emailVerify';
import ValidatePassword from '../../utils/passwordVerify';
import Loading from './../../components/Loading';
import httpClient from '../../utils/httpClient';
import { AuthActionKind } from '../../context/AuthProvider';
import AuthContext from '../../context/AuthProvider';
import useStyles from './RegisterStyles';

const Register = () => {
  const classes = useStyles();
  
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [secondPasswordError, setSecondPasswordError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const globalState = useContext(AuthContext);
  let navigate = useNavigate();

  enum registerActionKind {
    REGISTER = 'Register',
    UPDATE_EMAIL = 'Update Email',
    UPDATE_PASSWORD = 'Update Password',
    MATCH_PASSWORD = 'Match Password',
  }

  interface registerForm {
    email: string,
    password: string,
    secondPassword: string,
  }

  interface registerFormAction {
    type: registerActionKind,
    payload: registerForm;
  }

  function reducer(state:registerForm, action:registerFormAction):registerForm {
    const { type, payload } = action;
    switch (type) {
      case registerActionKind.REGISTER:
        if (state.email.length === 0 || state.password.length === 0 || state.secondPassword.length === 0) {
          setErrorMsg("You must supply an email, a password, and confirm that password")
          return {...state}
        } else if (state.password.length <= 8) {
          setErrorMsg("You must have an password that exceeds 8 characters")
          return {...state}
        } else if (!ValidateEmail(state.email)) {
          setErrorMsg("You must supply a proper email")
          return {...state}
        } else if (Boolean(state.password.localeCompare(state.secondPassword))) {
          setErrorMsg("The passwords supplied must be identical")
          return {...state}
        }
        setLoading(true)
        httpClient.post("//localhost:5000/register", {
          email:state.email,
          password:state.password,
        }).then((res) => {
          globalState.setAuth({type: AuthActionKind.REGISTER, payload: {
             id: res.data.id, 
             user: true, 
             isAdmin:false, 
             email: res.data.email
          }})
          setLoading(false)
          navigate("/")
        }).catch((err) => {
          setErrorMsg(err.response.data.error)
          setLoading(false)
        })
        return { ...state}
      case registerActionKind.UPDATE_EMAIL:
        return { ...state, email:payload.email}
      case registerActionKind.UPDATE_PASSWORD:
        return { ...state, password:payload.password}
      case registerActionKind.MATCH_PASSWORD:
        return { ...state, secondPassword:payload.secondPassword}
      default:
        console.log("State not defined!")
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    secondPassword: "",
  } as registerForm);

  const debouncedEmail = useDebounce(state.email, 500);
  const debouncedPassword = useDebounce(state.password, 500);
  const debouncedSecondPassword = useDebounce(state.secondPassword, 500);

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

  useEffect(
    () => {
      if (state.secondPassword) {
        setSecondPasswordError(Boolean(debouncedSecondPassword.localeCompare(state.password)))
      } else {
        setSecondPasswordError(false);
      }
    },
    [state.secondPassword, state.password, debouncedSecondPassword]
  );

  return (
    <>
      {loading && <Loading/>}
      <Box className={classes.container}>
        <Box className={classes.background}/>
        <Box className={classes.register}>
          <Box className={classes.counterSkew}>
            <FormGroup className={classes.form}>
              <Typography variant="h3" className={classes.title}>Avarance Register</Typography>
              <TextField variant="outlined" label={emailError ? 'Incorrect Email Format' : 'Email'} className={classes.innerForm} required 
              error={emailError}
              onChange={(event) => dispatch({type: registerActionKind.UPDATE_EMAIL, payload:{ ...state, email: event.target.value}})}
              autoComplete='off'
              type="email"
                InputProps={{
                  startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                  ),
              }}>
              </TextField>
              <TextField variant="outlined" label={passwordError ? 'Password Must be Greater than Eight Characters' : 'Enter Password'} className={classes.innerForm} required 
                error={passwordError}
                onChange={(event) => dispatch({type: registerActionKind.UPDATE_PASSWORD, payload:{...state, password: event.target.value}})}
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
              }}>
              </TextField>
              <TextField variant="outlined" label={secondPasswordError ? 'Passwords Must Match' : 'Confirm Password'} className={classes.innerForm} required 
                error={secondPasswordError}
                onChange={(event) => dispatch({type: registerActionKind.MATCH_PASSWORD, payload:{...state, secondPassword: event.target.value}})}
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
              }}>
              </TextField>
              <Typography className={classes.error}>{errorMsg}</Typography>
              <Stack direction="row" className={`${classes.innerForm} ${classes.registerContainer}`}>
                <Link className={classes.outLinks} to="/login">Switch to Login</Link>
                <Button 
                  className={classes.registerButton}
                  onClick={() => dispatch({type: registerActionKind.REGISTER, payload:{...state}})}
                  variant="contained">Register</Button>
              </Stack>
            </FormGroup>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Register
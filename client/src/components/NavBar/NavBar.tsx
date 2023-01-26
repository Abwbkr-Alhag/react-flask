// Material UI Icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
// Material UI Components
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
// React Imports
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
// Insourced Imports
import SideDrawer from './components/SideDrawer';
import logo from "../../assets/logo.png";
import AuthContext, { auth, AuthActionKind } from '../../context/AuthProvider';
import httpClient from '../../utils/httpClient';
import useStyles from './NavBarStyles';
import CartDrawer from './components/CartDrawer';
import useShoppingCart from '../../context/ShoppingCartProvider';

const NavBar = () => {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const globalState = useContext(AuthContext);
  const { cartQuantity, toggleCart } = useShoppingCart();

  const user = globalState.auth.user;
  const admin = globalState.auth.isAdmin;

  useEffect(() => {
    if (windowWidth < 600) {
      setMobileView(true)
    } else {
      setMobileView(false)
      setMobileOpen(false)
    }
  
  }, [setMobileView, windowWidth])

  const setWindow = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', setWindow);
    return () => {
      window.removeEventListener('resize', setWindow)
    }
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setAnchorEl(null);
  }, [trigger])
  
  function logout():void {
    httpClient.post("//localhost:5000/logout").then(() => {
      globalState.setAuth({type: AuthActionKind.LOGOUT, payload: {} as auth})
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
      <AppBar 
      style={ trigger ? { height:'64px'} : {}} 
      className={classes.container} component="nav">
        { mobileView ? 
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className={classes.iconButton}
            onClick={() => {
              setMobileOpen((prevState) => !prevState);
            }}
          >
            <MenuIcon />
          </IconButton>
        :
        <>
          <Box className={classes.logoWrapper}>
            <img alt="Avarance Logo" src={logo} height={'48px'} width={'48px'}/>
          </Box>
          <Box component="ul" className={classes.navLinks}>
            <Link className={classes.links} to={"/"}>
              <Typography>
                Home
              </Typography>
            </Link>
            <Link className={classes.links} to={"/shop"}>
              <Typography>
                Shop
              </Typography>
            </Link>
            <Link className={classes.links} to={"/contact"}>
              <Typography>
                Contact
              </Typography>
            </Link>
            <Link className={classes.links} to={"/FAQ"}>
              <Typography>
                FAQ
              </Typography>
            </Link>
          </Box>
        </>
        }
        <Box className={classes.search}>
          <SearchIcon className={classes.searchIcon} sx={{cursor:'pointer'}}/>
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            className={classes.input}
            required
          />
        </Box>
        <Stack direction="row" spacing={1} sx={{mr:'8px'}}>
          { user
            ? <>
                <Box onClick={handleClick}>
                  <AccountBoxIcon style={{cursor:'pointer'}} fontSize="large"/>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  disableScrollLock={true}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  { admin && <Link className={classes.link} to="/admin"><MenuItem onClick={handleClose}>Admin View</MenuItem></Link>}
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </>
            : 
            <Tooltip title="Login/Register" arrow>
              <Link className={classes.link} to="/login">
                <LoginIcon className={classes.link} style={{cursor:'pointer'}} fontSize="large"/>
              </Link>
            </Tooltip>
          }
          <Badge badgeContent={cartQuantity} max={99} color="secondary" overlap="rectangular">
            <ShoppingCartIcon onClick={toggleCart} style={{cursor:'pointer'}} fontSize="large"/>
          </Badge>
        </Stack>
      </AppBar>
      <SideDrawer mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
      <CartDrawer/>
    </>
  )
}

export default NavBar;
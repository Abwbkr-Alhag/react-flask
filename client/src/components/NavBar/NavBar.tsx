import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import { useEffect, useState, useContext } from 'react';
import SideDrawer from './components/SideDrawer';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import useStyles from './NavBarStyles';
import AuthContext, { auth, AuthActionKind } from '../../context/AuthProvider';
import httpClient from '../../utils/httpClient';

function NavBar() {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorShop, setAnchorShop] = useState<null | HTMLElement>(null);
  const globalState = useContext(AuthContext);

  const user = globalState.auth.user;

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

  const handleShopClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorShop(event.currentTarget);
  };
  const handleShopClose = () => {
    setAnchorShop(null);
  };

  useEffect(() => {
    setAnchorShop(null);
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
            <Box className={classes.links} onClick={handleShopClick}>
              <Typography>
                Shop
              </Typography>
            </Box>
            <Menu
              anchorEl={anchorShop}
              id="account-menu"
              open={Boolean(anchorShop)}
              onClose={handleShopClose}
              disableScrollLock={true}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              PopoverClasses={{
                paper: classes.menu,
              }}
            > <Stack direction="row" spacing={2} sx={{ml: 2}}>
                <Link className={classes.link} to="/shop/:all">
                  <MenuItem className={classes.menuItem} onClick={handleShopClose}>Shop All</MenuItem>
                </Link>
                <Link className={classes.link} to="/shop/:ring">
                  <MenuItem className={classes.menuItem} onClick={handleShopClose}>Rings</MenuItem>
                </Link>
                <Link className={classes.link} to="/shop/:pendant">
                  <MenuItem className={classes.menuItem} onClick={handleShopClose}>Pendants</MenuItem>
                </Link>
                <Link className={classes.link} to="/shop/:earring">
                  <MenuItem className={classes.menuItem} onClick={handleShopClose}>Earrings</MenuItem>
                </Link>
              </Stack>
            </Menu>
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
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
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
          <Badge badgeContent={111} max={99} color="secondary" overlap="rectangular">
            <ShoppingCartIcon style={{cursor:'pointer'}} fontSize="large"/>
          </Badge>
        </Stack>
      </AppBar>
      <SideDrawer mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
    </>
  )
}

export default NavBar;
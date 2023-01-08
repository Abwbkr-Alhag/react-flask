import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { Link as MuiLink } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import StoreIcon from '@mui/icons-material/Store';
import useStyles from './SideDrawerStyles';

interface sideDrawerProps {
    mobileOpen: boolean,
    setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function SideDrawer({ mobileOpen, setMobileOpen }:sideDrawerProps) {
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const classes = useStyles();
    
    return (
        <Drawer 
            ModalProps={{ keepMounted: mobileOpen, }} 
            anchor={'left'} 
            open={mobileOpen} 
            onClose={handleDrawerToggle}
            keepMounted={true}>
            <Box className={classes.drawerContainer}  sx={{ textAlign: 'center' }}>
                <Box className={classes.header}>
                    <img alt="Avarance Logo" src={logo} height={'48px'} width={'48px'}/>
                </Box>
                <Box className={classes.linkWrapper} component="ul">
                    <Link className={classes.link} to="/">
                        <HomeIcon fontSize="large"/>
                        <Typography variant="h6">Home</Typography>
                    </Link>
                    <Divider/>
                    <Link className={classes.link} to="/shop/:all">
                        <StoreIcon fontSize="large"/>
                        <Typography variant="h6">Shop All</Typography>
                    </Link>
                    <Divider/>
                    <Link className={classes.link} to="/shop/ring">
                        <HomeIcon fontSize="large"/>
                        <Typography variant="h6">Rings</Typography>
                    </Link>
                    <Divider/>
                    <Link className={classes.link} to="/shop/pendant">
                        <HomeIcon fontSize="large"/>
                        <Typography variant="h6">Pendants</Typography>
                    </Link>
                    <Divider/>
                    <Link className={classes.link} to="/shop/earring">
                        <HomeIcon fontSize="large"/>
                        <Typography variant="h6">Earrings</Typography>
                    </Link>
                    <Divider/>
                    <Link className={classes.link} to="/contact">
                        <PermContactCalendarIcon fontSize="large"/>
                        <Typography variant="h6">Contact</Typography>
                    </Link>
                    <Divider/>
                    <Link className={classes.link} to="/FAQ">
                        <LiveHelpIcon fontSize="large"/>
                        <Typography variant="h6">FAQ</Typography>
                    </Link>
                    <Divider/>
                    <Box className={classes.IconRow}>
                        <MuiLink underline="none" color="inherit" href="https://github.com/Abwbkr-Alhag">
                            <Tooltip title="GitHub Link" arrow>
                                <GitHubIcon fontSize="large"></GitHubIcon>
                            </Tooltip>
                        </MuiLink>
                        <MuiLink underline="none" color="inherit" href="https://www.linkedin.com/in/abwbkr-alhag-038174208/">
                            <Tooltip title="LinkedIn Link" arrow>
                                <LinkedInIcon fontSize="large"></LinkedInIcon>
                            </Tooltip>
                        </MuiLink>
                        <MuiLink underline="none" color="inherit" href="mailto: alhagabwbkr@gmail.com">
                            <Tooltip title="Send an Email" arrow>
                                <EmailIcon fontSize="large"></EmailIcon>
                            </Tooltip>
                        </MuiLink>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    )
}

export default SideDrawer
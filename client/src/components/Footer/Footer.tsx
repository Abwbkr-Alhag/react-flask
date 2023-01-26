import { AppBar, Box, Divider, Grid, Stack, Typography, Link as MuiLink } from "@mui/material"
import { Link } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LockIcon from '@mui/icons-material/Lock';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PaymentsIcon from '@mui/icons-material/Payments';
import useStyles from "./FooterStyles"

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar component="footer" position="static" className={classes.container}>
      <Grid container spacing={{xs:2, md:3}}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography variant="h5" className={classes.title}>About Us</Typography>
          <Typography variant="body1" className={classes.aboutDesc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. A incidunt quibusdam reprehenderit molestiae sapiente, quas earum totam minus impedit error.</Typography>
          <Stack direction="row" className={classes.aboutUsIconRow}>
            <LockIcon className={classes.icon} fontSize="large"/>
            <CreditCardIcon className={classes.icon} fontSize="large"/>
            <CardGiftcardIcon className={classes.icon} fontSize="large"/>
            <PaymentsIcon className={classes.icon} fontSize="large"/>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography variant="h5" className={classes.title}>Categories</Typography>
          <Box component="ul" className={classes.list}>
            <Link to="/category/:all" className={classes.routerLink}>
              <Typography className={classes.listItem} component="li" variant="body1">Shop All</Typography>
            </Link>
            <Link to="/category/:ring" className={classes.routerLink}>
              <Typography className={classes.listItem} component="li" variant="body1">Rings</Typography>
            </Link>
            <Link to="/category/:pendant" className={classes.routerLink}>
              <Typography className={classes.listItem} component="li" variant="body1">Pendants</Typography>
            </Link>
            <Link to="/category/:earring" className={classes.routerLink}>
              <Typography className={classes.listItem} component="li" variant="body1">Earrings</Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography variant="h5" className={classes.title}>Information</Typography>
          <Box component="ul" className={classes.list}>
            <Link to="/" className={classes.routerLink}>
              <Typography className={`${classes.listItem} ${classes.routerLink}`} component="li" variant="body1">About Us</Typography>
            </Link>
            <Link to="/" className={classes.routerLink}>
              <Typography className={`${classes.listItem} ${classes.routerLink}`} component="li" variant="body1">Contact</Typography>
            </Link>
            <Link to="/" className={classes.routerLink}>
              <Typography className={`${classes.listItem} ${classes.routerLink}`} component="li" variant="body1">Terms & Conditions</Typography>
            </Link>
            <Link to="/" className={classes.routerLink}>
              <Typography className={`${classes.listItem} ${classes.routerLink}`} component="li" variant="body1">Returns & Exchange</Typography>
            </Link>
            <Link to="/" className={classes.routerLink}>
              <Typography className={`${classes.listItem} ${classes.routerLink}`} component="li" variant="body1">Shipping & Delivery</Typography>
            </Link>
            <Link to="/" className={classes.routerLink}>
              <Typography className={`${classes.listItem} ${classes.routerLink}`} component="li" variant="body1">Private Policy</Typography> 
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography variant="h5" className={classes.title}>Contact</Typography>
          <Stack direction="row" className={classes.contactRow} sx={{color: '#ffffff'}}>
            Address: XYZ, New Delhi India, Pin-Code 110005
          </Stack>
          <Divider sx={{backgroundColor: '#ffffff', mb: 1}}/>
          <Stack direction="row" className={classes.contactRow} sx={{color: '#ffffff'}}>
            Phone: +91 123456789
          </Stack>
          <Stack direction="row" className={classes.contactRow} sx={{color: '#ffffff'}}>
            Email: contact@amazon.com
          </Stack>
          <Stack direction="row" className={classes.contactRow}>
            <MuiLink className={classes.icon}>
              <FacebookIcon fontSize="large"/>
            </MuiLink>
            <MuiLink className={classes.icon}>
              <InstagramIcon fontSize="large"/>
            </MuiLink>
            <MuiLink className={classes.icon}>
              <TwitterIcon fontSize="large"/>
            </MuiLink>
            <MuiLink className={classes.icon} href="https://github.com/Abwbkr-Alhag">
              <GitHubIcon fontSize="large"/>
            </MuiLink>
            <MuiLink className={classes.icon} href="https://www.linkedin.com/in/abwbkr-alhag-038174208/">
              <LinkedInIcon fontSize="large"/>
            </MuiLink>
          </Stack>
        </Grid>
      </Grid>
      <Typography sx={{textAlign: 'center', mt: 1, color: '#ffffff'}}>
        Copyright &copy; 2023 All rights reserved | Design made by Abwbkr Alhag 
      </Typography>
    </AppBar>
  )
}

export default Footer
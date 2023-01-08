import { makeStyles, Theme } from '@material-ui/core';
import background from './../../assets/images/background.jpg';

const useStyles = makeStyles((theme : Theme) => ({
    container: {
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    },
    login: {
        position: 'relative',
        float: 'right',
        width: '50%',
        height: '100%',
        backgroundColor: '#fff',
        transform: 'skew(10deg, 0deg) translateX(80px)',
        zIndex: 1,
        [theme.breakpoints.down("sm")]: {
            transform: 'none',
            width: '100%',
        }
    },
    counterSkew: {
        transform: 'skew(-10deg, 0deg)',
        marginLeft: '60px',
        marginRight: '80px',
        height: '100%',
        [theme.breakpoints.down("sm")]: {
            transform: 'none',
            margin: '0',
        }
    },
    form: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        gap: '20px',
    },
    title: {
        marginBottom: '16px',
        textAlign: 'center',
    },
    error: {
        color: theme.palette.error.main,
    },
    innerForm: {
        width: '80%',
        transition: theme.transitions.create('all'),
    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    loginButton: {
        width: '100px',
    },
    checkBoxContainer: {
        alignItems: 'center',
        width: '80%',
    },
    checkbox: {
        padding: '3px',
    },
    linkContainer: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    outLinks: {
        textDecoration: 'none',
        color: '#2973B1',
    }
}))

export default useStyles;
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme : Theme) => ({
    background: {
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            backdropFilter: 'blur(2px)',
            pointerEvents: 'none',
            top: '0',
            left: '0',
        },
    },
    textWrapper: {
        position: 'absolute',
        top: '50%',
        left: '75%',
        transform: 'translate(-25%, -50%)',
        textAlign: 'center',
        alignItems: 'center',
        gap: '16px',
        [theme.breakpoints.down('sm')]: {
            gap: '8px'
        },
        [theme.breakpoints.down('xs')]: {
            gap: '4px'
        },
    },
    heroTitle: {
        color: '#ffffff',
        fontSize: '3.5rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.0rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem',
        },
    },
    heroSubtitle: {
        color: '#ffffff',
        fontSize: '1.5rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.75rem',
        },
    },
    heroButton: {
        color: '#ffffff',
        backgroundColor: '#EEBC1D !important',
        '&:hover,&:focus,&:active': {
            backgroundColor: '#EEBC1D',
        },
        padding: '6px 16px',
        fontSize: '1rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.75rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.625rem',
            padding: '3px 8px'
        },
        whiteSpace: 'nowrap',
    }
}))

export default useStyles
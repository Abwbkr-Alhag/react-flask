import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme : Theme) => ({
    card: {
        flexBasis: '100%',
        textAlign: 'center',
        margin: '50px 0px',
        gap: '0.5rem',
        opacity: '0.95',
        transition: theme.transitions.create(["all"], {
            duration: '1000ms'
        }),
        [theme.breakpoints.down('sm')]: {
            padding: 0,
            margin: 0,
            backgroundColor: '#F0F6FA',
            boxShadow: '0px 0px 20px 3px grey',
            maxWidth: '650px',
            opacity: '1',
        }
    },
    cardActive: {
        textAlign: 'center',
        flexBasis: '120%',
        padding: 0,
        margin: '0 -2rem',
        zIndex: 1,
        backgroundColor: '#F0F6FA',
        gap: '0.5rem',
        boxShadow: '0px 0px 20px 3px grey',
        opacity: '1',
        transition: theme.transitions.create(["all"], {
            duration: '1000ms'
        }),
        [theme.breakpoints.down('sm')]: {
            padding: 0,
            margin: 0,
            zIndex: 0,
            flexBasis: '100%',
            maxWidth: '650px',
        }
    },
    cardImage: {
        width: '100%',
        height: 'auto',
        objectFit: 'contain',
        overflow: 'hidden',
    },
    cardTitle: {

    },
    cardSubtitle: {
        padding: '0 2rem',
        height: '60px',
        [theme.breakpoints.down('sm')]: {
            height: 'auto',
        }
    },
    cardButton: {
        color: '#000000',
    },
    iconRow: {
        justifyContent: 'center',
        gap: '2rem',
    },
    iconColumn: {
        alignItems: 'center',
    },
    transDiv: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        transition: theme.transitions.create('all', {
            duration: '300ms',
            delay: '0ms !important'
        }),
    }
}))

export default useStyles;
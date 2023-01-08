import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        marginTop: '36px',
        marginBottom: '36px',
        width: 'calc(100% - 48px)',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        }
    },
    arrowButton: {
        position: 'absolute',
        color: '#000',
        borderRadius: '50%',
        width: '64px',
        height: '64px',
        backgroundColor: '#EEEEEE',
        opacity: '0.8',
        zIndex: 2,
        '&:hover': {
            backgroundColor: '#000',
            color: '#fff',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    left: {
        left: 0,
        top: '40%',
        transform: 'translateY(60%)',
    },
    right: {
        right: 0,
        top: '40%',
        transform: 'translateY(60%)',
    },
    title: {
        textAlign: 'center',
        fontWeight: 500,
        marginBottom: '24px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.5rem',
        }
    },
    cardContainer: {
        flexWrap: 'nowrap',
        color: '#000000',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: '1rem',
        }
    }
}));

export default useStyles;
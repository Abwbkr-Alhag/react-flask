import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: '#800000',
        padding: '0 10px',
        flexDirection: 'row',
        alignItems: 'center',
        transition: theme.transitions.create(['backgroundColor', 'height']),
        height: '80px',
    },
    iconButton: {
        marginRight: '8px',
        marginLeft: '8px',
        padding: '8px',
    },
    navLinks: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
    },
    links: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        placeItems: 'center',
        textDecoration: 'none',
        cursor: 'pointer',
        color: 'white',
        height: '100%',
        padding: '10px min(55px,1.5vw)',
        transition: theme.transitions.create('background'),
        '&:hover': {
            backgroundColor: '#700000',
        },
    },
    logoWrapper: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        transition: theme.transitions.create('background'),
        '&:hover': {
            backgroundColor: '#700000',
        }
    },
    menu: {
        backgroundColor: '#900000',
        borderRadius: '0px',
        width: '100vw',
    },
    menuItem: {
        color: 'white',
        padding: '5px 15px',
    }
}))

export default useStyles;
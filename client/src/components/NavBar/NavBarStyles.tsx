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
    search: {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        padding: '2.5px 2.5px 2.5px 10px',
        borderRadius: '4px',
        marginRight: theme.spacing(1),
        marginLeft: 'auto',
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            backgroundColor:  '#8D1A1A',
            '&:hover,&:focus-within': {
                width: '25ch',
                backgroundColor: '#932626',
            },
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            backgroundColor: '#932626'
        }
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
    input: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
    searchIcon: {
        transition: theme.transitions.create('color'),
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
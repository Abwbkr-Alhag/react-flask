import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        height: 'auto',
        backgroundColor: '#111111',
        padding: '24px 4vw',
        marginTop: '16px'
    },
    listItem: {
        paddingLeft: '8px',
        paddingBottom: '4px',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
        }
    },
    title: {
        marginBottom: '8px',
        color: '#ffffff',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
        }
    },
    routerLink: {
        textDecoration: 'none',
        color: '#ffffff',
        transitions: theme.transitions.create('color'),
        '&:hover': {
            color: '#EEBC1D'
        }
    },
    contactRow: {
        paddingBottom: '8px',
        gap: '4px',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
            textAlign: 'center',
        }
    },
    icon: {
        color: '#ffffff',
        cursor: 'pointer',
    },
    aboutUsIconRow: {
        marginTop: theme.spacing(1),
        gap: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
        }
    },
    aboutDesc: {
        marginRight: theme.spacing(2),
        color: '#ffffff',
        [theme.breakpoints.down('xs')]: {
            margin: '0 auto',
            textAlign: 'center',
            maxWidth: '400px',
        }
    },
    list: {
        [theme.breakpoints.down('xs')]: {
            listStyle: 'none'
        }
    }
}))

export default useStyles;
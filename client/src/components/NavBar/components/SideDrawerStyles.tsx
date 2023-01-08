import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    drawerContainer: {
        width: '250px',
        maxWidth: '70vw',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderRight: '0.0625px solid #333333',
    },
    header: {
        backgroundColor: '#800000',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '10px 0',
        borderBottom: '2px solid black',
    },
    linkWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: "#EEEEEE",
        flexGrow: 1,
    },
    link: {
        color: '#000000',
        backgroundColor: "#EEEEEE",
        paddingLeft: '10px',
        textDecoration: 'none',
        fontSize: '1.25rem',
        padding: '20px 0',
        transition: theme.transitions.create('background'),
        '&:hover': {
            backgroundColor: "#CCCCCC"
        },
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '10px'
    },
    IconRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '10px',
        marginTop: 'auto',
        marginBottom: '12px'
    }
}))

export default useStyles;
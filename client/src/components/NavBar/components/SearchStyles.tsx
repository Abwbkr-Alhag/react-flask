import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
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
                borderBottomLeftRadius: '0',
                borderBottomRightRadius: '0',
            },
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            backgroundColor: '#932626'
        }
    },
    searchIcon: {
        transition: theme.transitions.create('color'),
    },
    input: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
}))

export default useStyles
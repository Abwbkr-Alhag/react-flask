import { makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme : Theme) => ({
    container: {
        position: 'relative',
        '--button-padding': '1.75rem',
        '--button-border-radius': '0.5rem',
        marginBottom: '1rem',
        textAlign: 'center',
    },
    title: {
        marginBottom: '1rem',
    },
    arrowButton: {
        position: 'absolute',
        top: '60%',
        transform: 'translateY(-40%)',
        padding: 'var(--button-padding) 0px',
        width: '32px',
        borderRadius: 0,
        zIndex: 1,
        '&:hover': {
            backgroundColor: '#000',
            opacity: 0.75,
        }
    },
    left: {
        left: 'calc(24px + 0.1rem)',
        borderTopRightRadius: 'var(--button-border-radius)',
        borderBottomRightRadius: 'var(--button-border-radius)',
        [theme.breakpoints.down('xs')]: {
            left: 'calc(16px + 0.1rem)'
        }
    },
    right: {
        right: 'calc(24px + 0.1rem)',
        borderTopLeftRadius: 'var(--button-border-radius)',
        borderBottomLeftRadius: 'var(--button-border-radius)',
        [theme.breakpoints.down('xs')]: {
            right: 'calc(16px + 0.1rem)'
        }
    },
    slideContainer: {
        overflow: 'hidden',
        gap: '1rem',
        padding: '0.1rem',
    }
}))

export default useStyles;
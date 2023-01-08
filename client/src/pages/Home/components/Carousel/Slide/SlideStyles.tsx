import { makeStyles, Theme } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) => ({
    cardContainer: {
        '--fontSize-md': '1rem',
        '--gap': '1rem',
        '--width': 'calc((100% / var(--itemsPerScreen)) - (var(--gap) * (var(--itemsPerScreen) - 1)/(var(--itemsPerScreen))))',
        fontSize: 'var(--fontSize-md)',
        flexBasis: 'flex: 0 0 calc((100% / var(--itemsPerScreen)) - var(--gap));',
        minWidth: 'var(--width)',
        transform: 'translateX(calc(-1 * var(--translateX) * ((100%) + var(--gap))))',
        transition: theme.transitions.create('all'),
    },
}))

export default useStyles;
import Box from '@material-ui/core/Box';
import useStyles from './LoadingStyles';

function Loading() {
    const classes = useStyles();

    return (
        <>
            <Box className={classes.background}/>
            <Box className={classes.cubeGrid}>
                <Box className={`${classes.cube} ${classes.cube1}`}/>
                <Box className={`${classes.cube} ${classes.cube2}`}/>
                <Box className={`${classes.cube} ${classes.cube3}`}/>
                <Box className={`${classes.cube} ${classes.cube4}`}/>
                <Box className={`${classes.cube} ${classes.cube5}`}/>
                <Box className={`${classes.cube} ${classes.cube6}`}/>
                <Box className={`${classes.cube} ${classes.cube7}`}/>
                <Box className={`${classes.cube} ${classes.cube8}`}/>
                <Box className={`${classes.cube} ${classes.cube9}`}/>
            </Box >
        </>
    )
}

export default Loading
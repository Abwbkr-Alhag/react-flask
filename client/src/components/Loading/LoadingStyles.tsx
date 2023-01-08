import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((_ : Theme) => ({
    background: {
        opacity: 0.25,
        backgroundColor: '#000',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 10,
    },
    cubeGrid: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        position: 'absolute',
        width: '40px',
        height: '40px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 20,
    },
    cube: {
        backgroundColor: '#333',
        animation: '$cubeGridScaleDelay 1.3s infinite ease-in-out',
    },
    cube1: {
        animationDelay: '0.2s',
    },
    cube2: {
        animationDelay: '0.3s',
    },
    cube3: {
        animationDelay: '0.4s',
    },
    cube4: {
        animationDelay: '0.1s',
    },
    cube5: {
        animationDelay: '0.2s',
    },
    cube6: {
        animationDelay: '0.3s',
    },
    cube7: {
        animationDelay: '0.0s',
    },
    cube8: {
        animationDelay: '0.1s',
    },
    cube9: {
        animationDelay: '0.2s',
    },
    '@keyframes cubeGridScaleDelay': {
        '0% 70% 100%': {
            transform: 'scale3D(1, 1, 1)'
        },
        '35%': {
            transform: 'scale3D(0, 0, 1)'
        }
    }
}))

export default useStyles
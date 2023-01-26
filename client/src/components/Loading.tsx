import { styled } from "@mui/material";
import Box from '@mui/material/Box';

const BoxKeyFrame = styled("div")({
    "@keyframes cubeGridScaleDelay": {
        "0% 70% 100%": {
            transform: "scale3D(1, 1, 1)"
        },
        "35%": {
            transform: "scale3D(0, 0, 1)"
        }
    },
    animation: 'cubeGridScaleDelay 1.3s infinite ease-in-out', 
    backgroundColor: '#333'
});

const Loading = () => {

    return (
        <>
            <Box sx={{
                opacity: '0.25',
                backgroundColor: '#000',
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: 10,
            }}/>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'auto auto auto',
                position: 'absolute',
                width: '40px',
                height: '40px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                zIndex: 20,
            }}>
                <BoxKeyFrame sx={{ animationDelay: '0.2s'}}/>
                <BoxKeyFrame sx={{ animationDelay: '0.3s'}}/>
                <BoxKeyFrame sx={{ animationDelay: '0.4s'}}/>
                <BoxKeyFrame sx={{ animationDelay: '0.1s'}}/>
                <BoxKeyFrame sx={{ animationDelay: '0.2s'}}/>
                <BoxKeyFrame sx={{ animationDelay: '0.3s'}}/>
                <BoxKeyFrame sx={{ animationDelay: '0.0s'}}/>
                <BoxKeyFrame sx={{ animationDelay: '0.1s'}}/>
                <BoxKeyFrame sx={{ animationDelay: '0.2s'}}/>
            </Box >
        </>
    )
}

export default Loading
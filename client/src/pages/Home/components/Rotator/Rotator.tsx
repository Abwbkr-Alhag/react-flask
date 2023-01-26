import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button'
import earringsRotator from './../../../../assets/images/earringsRotator_540x684.jpg';
import pendantsRotator from './../../../../assets/images/pendantsRotator_540x684.jpg';
import ringsRotator from './../../../../assets/images/ringsRotator_540x684.jpg';
import trueMod from "../../../../utils/mod";
import { useState } from "react";
import RotatorImage from "./RotatorImage.tsx/RotatorImage";
import useStyles from "./RotatorStyles";

const Rotator = () => {
    const classes = useStyles();

    const [activeSlide, setActiveSlide] = useState(1);
    
    const moveRight = () => {
        setActiveSlide(trueMod(activeSlide + 1, 3))
    }

    const moveLeft = () => {
        setActiveSlide(trueMod(activeSlide - 1, 3))
    }

    return (
        <Container component="div" className={classes.container}>
            <Typography variant="h4" className={classes.title}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, dolores.
            </Typography>
            <Divider sx={{mb: 2, borderColor: 'black'}}/>
            <Button 
                className={`${classes.arrowButton} ${classes.left}`}
                onClick={moveLeft}>
                    &#8249;
            </Button>
            <Stack direction="row" className={classes.cardContainer}>
                <RotatorImage 
                    index={0} 
                    img={earringsRotator} 
                    activeSlide={activeSlide} 
                    title="Earrings" 
                    subtitle="Our earrings are made from solid .925 Sterling Silver. They look great on our website but will look even better on you."/>
                <RotatorImage
                    index={1}
                    img={pendantsRotator}
                    activeSlide={activeSlide}
                    title="Pendants"
                    subtitle="Each piece of Hard Jewelry is made with insane attention to detail. Our pendants are no exception."/>
                <RotatorImage
                    index={2}
                    img={ringsRotator}
                    activeSlide={activeSlide}
                    title="Rings"
                    subtitle="ALL of our jewelry is made from solid metals. Each ring is available in solid .925 Sterling Silver and solid Stainless Steel."/>
            </Stack>
            <Button 
                className={`${classes.arrowButton} ${classes.right}`}
                onClick={moveRight}>
                    &#8250;
            </Button>
        </Container>
    )
}

export default Rotator
import { Button, Slide, Stack, Typography } from "@mui/material"
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import useStyles from "./RotatorImageStyles";
import { useEffect, useRef, useState } from "react";
  

interface rotatorImageProps {
    index: number,
    img: string,
    activeSlide: number,
    title: string,
    subtitle: string,
}

function RotatorImage({ index, img, activeSlide, title, subtitle}:rotatorImageProps):JSX.Element {
    const classes = useStyles();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const containerRef = useRef(null);

    const setWindow = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', setWindow);
        return () => {
          window.removeEventListener('resize', setWindow)
        }
    }, [])

    return (
        <Stack direction="column" className={activeSlide === index ? classes.cardActive : classes.card} ref={containerRef}>
            <img src={img} alt="Clickable Card" className={classes.cardImage}/>
            <Typography variant="h6" className={classes.cardTitle}>{title}</Typography>
            <Slide direction="up" timeout={0} in={windowWidth <= 960 || activeSlide === index} container={containerRef.current}>
                <div className={classes.transDiv}>
                    <Typography variant="body2" className={classes.cardSubtitle}>{subtitle}</Typography>
                    <Stack direction="row" className={classes.iconRow}>
                        <Stack direction="column" className={classes.iconColumn}>
                            <FindReplaceIcon/>
                            <Typography>Lorem</Typography>
                        </Stack>
                        <Stack direction="column" className={classes.iconColumn}>
                            <FindReplaceIcon/>
                            <Typography>Lorem</Typography>
                        </Stack>
                        <Stack direction="column" className={classes.iconColumn}>
                            <FindReplaceIcon/>
                            <Typography>Lorem</Typography>
                        </Stack>
                    </Stack>
                    <Button className={classes.cardButton}>
                        Call to Action
                    </Button>
                </div>
            </Slide>
        </Stack>
    )
}

export default (RotatorImage)
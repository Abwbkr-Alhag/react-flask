import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import useStyles from './SlideStyles';

interface SlideProps {
    img: string,
    title: string,
    desc: string,
    index: number,
    activeSlide: number,
    itemsPerScreen: number,
    setSlideRef: (element: HTMLElement | null) => void,
    setItemsRef: (element: HTMLElement | null) => void,
}

function Slide({ img, title, desc, index, activeSlide, setSlideRef }:SlideProps) {
    const classes = useStyles();

    return (
        <Card className={classes.cardContainer} ref={setSlideRef}>
            <CardMedia
                component="img"
                image={img}
                alt="Paella dish"
            />
            <CardHeader
                title={title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {desc}, {index}, {activeSlide}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Slide
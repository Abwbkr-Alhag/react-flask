import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';
import formatter from '../../../../../utils/currencyFormat';
import useStyles from './SlideStyles';

interface SlideProps {
    img: string,
    title: string,
    metal: string,
    price: number,
    desc: string,
    itemsPerScreen: number,
    setSlideRef: (element: HTMLElement | null) => void,
    setItemsRef: (element: HTMLElement | null) => void,
}

const Slide:FC<SlideProps> = ({ img, title, metal, price, desc, setSlideRef }) => {
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
                <Typography variant="body1">{metal}</Typography>
                <Typography variant="body1">{formatter.format(price)}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {desc}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Slide
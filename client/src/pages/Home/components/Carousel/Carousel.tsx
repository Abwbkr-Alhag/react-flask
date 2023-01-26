import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import Slide from './Slide/Slide';
import trueMod from '../../../../utils/mod';
import { useTheme } from 'css-vars-hook';
import { FC, useEffect, useState } from 'react';
import useStyles from './CarouselStyles';

interface CarouselItem {
    name: string,
    category: string,
    price: number,
    metal: string,
    image_arr: string[],
}

interface CarouselProps {
    carouselItems: CarouselItem[]
}

const Carousel:FC<CarouselProps> = ({
    carouselItems
}) => {
    const classes = useStyles();
    const [activeSlide, setActiveSlide] = useState(0);
    const [itemsPerScreen, setItemsPerScreen] = useState(0);
    const theme = { translateX: activeSlide, itemsPerScreen: itemsPerScreen };
    const { setRef: setSlideRef, setVariable: setSlideVariable} = useTheme(theme);
    const { setRef: setItemsRef, setVariable: setItemsVariable} = useTheme(theme);
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (windowWidth <= 600) {
            setItemsPerScreen(2);
            setItemsVariable('itemsPerScreen', 2)
        } else if (windowWidth <= 800) {
            setItemsPerScreen(3);
            setItemsVariable('itemsPerScreen', 3)
        } else if(windowWidth <= 1200) {
            setItemsPerScreen(4)
            setItemsVariable('itemsPerScreen', 4)
        } else {
            setItemsPerScreen(5)
            setItemsVariable('itemsPerScreen', 5)
        }
    }, [windowWidth, setItemsVariable])
    

    const setWindow = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', setWindow);
        return () => {
          window.removeEventListener('resize', setWindow)
        }
    }, [])

    function moveLeft() {
        setActiveSlide(trueMod(activeSlide - 1, carouselItems.length - itemsPerScreen + 1))
        setSlideVariable('translateX', activeSlide);
    }

    function moveRight() {
        setActiveSlide(trueMod(activeSlide + 1, carouselItems.length - itemsPerScreen + 1))
        setSlideVariable('translateX', activeSlide);
    }
    
    useEffect(() => {
        setActiveSlide(trueMod(activeSlide, carouselItems.length - itemsPerScreen + 1))
        setSlideVariable('translateX', activeSlide);
    }, [itemsPerScreen, activeSlide, carouselItems.length, setSlideVariable])

    const slideItems = carouselItems.map((item, index) =>
        <Slide 
        img={item.image_arr[0]} 
        title={item.name}
        metal={item.metal}
        price={item.price}
        desc="This impressive paella is a perfect party dish and a fun meal to cook
        together with your guests. Add 1 cup of frozen peas along with the mussels,
        if you like." 
        itemsPerScreen={itemsPerScreen}
        setSlideRef={setSlideRef} 
        setItemsRef={setItemsRef} 
        key={index}/>
    );

    return (
        <Container className={classes.container}>
            <Typography variant='h3' className={classes.title}>Most Popular Items</Typography>
            <Divider sx={{mb: 2, borderColor: 'black'}}/>
            <Button 
                className={`${classes.arrowButton} ${classes.left}`}
                onClick={moveLeft}>
                    &#8249;
            </Button>
            <Stack direction="row" className={classes.slideContainer}>
                {slideItems}
            </Stack>
            <Button 
                className={`${classes.arrowButton} ${classes.right}`}
                onClick={moveRight}>
                    &#8250;
            </Button>
        </Container>
    )
}

export default Carousel
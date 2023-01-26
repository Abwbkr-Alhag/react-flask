import hero from './../../../../assets/images/hero.jpg';
import black from './../../../../assets/images/black.jpg';
import { Button, ImageList, ImageListItem, Stack, Typography } from "@mui/material"
import useStyles from './HeroStyles';

const Hero = () => {
    const classes = useStyles();

    return (
        <ImageList sx={{ width: '100%', height: 'auto', position: 'relative' }} gap={0} variant="quilted" cols={4}>
            <ImageListItem rows={2} cols={3} className={classes.background}>
                <img
                src={hero}
                alt="Hero"
                />
            </ImageListItem>
            <ImageListItem rows={1} cols={1} sx={{position: 'relative'}}>
                <img
                src={black}
                alt="Assorted Jewelry"
                />
            </ImageListItem>
            <ImageListItem rows={1} cols={1}>
                <img
                src={black}
                alt="Stainless Steel Rings"
                />
            </ImageListItem>
            <Stack direction="column" className={classes.textWrapper}>
                <Typography variant="h3" className={classes.heroTitle}>Header</Typography>
                <Typography variant="subtitle1" className={classes.heroSubtitle}>Subtitle</Typography>
                <Button variant="contained" className={classes.heroButton}>Call to Action</Button>
            </Stack>
        </ImageList>
    )
}

export default Hero
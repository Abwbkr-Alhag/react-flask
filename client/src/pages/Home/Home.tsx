import SlideAndFade from '../../components/SlideAndFade';
import Hero from './components/Hero/Hero';
import Rotator from './components/Rotator/Rotator';
import Carousel from './components/Carousel/Carousel';
import httpClient from '../../utils/httpClient';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';

const Home = () => {
  const [carouselItems, setCarouselItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { data, status, error } = useQuery('carouselItems', async () => {
    const res = await httpClient.get("//localhost:5000/")
    return res.data
  })

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true)
    } else if (status === 'success') {
      setCarouselItems(data)
      setLoading(false)
    } else if (status === 'error') {
      console.log("error:", error)
    }
  }, [data, status, error])
  

  return (
    <>
      <Hero/>
      <SlideAndFade timeout={2000} direction="up">
        <Rotator/>
      </SlideAndFade>
      <SlideAndFade timeout={2000} direction="up">
        <Fade appear={loading} in={loading} unmountOnExit={true}>
          <div>
            <Container sx={{display: 'flex', flexDirection: 'column'}}>
              <Skeleton sx={{mb: 2}} animation="wave" variant="rectangular" width={'100%'} height={'90px'} />
              <Stack direction="row"  spacing={2}>
                <Skeleton animation="wave" variant="rectangular" width={'25%'} height={'450px'}/>
                <Skeleton animation="wave" variant="rectangular" width={'25%'} height={'450px'}/>
                <Skeleton animation="wave" variant="rectangular" width={'25%'} height={'450px'}/>
                <Skeleton animation="wave" variant="rectangular" width={'25%'} height={'450px'}/>
              </Stack>
            </Container>
          </div>
        </Fade>
        <Fade appear={!loading} in={!loading}>
          <div>
            <Carousel carouselItems={carouselItems}/>
          </div>
        </Fade>
      </SlideAndFade>
    </>
  )
}

export default Home
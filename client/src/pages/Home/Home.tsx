import SlideAndFade from '../../components/SlideAndFade/SlideAndFade';
import Hero from './components/Hero/Hero';
import Rotator from './components/Rotator/Rotator';
import Carousel from './components/Carousel/Carousel';

function Home() {

  return (
    <>
      {/*Hero Section elements, using a quilt to render the hero image*/}
      <Hero/>
      <SlideAndFade timeout={2000} direction="up">
        <Rotator/>
      </SlideAndFade>
      <SlideAndFade timeout={2000} direction="up">
        <Carousel/>
      </SlideAndFade>
    </>
  )
}

export default Home
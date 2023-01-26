import { FC, useEffect, useState } from 'react'
import { Fade, SpeedDial } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
};

const ConditionalSpeedDial:FC = () => {
    const [visible, setVisible] = useState(false);
    const [windowHeight, setWindowHeight] = useState(window.scrollY);

    useEffect(() => {
        if (windowHeight > 400) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [windowHeight])

    const setWindow = () => {
        setWindowHeight(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener('scroll', setWindow);
        return () => {
            window.removeEventListener('scroll', setWindow)
        }
    }, [])

    return (
        <Fade in={visible}>
            <SpeedDial
            onClick={scrollToTop}
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<KeyboardArrowUpIcon onClick={scrollToTop} />}
            />
        </Fade>
    )
}

export default ConditionalSpeedDial

import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import { FC, useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

interface SlideAndFadeProps {
    children: React.ReactNode,
    timeout: number,
    direction: "left" | "right" | "up" | "down" | undefined,
}

const SlideAndFade:FC<SlideAndFadeProps> = ({ children, timeout, direction }) => {
    const [ active, setActive ] = useState(false);

    function onChange(isVisible: boolean):void {
        if (isVisible && !active) {
            setActive(isVisible);
        }
    }
    
    return (
        <VisibilitySensor
            onChange={onChange}
            partialVisibility
            delayedCall>
            <div>
                <Slide in={active} timeout={timeout} direction={direction}>
                    <div>
                        <Fade in={active} timeout={timeout}>
                            <div>
                                {children}
                            </div>
                        </Fade>
                    </div>
                </Slide>
            </div>
        </VisibilitySensor>
    )
}

export default SlideAndFade
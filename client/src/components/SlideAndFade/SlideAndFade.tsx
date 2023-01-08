import { Fade, Slide } from '@mui/material';
import { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

interface Props {
    children: React.ReactNode,
    timeout: number,
    direction: "left" | "right" | "up" | "down" | undefined,
}

function SlideAndFade({ children, timeout, direction }:Props):JSX.Element {
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
import { styled } from '@mui/material'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { shoppingCartItem } from '../context/ShoppingCartProvider';
import formatter from '../utils/currencyFormat';
import { Link } from 'react-router-dom'


interface ZoomSquareProps {
    gridItem: shoppingCartItem
}

const StyledImg = styled("img")({
    minWidth: '100%',
    minHeight: '100%',
    transition: 'scale 300ms ease',
    objectFit: 'cover',
    ':hover': {
        scale: '1.1'
    }
});

const ZoomSquare:FC<ZoomSquareProps> = ({
    gridItem
}) => {

    return (
        <Stack direction="column" spacing={1} sx={{mb: 2}}>
            <Link style={{backgroundColor: "#F8F8F8", overflow: 'hidden', display: 'flex'}} to={'/shop/:' + String(gridItem.itemID)}>
                <StyledImg 
                src={gridItem.cover} 
                alt="Product, zoom on hover" />
            </Link>
            <Link style={{textDecoration: "none", color: 'initial'}} to={`/shop/${gridItem.itemID}`}>
                <Typography variant="subtitle1">{gridItem.name}</Typography>
            </Link>
            <Typography variant="subtitle2">{formatter.format(gridItem.price)}</Typography>
        </Stack>
    )
}

export default ZoomSquare

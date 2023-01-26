import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { FC } from 'react'
import useShoppingCart from '../../../context/ShoppingCartProvider'
import Box from '@mui/material/Box';

interface CartItemProps {
    id: number,
    name: string,
    price: number,
    itemQuantity: number,
    maxQuantity: number,
    metal: string,
    category: string,
    size: number,
    cover: string,
}

const CartItem:FC<CartItemProps> = ({
    id, name, price, itemQuantity, maxQuantity, metal, category, size, cover
}) => {

    const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();

    return (
        <Stack sx={{alignItems: 'center', flexDirection: {xs: 'column', md: 'row'}, gap: '16px'}}>
            <Box sx={{position: 'relative'}}>
                <CloseIcon 
                    sx={{cursor: 'pointer', borderRadius: '50%', backgroundColor: '#F6F7FB', p:'6px', 
                        position: 'absolute', top: '0', left: '0', transform: 'translate(-50%,-50%)', 
                        border: '3px solid white', fontSize: '40px'}} 
                        onClick={() => removeFromCart(id, size)}
                    />
                <img 
                style={{height: '100px', width: '100px'}}
                src={cover}
                alt="Product Cover"/>
            </Box>
            <Stack direction="column" sx={{flexBasis: '100%', alignItems: {xs: 'center', md: 'flex-start'}}}>
                <Typography>{name}</Typography>
                <Typography>Metal: {metal}</Typography>
                <Typography>Size: {size}</Typography>
                <Typography>Price: {price}</Typography>
            </Stack>
            <Stack direction="row" sx={{ml: {xs: '0', md: 'auto'}, alignItems: 'center'}} spacing={2}>
                <RemoveIcon 
                    fontSize="large"
                    sx={{cursor: 'pointer', borderRadius: '50%', backgroundColor: '#F6F7FB', p:1}}
                    onClick={() => decreaseCartQuantity(id, size)}/>
                <Typography sx={{fontWeight: 'bold'}}>{itemQuantity}</Typography>
                <AddIcon
                    fontSize="large"
                    sx={{cursor: 'pointer', borderRadius: '50%', backgroundColor: '#F6F7FB', p:1}}
                    onClick={() => increaseCartQuantity(id, name, price, 1, maxQuantity, metal, category, size, cover)}/>
            </Stack>
        </Stack>
    )
}

export default CartItem

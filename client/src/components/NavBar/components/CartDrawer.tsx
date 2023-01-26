import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { FC } from 'react'
import useShoppingCart from '../../../context/ShoppingCartProvider';
import CartItem from './CartItem';
import formatter from '../../../utils/currencyFormat';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Collapse from '@mui/material/Collapse';

const CartDrawer:FC = () => {

    const { cartItems, isOpen, toggleCart, getTotalPrice, clearCart } = useShoppingCart();

    // const cartItemsMapped = cartItems.map((item, index) => (

    //     <>
    //         <Collapse key={item.itemID + item.size}>
    //             <CartItem id={item.itemID} name={item.name} price={item.price} itemQuantity={item.itemQuantity} maxQuantity={item.maxQuantity} metal={item.metal} category={item.category} size={item.size} cover={item.cover}/>
    //             {index !== (cartItems.length - 1) && <Divider/> }
    //         </Collapse>
    //     </>

    // ))

    return (
        <Drawer 
            ModalProps={{ keepMounted: true }} 
            anchor={'right'} 
            open={isOpen} 
            onClose={toggleCart}
            keepMounted={true}>
            <Stack direction="column"
                sx={{width: 'calc(min(600px, 70vw))',
                maxWidth: '70vw',
                height: 1,
                alignItems: 'flex-start',
                borderLeft: '0.0625px solid #333333',
                textAlign: 'center',
                p: {xs: 3, md: 6}}}>
                <Stack direction="column" sx={{width: 1, height: 1}} spacing={4}>
                    <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between'}}>
                        <Typography sx={{fontSize: {xs: '1.5rem', md: '2.125rem'}}}>
                            Cart Review
                        </Typography>
                        <CloseIcon 
                            fontSize="large"
                            sx={{cursor: 'pointer', borderRadius: '50%', backgroundColor: '#F6F7FB', p:1}} 
                            onClick={toggleCart}/>
                    </Stack>
                    <Divider/>
                    <TransitionGroup style={{display: 'flex', flexDirection: 'column', gap: '28px'}}>
                        {cartItems.map((item, index) => (
                            <Collapse key={item.itemID + item.size}>
                                <CartItem id={item.itemID} name={item.name} price={item.price} itemQuantity={item.itemQuantity} maxQuantity={item.maxQuantity} metal={item.metal} category={item.category} size={item.size} cover={item.cover}/>
                                {index !== (cartItems.length - 1) && <Divider sx={{mt: 1.5}}/> }
                            </Collapse>
                        ))}
                    </TransitionGroup>
                    <Stack direction="column" sx={{flexBasis: '100%', alignItems: 'center', justifyContent: 'flex-end', pb: 2}} spacing={2}>
                        <Divider orientation='horizontal' sx={{width: 1}}/>
                        <Stack direction="row" sx={{width: 1, justifyContent: 'space-between'}}>
                            <Typography variant="h6">Subtotal:</Typography>
                            <Typography variant="h6">{formatter.format(getTotalPrice())}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="secondary" onClick={clearCart} sx={{whiteSpace: 'nowrap'}}>Clear Cart</Button>
                            <Button variant="contained" color="primary">Checkout</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Drawer>
    )
}

export default CartDrawer

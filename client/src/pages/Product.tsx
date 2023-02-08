import { Typography, Divider, FormControlLabel, Radio, Button, styled, RadioGroup, Breadcrumbs, Skeleton } from '@mui/material'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import transitions from '@material-ui/core/styles/transitions';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from 'css-vars-hook';
import httpClient from '../utils/httpClient';
import formatter from '../utils/currencyFormat';
import useShoppingCart from '../context/ShoppingCartProvider';

interface Product {
    itemID: number,
    name: string,
    price: number,
    category: string,
    metal: string,
    created_at: Date,
    popularity: number,
}

interface Attr {
    id: number,
    size: number,
    quantity: number,
}

const CenterImage = styled("img")({
    borderRadius: '5px', 
    display: 'flex', 
    flexBasis: '100%', 
    minWidth: '100%', 
    transform: 'translateX(calc(-1 * var(--translateX) * 100%))',
    transition: 'transform 1000ms ease',
})

const Product:FC = () => {
    const [quantity, setQuantity] = useState(0);
    const [sizeValue, setSizeValue] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<Product>({} as Product);
    const [attrArr, setAttrArr] = useState<Attr[]>();
    const [imageArr, setImageArr] = useState<string[]>();
    const [imageIndex, setImageIndex] = useState<number>(0);
    const { increaseCartQuantity } = useShoppingCart();
    const { id } = useParams();
    // CSS Variables, in order to set css variables using state we need these variables,
    // SetRef sets the DOM object to have its css changed and setVariable edits its value
    const theme = { translateX: imageIndex };
    const { setRef, setVariable} = useTheme(theme);
    // URL id Parameter
    const itemID = parseInt(id?.substring(1) as string)

    const StyledThumbImage = styled("img")(({ theme }) => ({
        borderRadius: '15px',
        transition: transitions.create('border'),
        border: '2px solid transparent',
        cursor: 'pointer',
        '&:hover,&:hover,&:active': {
            borderColor: '#3577f0'
        },
        [theme.breakpoints.down('md')]: {
            minWidth: `calc(100% / ${imageArr!.length})`
        }
    }));

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuantity(0)
        setSizeValue(parseFloat(event.target.value))
    }

    const increaseQuantity = () => {
        const found = attrArr?.find(element => element.size === sizeValue)
        if (found) {
            setQuantity(Math.min(quantity + 1, found.quantity))
        }
    }

    const decreaseQuantity = () => {
        const found = attrArr?.find(element => element.size === sizeValue)
        if (found) {
            setQuantity(Math.max(quantity - 1, 0))
        }
    }

    const imageSwap = (index:number) => {
        setImageIndex(index)
        setVariable('translateX', index)
        return undefined
    }

    const disableButton = (item: Attr):boolean => {
        const found = attrArr?.find(element => element.size === item.size)
        if (found) {
            return !(found.quantity > 0);
        } else {
            return true;
        }
    }

    const addToCart = (numberAdded: number) => {
        const found = attrArr?.find(element => element.size === sizeValue)
        increaseCartQuantity(product.itemID, product.name, product.price, numberAdded, found!.quantity, 
            product.metal, product.category, found!.size, imageArr![0])
    }

    const { data, status, error } = useQuery(['productGrid', itemID], async () => {
        const res = await httpClient.post(`//localhost:5000/shop/${itemID}`, {
            id: itemID
        })
        return res.data;
    }, {
        keepPreviousData: true,
    })

    useEffect(() => {
        if (status === 'loading') {
            setLoading(true)
        } else if (status === 'success') {
            setProduct(data.product)
            setAttrArr(data.attr_arr)
            setImageArr(data.image_arr)
            setLoading(false)
        } else if (status === 'error') {
            console.log("error:", error)
        }
    }, [data, status, error])

    return (
        <>
            { loading ? 
            <>
                <Stack direction="row" sx={{alignItems: "center", justifyContent: "space-between", py: 6, px: [2, 5, 8, 11]}}>
                    <Stack direction="column" spacing={4}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link to="/" style={{color: 'black', textDecoration: 'none'}}>
                                Home
                            </Link>
                            <Link to="/shop" style={{color: 'black', textDecoration: 'none'}}>
                                Shop All
                            </Link>
                            <Skeleton variant="text" width="200px" height="20px"/>
                        </Breadcrumbs>
                        <Typography variant="h4" sx={{fontWeight: 'bold'}}>Explore All Products</Typography>
                    </Stack>
                    <Skeleton/>
                </Stack>
                <Container sx={{display: 'flex', pt: 6, gap: '32px', px: {xs: '25px', md: '50px !important'}, flexDirection: {xs: "column", md: "row"}}}>
                    <Stack sx={{maxWidth: {"md" : '100px'}, 
                        minWidth: {"xs" : '0px', "md" : '60px'}, flexBasis: {"xs" : '0px', "md" : '10%'}, 
                        flexDirection: {xs: "row", md:"column"}, gap: 0}}>
                        {[...Array(6)].map((_) => <Skeleton height="105px" width="75px"/>)}
                    </Stack>
                    <Stack direction="column" sx={{flexBasis: {'xs': '100%', 'md': '50%'}, maxWidth: {'xs': '100%', 'md': '50%'}}}>
                        <Skeleton variant="rectangular" width="100%" height="75%"/>
                    </Stack>
                    <Stack direction="column" sx={{flexBasis: {'xs': '100%', 'md': '50%'}, maxWidth: {'xs': '100%', 'md': '50%'}}}>
                        <Skeleton variant="rectangular" height="100%" width="100%"/>
                    </Stack>
                </Container>
            </>
            :
            <>
                <Stack direction="row" sx={{backgroundColor: "#F8F8F8", alignItems: "center", justifyContent: "space-between", py: 6, px: [2, 5, 8, 11]}}>
                    <Stack direction="column" spacing={4}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link to="/" style={{color: 'black', textDecoration: 'none'}}>
                                Home
                            </Link>
                            <Link to="/shop" style={{color: 'black', textDecoration: 'none'}}>
                                Shop All
                            </Link>
                            <Link to={"/shop/:" + product.itemID} style={{color: 'black', textDecoration: 'none'}}>
                                {product.name}
                            </Link>
                        </Breadcrumbs>
                        <Typography variant="h4" sx={{fontWeight: 'bold'}}>Explore All Products</Typography>
                    </Stack>
                    <img src="https://new.axilthemes.com/demo/template/etrade/assets/images/product/product-45.png" alt="Product" />
                </Stack>
                <Container sx={{display: 'flex', pt: 6, gap: '32px', px: {xs: '25px', md: '50px !important'}, flexDirection: {xs: "column", md: "row"}}}>
                    <Stack sx={{maxWidth: {"md" : '100px'}, 
                            minWidth: {"xs" : '0px', "md" : '60px'}, flexBasis: {"xs" : '0px', "md" : '10%'}, 
                            flexDirection: {xs: "row", md:"column"}, gap: {xs: 0, md: 2}}}>
                        {imageArr && imageArr.map((image, index) => <StyledThumbImage src={image} key={image + index} style={{borderColor:  imageIndex === index ? '#3577f0' : ''}} onClick={() => imageSwap(index)}/>)}
                    </Stack>
                    <Stack direction="column" sx={{flexBasis: {'xs': '100%', 'md': '50%'}, maxWidth: {'xs': '100%', 'md': '50%'}}}>
                        <Stack direction="row" sx={{overflow: 'hidden'}}>
                            {imageArr && imageArr.map((item, index) => <CenterImage src={item} alt="" ref={setRef} key={index}/>)}
                        </Stack>
                    </Stack>
                    <Stack direction="column" sx={{flexBasis: {'xs': '100%', 'md': '50%'}, maxWidth: {'xs': '100%', 'md': '50%'}, boxShadow: 3, p: 5}} spacing={2}>
                        <Typography variant="h4" sx={{fontWeight: 'bold', textAlign: {'xs': 'center', 'md': 'start'}}}>{product.name}</Typography>
                        <Typography variant="h5" sx={{fontWeight: '500', textAlign: {'xs': 'center', 'md': 'start'}}}>{formatter.format(product.price)}</Typography>
                        <Divider/>
                        <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis, cupiditate?</Typography>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            sx={{ display: 'grid', gridTemplateColumns: '0.33fr 0.33fr 0.33fr', gap: '2px'}}
                            onChange={handleRadioChange}
                            value={sizeValue}
                            >
                            {attrArr && attrArr.map((item) => <FormControlLabel key={item.id} value={item.size} control={<Radio />} label={item.size} disabled={disableButton(item)}/>)}
                        </RadioGroup>
                        <Stack direction="row" sx={{justifyContent: 'center', alignItems: 'center'}} spacing={2}>
                            <RemoveIcon 
                                fontSize="large"
                                sx={{cursor: 'pointer', borderRadius: '50%', backgroundColor: '#F6F7FB', p:1}}
                                onClick={decreaseQuantity}/>
                            <Typography sx={{fontWeight: 'bold', userSelect: 'none'}}>{quantity}</Typography>
                            <AddIcon
                                fontSize="large"
                                sx={{cursor: 'pointer', borderRadius: '50%', backgroundColor: '#F6F7FB', p:1}}
                                onClick={increaseQuantity}/>
                        </Stack>
                        <Stack direction="row" sx={{justifyContent: 'center', alignItems: 'center'}} spacing={2}>
                            <Button variant="contained" sx={{width: '200px'}} onClick={() => addToCart(quantity)}>Add To Cart</Button>
                            <FavoriteBorderIcon sx={{cursor: 'pointer'}}/>
                        </Stack>
                    </Stack>
                </Container>
            </>
            }
        </>
    )
}

export default Product

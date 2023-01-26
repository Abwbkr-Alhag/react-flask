import Grid from '@mui/material/Unstable_Grid2';
import { FC } from 'react'
import ZoomSquare from './ZoomSquare';
import { shoppingCartItem } from '../context/ShoppingCartProvider';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';

interface ProductGridProps {
    productGridItems: shoppingCartItem[],
    loading: boolean,
    isFetching: boolean,
}

const ProductGrid:FC<ProductGridProps> = ({
    productGridItems, loading, isFetching
}) => {
    
    const gridItems = productGridItems.map((item, index) =>
        <Grid sm={6} md={6} lg={4} key={index}>
            <Fade appear={true} in={!(loading || isFetching)}>
                <div>
                    <ZoomSquare gridItem={item} key={item.itemID}/>
                </div>
            </Fade>
        </Grid>
    );

    const loadingItems = [...Array(12)].map((_, index) => {
        return (
            <Grid sm={6} md={6} lg={4}>
                <Fade appear={true} in={loading || isFetching}>
                    <div>
                        <Stack direction="column" spacing={1} sx={{mb:2}} key={index}>
                            <Skeleton variant="rectangular" animation="wave" height='245px' width='100%'/>
                            <Skeleton variant="rectangular" animation="wave" width="100%"/>
                            <Skeleton variant="rectangular" animation="wave" width="100%"/>
                        </Stack>
                    </div>
                </Fade>
            </Grid>
        )
    })

    return (
        <Grid container spacing={2} sx={{pl: [0, 0, 3, 3], justifyContent: ['center', 'flex-start','flex-start','flex-start']}}>
            {loading || isFetching ? loadingItems : gridItems}
        </Grid>
    )
}

export default ProductGrid

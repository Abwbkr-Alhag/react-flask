// Material UI Components
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// React Components
import { ChangeEvent, FC, useEffect, useState } from 'react'
// Insourced Components
import ProductGrid from '../../components/ProductGrid'
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Slider from '@mui/material/Slider';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import formatter from '../../utils/currencyFormat';
import { Breadcrumbs, Pagination, styled } from '@mui/material';
import ConditionalSpeedDial from '../../components/ConditionalSpeedDial';
import httpClient from '../../utils/httpClient';
import { useQuery } from 'react-query';
import { shoppingCartItem } from '../../context/ShoppingCartProvider';


const StyledAccordion = styled(Accordion)({
  width: [1,1,'330px','330px'],
  flexShrink: 0, 
  borderBottom: '1px solid rgba(0, 0, 0, 0.12) !important', 
  margin: '0 !important', 
  padding: '4px', 
  '&:before': {
    display: 'none'
  },
});


const LIMIT = 12
const radioArr = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5]

const Shop:FC = () => {
  const [sortBy, setSortBy] = useState('latest')
  const [value, setValue] = useState<number[]>([0, 100]);
  const [radioValue, setRadioValue] = useState<string>('All');
  const [metalValue, setMetalValue] = useState<string>('All');
  const [categoryValue, setCategoryValue] = useState<string>('All');
  const [productGridItems, setProductGridItems] = useState<shoppingCartItem[]>([])
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [count, setCount] = useState<number>(0)

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const handleSelectChange = (event: SelectChangeEvent<typeof sortBy>) => {
    setSortBy(event.target.value)
  };
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(String(event.target.value))
  }
  const handleMetalChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMetalValue(event.target.value)
  }
  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryValue(event.target.value)
  }
  const resetChanges = () => {
    setSortBy('latest')
    setValue([0, 100])
    setRadioValue('All')
    setMetalValue('All')
    setCategoryValue('All')
  }
  const queryChanges = () => {
    setLoading(true)
    setPage(0);
    refetch();
    setLoading(false)
  }
  const paginationChange = (_: ChangeEvent<unknown>, page: number) => {
    let top = 216
    if (window.innerWidth < 900) {
      top+=380
    }
    window.scrollTo({
      top: top, 
      behavior: 'smooth'
    });
    setPage(page - 1)
  }

  const { data, status, error, refetch, isFetching } = useQuery(['productGrid', page], async () => {
    let asc:boolean = false
    if (sortBy === 'oldest' || sortBy === 'Name ASC' || sortBy === 'Price ASC') {
      asc = true
    }
    let orderBy = ""
    if (sortBy === 'latest' || sortBy === "oldest") {
      orderBy = "created_at"
    } else if (sortBy === 'popular') {
      orderBy = "popularity"
    } else if (sortBy === 'Name ASC' || sortBy === 'Name DESC') {
      orderBy = "name"
    } else if (sortBy === 'Price ASC' || sortBy === 'Price DESC') {
      orderBy = "price"
    } else {
      console.log("ERROR: ", sortBy)
    }
    const price_minimum = Math.min(...value)
    const price_maximum = Math.max(...value)
    const res = await httpClient.post("//localhost:5000/shop", {
      category: categoryValue,
      metal: metalValue,
      size: radioValue,
      price_min: price_minimum,
      price_max: price_maximum,
      order_by: orderBy,
      asc: asc,
      page: page,
    })
    return res.data
  }, {
    keepPreviousData: true,
    refetchOnMount: "always",
  })

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true)
    } else if (status === 'success') {
      setProductGridItems(data.results)
      setCount(data.count)
      setLoading(false)
    } else if (status === 'error') {
      console.log("error:", error)
    }
  }, [data, status, error])
  

  return (
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
          </Breadcrumbs>
          <Typography variant="h4" sx={{fontWeight: 'bold'}}>Explore All Products</Typography>
        </Stack>
        <img src="https://new.axilthemes.com/demo/template/etrade/assets/images/product/product-45.png" alt="Product" />
      </Stack>
      <Stack sx={{pt: 8, px: [1, 5, 8, 11], flexDirection: ["column","column","row","row"]}}>
        <Paper elevation={1} sx={{height: 'fit-content', p: 1, pb: 2, mb: 2}}>
          <StyledAccordion elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{textTransform: 'uppercase'}}>Jewelry Category</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                value={categoryValue}
                name="radio-buttons-group"
                onChange={handleCategoryChange}
              >
                <FormControlLabel value="All" control={<Radio />} label="All" />
                <FormControlLabel value="Ring" control={<Radio />} label="Ring" />
                <FormControlLabel value="Pendant" control={<Radio />} label="Pendant" />
                <FormControlLabel value="Earring" control={<Radio />} label="Earring" />
              </RadioGroup>
            </AccordionDetails>
          </StyledAccordion>
          <StyledAccordion elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{textTransform: 'uppercase'}}>Metal Material</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                value={metalValue}
                name="radio-buttons-group"
                onChange={handleMetalChange}
              >
                <FormControlLabel value="All" control={<Radio />} label="All" />
                <FormControlLabel value="Stainless Steel" control={<Radio />} label="Stainless Steel" />
                <FormControlLabel value="Sterling Silver" control={<Radio />} label="Sterling Silver" />
              </RadioGroup>
            </AccordionDetails>
          </StyledAccordion>
          <StyledAccordion elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{textTransform: 'uppercase'}}>Size</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                sx={{ display: 'grid', gridTemplateColumns: '0.33fr 0.33fr 0.33fr', gap: '2px'}}
                onChange={handleRadioChange}
                value={radioValue}
              >
                <FormControlLabel value={"All"} control={<Radio />} label="All" />
                {radioArr.map((size) => <FormControlLabel key={size} value={size} control={<Radio />} label={size}/>)}
              </RadioGroup>
            </AccordionDetails>
          </StyledAccordion>
          <StyledAccordion elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{textTransform: 'uppercase'}}>Price</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{textAlign: 'center'}}>
              <Slider
                sx={{mt: 1}}
                value={value}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={0}
                max={100}
              />
              <Typography>Price Range: {formatter.format(value[0])} - {formatter.format(value[1])}</Typography>
            </AccordionDetails>
          </StyledAccordion>
          <Stack direction="row" sx={{mt: 2}}>
            <Button variant="contained" color="secondary" sx={{mx: 'auto', width: '45%', height: '40px'}}
                onClick={resetChanges}>RESET</Button>
            <Button variant="contained" color="primary" sx={{mx: 'auto', width: '45%', height: '40px'}}
                onClick={queryChanges}>SUBMIT</Button>
          </Stack>
        </Paper>
        <Stack direction="column" sx={{flexBasis: '100%'}}>
          <Stack direction="row" spacing={2} sx={{ml: [0, 0, 'auto'], mb: 3, alignItems: "center", flexDirection:["column","column","row"]}}>
              <Typography variant="subtitle1" sx={{whiteSpace: "nowrap"}}>Showing {((page + 1) * LIMIT) - 11}-{Math.min((page + 1) * LIMIT, count)} of {count ? count: '#'} results</Typography>
              <FormControl sx={{minWidth: '220px'}}>
                <Select value={sortBy} onChange={handleSelectChange}>
                  <MenuItem value={"latest"}>Sort By Latest</MenuItem>
                  <MenuItem value={"oldest"}>Sort By Oldest</MenuItem>
                  <MenuItem value={"popular"}>Sort By Most Popular</MenuItem>
                  <MenuItem value={"Name ASC"}>Sort By Name (A-&gt;Z)</MenuItem>
                  <MenuItem value={"Name DESC"}>Sort By Name (Z-&gt;A)</MenuItem>
                  <MenuItem value={"Price ASC"}>Sort By Price ($-&gt;$$$)</MenuItem>
                  <MenuItem value={"Price DESC"}>Sort By Price ($$$-&gt;$)</MenuItem>
                </Select>
              </FormControl>
          </Stack>
          <ProductGrid productGridItems={productGridItems} loading={ loading } isFetching={ isFetching }/>
          <Pagination page={page + 1} count={Math.ceil(count / LIMIT)} sx={{mx: 'auto', mb: 2}} onChange={paginationChange}/>
        </Stack>
      </Stack>
      <ConditionalSpeedDial/>
    </>
  )
}

export default Shop

import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, FocusEvent, MouseEvent, FC, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import useStyles from './SearchStyles';
import httpClient from '../../../utils/httpClient';
import useDebounce from '../../../hooks/useDebounce';
import Menu from '@mui/material/Menu';
import { shoppingCartItem } from '../../../context/ShoppingCartProvider';
import Typography from '@mui/material/Typography';

interface SearchProps {
    trigger: boolean,
}

const Search:FC<SearchProps> = ({
    trigger
}) => {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState('');
    const debouncedInput = useDebounce(searchInput, 500);
    const [searchItems, setSearchItems] = useState<shoppingCartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [anchorSearch, setAnchorSearch] = useState<null | HTMLElement>(null);
    const searchRef = useRef<any>();


    const handleSearchClose = () => {
        setAnchorSearch(null);
    }
    useEffect(() => {
        setAnchorSearch(null);
    }, [trigger])

    const { data, status, error } = useQuery(['search', debouncedInput], async () => {
        if (debouncedInput) {
          const res = await httpClient.post("//localhost:5000/search", {
            search_name: debouncedInput
          })
          return res.data
        }
    })

    useEffect(() => {
        if (status === 'loading') {
            setLoading(true)
        } else if (status === 'success') {
            setSearchItems(data)
            setLoading(false)
        } else if (status === 'error') {
            console.log("error:", error)
        }
    }, [data, status, error])

    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        if (!anchorSearch) {
            setAnchorSearch(event.currentTarget)
        }
        setSearchInput(event.target.value)
    }

    const handleSearchFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        if (!anchorSearch) {
            setAnchorSearch(event.currentTarget)
        }
    }

    const handleSearchClick = (event: MouseEvent<HTMLDivElement>) => {
        if (!anchorSearch) {
            setAnchorSearch(event.currentTarget)
        }
    }

    return (
        <Box className={classes.search}>
          <Box sx={{display: 'flex', placeItems: 'center'}} onClick={handleSearchClick}>
            <SearchIcon className={classes.searchIcon} sx={{cursor:'pointer'}}/>
          </Box>
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            className={classes.input}
            onChange={handleSearchInput}
            onClick={handleSearchClick}
            onFocus={handleSearchFocus}
            ref={searchRef}
            sx={{color: 'white'}}
            required
          />
          <Menu
            anchorEl={anchorSearch}
            id="account-menu"
            open={Boolean(anchorSearch)}
            onClose={handleSearchClose}
            disableScrollLock={true}
            disableAutoFocus={true}
            disableAutoFocusItem={true}
            disableRestoreFocus={true}
            keepMounted={true}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            PaperProps={{
                style: {
                    width: '225px',
                    marginTop: '3px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    marginLeft: '5px',
                    borderTopLeftRadius: '0',
                    borderTopRightRadius: '0',
                },
            }}
          >
            <Box sx={{
                display: 'flex', 
                flexDirection: 'column', 
                gap: '7.5px'}}>
                {loading && <Typography variant="body2">Loading...</Typography>}
                {!loading && searchInput === '' && <Typography variant="body2">Type to Search!</Typography>}
                {!loading && searchInput !== '' && searchItems && searchItems.length === 0 && <Typography variant="body2">No Results Found</Typography>}
                {searchItems && searchItems.map((item, index) => 
                    <Link key={index} to={"/shop/:" + item.itemID} onClick={handleSearchClose}
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '5px', textDecoration: 'none'}}>
                        <img src={item.cover} alt="" style={{width: '75px', height: 'auto'}}/>
                        <Typography variant="body1" sx={{textAlign: 'right', color: 'initial'}}>{item.name}</Typography>
                    </Link>
                )}
            </Box>
          </Menu>
        </Box>
    )
}

export default Search

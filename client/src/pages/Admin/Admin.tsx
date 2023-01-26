import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { FC, useState } from 'react'
import httpClient from '../../utils/httpClient';
import Typography from '@mui/material/Typography';
import Loading from '../../components/Loading';


const Admin:FC = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const addRandomProduct = () => {

    setLoading(true)
    httpClient.post("//localhost:5000/new_product", {
      // No body needed
    }).then((res) => {
      setError(res.data.success)
    }).catch((err) => {
      console.log(err)
      setError(err.response.data.error)
    })
    setLoading(false)
  }

  return (
    <>
      {loading && <Loading/>}
      <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column'}}>
        <Button onClick={addRandomProduct}>
          Add Random Product
        </Button>
        <Typography>{error}</Typography>
      </Container>
    </>
  )
}

export default Admin

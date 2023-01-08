import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';

const Layout = () => {
    return (
        <>
            <NavBar/>
            {/* patch fixed that works however its unintuitive, navBar is static and needs to push content down */}
            <main style={{marginTop: '80px', minHeight: '100vh'}}>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout
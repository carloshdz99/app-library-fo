import { Box } from "@mui/material"
import { Toolbar } from '@mui/material';

import { Navbar, SideBar } from "../../components/";

import { useSelector } from 'react-redux';

export const DashboardLayout = ({ children }) => {
    // tomamos el estado del menu
    const { drawerWidth } = useSelector(state => state.menu);

    return (
        <Box sx={{ display: 'flex' }}>

            {/** navbar */}
            <Navbar />

            {/** sidebar */}
            <SideBar />

            <Box
                component='main'
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, }}>
                <Toolbar />

                {/** Toolbar */}
                {children}

            </Box>

        </Box>
    )
}

import { MenuOutlined, LogoutOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"

// importamos redux
import { useDispatch, useSelector } from 'react-redux';
import { openMenu } from '../store/menu';

export const Navbar = () => {
    const dispatch = useDispatch();

    // tomamos el estado del menu
    const { drawerWidth } = useSelector(state => state.menu);

    const toggleDrawer = () => {
        dispatch(openMenu(250));
    }

    return (
        <AppBar position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                transition: 0.2,
            }}>

            <Toolbar>
                <IconButton
                    onClick={toggleDrawer}
                    color='inherit'
                    edge='start'
                    sx={{ mr: 2, display: { sm: 'block' } }}>
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant="h6" noWrap component="div" > Inventory-app</Typography>

                    <IconButton color='error'>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>

            </Toolbar>

        </AppBar>
    );
};

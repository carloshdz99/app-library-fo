import React from 'react';
import { Person } from "@mui/icons-material";
import { Box, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Typography } from "@mui/material";

// importamos redux
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu } from '../store/menu';
import { Link } from 'react-router-dom';

export const SideBar = () => {
    const dispatch = useDispatch();

    const rutas = [
        {
            url: '/books/',
            name: 'Libros',
        },
        {
            url: '/books/binnacle',
            name: 'Historial Socilitudes'
        }
    ];

    // tomamos el estado del menu
    const { activo, anchor, drawerWidth } = useSelector(state => state.menu);

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        dispatch(closeMenu(0));
    };

    // se crean los elementos de las rutas
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : drawerWidth }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {
                    rutas.map(text => (
                        <MenuItem key={text.name}>
                            <Typography textAlign="center">
                                <Link style={{ textDecoration: 'none', color: 'black'}} to={text.url}>{text.name} </Link>
                            </Typography>
                        </MenuItem>
                    ))
                }
            </List>
        </Box>
    )

    return (
        <div>
            <React.Fragment key={anchor}>
                <Drawer
                    anchor={anchor}
                    open={activo}
                    onClose={toggleDrawer(anchor, false)}
                >
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
        </div>
    );

}
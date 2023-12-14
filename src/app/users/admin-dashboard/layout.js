'use client';


import { ThemeProvider, createTheme } from '@mui/material';
import UserContext from '@context/userContext';
import '@styles/globals.css'
import '@styles/farmer-dashboard.css'

import React from 'react';

import { IconButton, Stack } from '@mui/material';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import InsightsIcon from '@mui/icons-material/Insights';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';



export default function FarmerDashboardLayout({ children }) {
    const router = useRouter()

    const [tabOpened, setTabOpened] = React.useState('Dashboard')

    React.useEffect(() => {

        const allTabs = document.querySelectorAll('.admin-dashboard .nav-btns');

        allTabs.forEach(element => {
            if (element.classList.contains("active")) {
                element.classList.remove("active");
            }

        });
        allTabs.forEach(element => {
            if (element.querySelector('p').innerHTML == tabOpened) {
                element.classList.add("active");
            }

        });
        console.log(tabOpened)
    }, [tabOpened])


    const [user, setUser] = React.useState({ id: '24532rwr2' })

    // React.useEffect(() => {
    //     const fetchuser = async () => {
    //         try {
    //             const postData = {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             };

    //             const res = await fetch(
    //                 '/api/get-info/Farmer',
    //                 postData
    //             )
    //             const resData = await res.json()
    //             setUser({ ...resData.user_data })
    //         } catch (error) {
    //             console.log(error);
    //             setUser(undefined)
    //         }
    //     }
    //     fetchuser()
    // }, []);

    return (

        <main style={{ height: 'calc(100vh - 80px)', width: '100%', backgroundColor: "var(--color-bg-1)" }}>
            <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
                <UserContext.Provider value={{ user, setUser, tabOpened, setTabOpened }}>


                    <section className='admin-dashboard' style={{
                        height: '100%',
                        width: '100%',
                    }}>
                        <header class="fd-header" style={{
                            backgroundColor: '#6d8c54',
                        }}>
                            <div class="w-layout-blockcontainer fd-nav-container w-container">
                                <div class="w-layout-hflex" style={{
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    {/* <h1 class="fd-nav-heading-h1">Harvest Hive</h1> */}
                                    <img src="/images/logo.png" alt="logo"
                                        style={{
                                            height: '70px'
                                        }}
                                    />
                                    <ul role="list" class="fd-nav-icon-list">

                                        <Tooltip title='Messages'>
                                            <Link href={'farmer-dashboard/message'}>
                                                <IconButton size="large" aria-label="show 4 new mails" color="#fff">
                                                    <Badge badgeContent={4} color="error">
                                                        <MailIcon className='fd-nav-icon' />
                                                    </Badge>
                                                </IconButton>
                                            </Link>
                                        </Tooltip>


                                        <Tooltip title="Notifications">
                                            <IconButton
                                                size="large"
                                                aria-label="show 17 new notifications"
                                                color="#fff"
                                            >
                                                <Badge badgeContent={17} color="error">
                                                    <NotificationsIcon className='fd-nav-icon' />
                                                </Badge>
                                            </IconButton>
                                        </Tooltip>

                                        {/* <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                            <div style={{minHeight: "400px", width: '400px'}}>

                                <div style={{
                                display:'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '20px 10px 20px 30px',
                                }}>
                                <h5 style={{margin: 0}}>Notification</h5>
                                <IconButton onClick={handleCloseUserMenu}><CloseIcon/></IconButton>
                                </div>
                                                    <List
                                                        component="nav"
                                                        style={{
                                                        height: ''
                                                        }}
                                                        sx={{
                                                            p: 0,
                                                            '& .MuiListItemButton-root': {
                                                                py: 0.5,
                                                                '& .MuiAvatar-root': avatarSX,
                                                                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                                                            }
                                                        }}
                                                    >
                                                        <ListItemButton>
                                                            <ListItemAvatar>
                                                                <Avatar
                                                                    sx={{
                                                                        color: 'success.main',
                                                                        bgcolor: 'success.lighter'
                                                                    }}
                                                                >
                                                                    <GiftOutlined />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                style={{
                                                                fontSize: '16px'
                                                                }}
                                                                primary={
                                                                    <Typography variant="text">
                                                                    <Typography component="span" variant="subtitle1">
                                                                        Sifatul Sultan
                                                                    </Typography>{' '}
                                                                    offer a new price
                                                                    </Typography>
                                                                }
                                                                secondary="2 min ago"
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <Typography variant="caption" noWrap>
                                                                    3:00 AM
                                                                </Typography>
                                                            </ListItemSecondaryAction>
                                                        </ListItemButton>
                                                        <Divider />
                                                        <ListItemButton>
                                                            <ListItemAvatar>
                                                                <Avatar
                                                                    sx={{
                                                                        color: 'primary.main',
                                                                        bgcolor: 'primary.lighter'
                                                                    }}
                                                                >
                                                                    <MessageOutlined />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={
                                                                <Typography variant="text">
                                                                    <Typography component="span" variant="subtitle1">
                                                                    Sowad Feruk
                                                                    </Typography>{' '}
                                                                    are following your project 'Deshi Tometo'
                                                                </Typography>
                                                            }
                                                                secondary="5 August"
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <Typography variant="caption" noWrap>
                                                                    6:00 PM
                                                                </Typography>
                                                            </ListItemSecondaryAction>
                                                        </ListItemButton>
                                                        <Divider />
                                                        <ListItemButton>
                                                            <ListItemAvatar>
                                                                <Avatar
                                                                    sx={{
                                                                        color: 'error.main',
                                                                        bgcolor: 'error.lighter'
                                                                    }}
                                                                >
                                                                    <SettingOutlined />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={
                                                                <Typography variant="text">
                                                                    <Typography component="span" variant="subtitle1">
                                                                    Joshim Islam
                                                                    </Typography>{' '}
                                                                    are following your project 'Fresh Cabbage'
                                                                </Typography>
                                                            }
                                                                secondary="7 hours ago"
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <Typography variant="caption" noWrap>
                                                                    2:45 PM
                                                                </Typography>
                                                            </ListItemSecondaryAction>
                                                        </ListItemButton>
                                                        <Divider />
                                                        <ListItemButton>
                                                            <ListItemAvatar>
                                                                <Avatar
                                                                    sx={{
                                                                        color: 'primary.main',
                                                                        bgcolor: 'primary.lighter'
                                                                    }}
                                                                >
                                                                    C
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={
                                                                <Typography variant="text">
                                                                    <Typography component="span" variant="subtitle1">
                                                                    Wasi Haider
                                                                    </Typography>{' '}
                                                                    offer a new price
                                                                </Typography>
                                                            }
                                                                secondary="Daily scrum meeting time"
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <Typography variant="caption" noWrap>
                                                                    9:10 PM
                                                                </Typography>
                                                            </ListItemSecondaryAction>
                                                        </ListItemButton>
                                                        <Divider />

                                                        <ListItemButton>
                                                            <ListItemAvatar>
                                                                <Avatar
                                                                    sx={{
                                                                        color: 'primary.main',
                                                                        bgcolor: 'primary.lighter'
                                                                    }}
                                                                >
                                                                    C
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={
                                                                <Typography variant="text">
                                                                    <Typography component="span" variant="subtitle1">
                                                                    Bishal Das
                                                                    </Typography>{' '}
                                                                    offer a new price
                                                                </Typography>
                                                            }
                                                                secondary="Daily scrum meeting time"
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <Typography variant="caption" noWrap>
                                                                    12:15 PM
                                                                </Typography>
                                                            </ListItemSecondaryAction>
                                                        </ListItemButton>
                                                        <Divider />
                                                        <ListItemButton sx={{ textAlign: 'center', py: `${12}px !important` }}>
                                                            <ListItemText
                                                                primary={
                                                                    <Typography variant="text" color="primary">
                                                                        View All
                                                                    </Typography>
                                                                }
                                                            />
                                                        </ListItemButton>
                                                    </List>





















                            </div>
                            </Menu> */}

                                        <Tooltip title='Logout'>
                                            <IconButton
                                                size="large"
                                                aria-label="show 17 new notifications"
                                                color="#fff"
                                            >
                                                <LogoutIcon className='fd-nav-icon' />
                                            </IconButton>
                                        </Tooltip>

                                    </ul>
                                </div>
                            </div>
                        </header>

                        <div style={{ display: 'flex', height: '100%' }}>
                            <div className='side-bar'
                                style={{
                                    height: '100%',
                                    backgroundColor: '#244441',
                                    width: '350px',
                                    marginTop: '10px',
                                    borderRadius: '0 10px 10px 0',
                                    boxShadow: '5px 10px 20px 1px #152426'
                                }}
                            >


                                <Stack style={{ padding: '20px 0' }}>


                                    <Link href={'/users/admin-dashboard'}>
                                        <div className='nav-btns active'
                                            style={{
                                                display: 'flex',
                                                height: '40px',
                                                alignItems: 'center',
                                                borderBottom: '1px solid #315d59',
                                                transition: '100ms all',
                                                cursor: 'pointer'
                                            }}>

                                            <div className='side-style' style={{ height: '100%', width: '5px', transition: '100ms all', }}></div>

                                            <div style={{
                                                display: 'flex',
                                                padding: '10px',
                                                gap: '20px',
                                                alignItems: 'center'
                                            }}>
                                                <DashboardIcon style={{ color: '#fff' }} />
                                                <Typography style={{ color: '#fff', fontWeight: '700', fontFamily: 'Livvic', fontSize: '18px' }}>Dashboard</Typography>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link href={'/users/admin-dashboard/farmer'}>
                                        <div className='nav-btns'
                                            style={{
                                                display: 'flex',
                                                height: '40px',
                                                alignItems: 'center',
                                                borderBottom: '1px solid #315d59',
                                                transition: '100ms all',
                                                cursor: 'pointer'
                                            }}>

                                            <div className='side-style' style={{ height: '100%', width: '5px', transition: '100ms all', }}></div>

                                            <div style={{
                                                display: 'flex',
                                                padding: '10px',
                                                gap: '20px',
                                                alignItems: 'center'
                                            }}>
                                                <AssignmentIndIcon style={{ color: '#fff' }} />
                                                <Typography style={{ color: '#fff', fontWeight: '700', fontFamily: 'Livvic', fontSize: '18px' }}>Farmer</Typography>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link href={'/users/admin-dashboard/trader'}>
                                        <div className='nav-btns'
                                            style={{
                                                display: 'flex',
                                                height: '40px',
                                                alignItems: 'center',
                                                borderBottom: '1px solid #315d59',
                                                transition: '100ms all',
                                                cursor: 'pointer'
                                            }}>

                                            <div className='side-style' style={{ height: '100%', width: '5px', transition: '100ms all', }}></div>

                                            <div style={{
                                                display: 'flex',
                                                padding: '10px',
                                                gap: '20px',
                                                alignItems: 'center'
                                            }}>
                                                <AssignmentIndIcon style={{ color: '#fff' }} />
                                                <Typography style={{ color: '#fff', fontWeight: '700', fontFamily: 'Livvic', fontSize: '18px' }}>Trader</Typography>
                                            </div>
                                        </div>
                                    </Link>


                                    <Link href={'/users/admin-dashboard/wholesaler'}>
                                        <div className='nav-btns'
                                            style={{
                                                display: 'flex',
                                                height: '40px',
                                                alignItems: 'center',
                                                borderBottom: '1px solid #315d59',
                                                transition: '100ms all',
                                                cursor: 'pointer'
                                            }}>

                                            <div className='side-style' style={{ height: '100%', width: '5px', transition: '100ms all', }}></div>

                                            <div style={{
                                                display: 'flex',
                                                padding: '10px',
                                                gap: '20px',
                                                alignItems: 'center'
                                            }}>
                                                <AssignmentIndIcon style={{ color: '#fff' }} />
                                                <Typography style={{ color: '#fff', fontWeight: '700', fontFamily: 'Livvic', fontSize: '18px' }}>Wholesaler</Typography>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link href={"/users/admin-dashboard/imbalanced_stock"}>
                                        <div className='nav-btns'
                                            style={{
                                                display: 'flex',
                                                height: '40px',
                                                alignItems: 'center',
                                                borderBottom: '1px solid #315d59',
                                                transition: '100ms all',
                                                cursor: 'pointer'
                                            }}>

                                            <div className='side-style' style={{ height: '100%', width: '5px', transition: '100ms all', }}></div>

                                            <div style={{
                                                display: 'flex',
                                                padding: '10px',
                                                gap: '20px',
                                                alignItems: 'center'
                                            }}>
                                                <PieChartIcon style={{ color: '#fff' }} />
                                                <Typography style={{ color: '#fff', fontWeight: '700', fontFamily: 'Livvic', fontSize: '18px' }}>Imbalanced Stock</Typography>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* <Link href={"/users/admin-dashboard/product_track"}>
                                        <div className='nav-btns'
                                            style={{
                                                display: 'flex',
                                                height: '40px',
                                                alignItems: 'center',
                                                borderBottom: '1px solid #315d59',
                                                transition: '100ms all',
                                                cursor: 'pointer'
                                            }}>

                                            <div className='side-style' style={{ height: '100%', width: '5px', transition: '100ms all', }}></div>

                                            <div style={{
                                                display: 'flex',
                                                padding: '10px',
                                                gap: '20px',
                                                alignItems: 'center'
                                            }}>
                                                <LegendToggleIcon style={{ color: '#fff' }} />
                                                <Typography style={{ color: '#fff', fontWeight: '700', fontFamily: 'Livvic', fontSize: '18px' }}>Avg. Price</Typography>
                                            </div>
                                        </div>
                                    </Link> */}


                                    <Link href={"/users/admin-dashboard/price_bound"}>
                                        <div className='nav-btns'
                                            style={{
                                                display: 'flex',
                                                height: '40px',
                                                alignItems: 'center',
                                                borderBottom: '1px solid #315d59',
                                                transition: '100ms all',
                                                cursor: 'pointer'
                                            }}>

                                            <div className='side-style' style={{ height: '100%', width: '5px', transition: '100ms all', }}></div>

                                            <div style={{
                                                display: 'flex',
                                                padding: '10px',
                                                gap: '20px',
                                                alignItems: 'center'
                                            }}>
                                                <MultilineChartIcon style={{ color: '#fff' }} />
                                                <Typography style={{ color: '#fff', fontWeight: '700', fontFamily: 'Livvic', fontSize: '18px' }}>Price Bound</Typography>
                                            </div>
                                        </div>
                                    </Link>



                                    <div className='nav-btns'
                                        style={{
                                            display: 'flex',
                                            height: '40px',
                                            alignItems: 'center',
                                            borderBottom: '1px solid #315d59',
                                            transition: '100ms all',
                                            cursor: 'pointer'
                                        }}>

                                        <div className='side-style' style={{ height: '100%', width: '5px', transition: '100ms all', }}></div>

                                        <div style={{
                                            display: 'flex',
                                            padding: '10px',
                                            gap: '20px',
                                            alignItems: 'center'
                                        }}>
                                            <InsightsIcon style={{ color: '#fff' }} />
                                            <Typography style={{ color: '#fff', fontWeight: '700', fontFamily: 'Livvic', fontSize: '18px' }}>Analytics</Typography>
                                        </div>
                                    </div>


                                    <Link href={"/users/admin-dashboard/product_track"}>
                                        <div className='nav-btns'
                                            style={{
                                                display: 'flex',
                                                height: '40px',
                                                alignItems: 'center',
                                                borderBottom: '1px solid #315d59',
                                                transition: '100ms all',
                                                cursor: 'pointer'
                                            }}>

                                            <div className='side-style' style={{ height: '100%', width: '5px', transition: '100ms all', }}></div>

                                            <div style={{
                                                display: 'flex',
                                                padding: '10px',
                                                gap: '20px',
                                                alignItems: 'center'
                                            }}>
                                                <QueryStatsIcon style={{ color: '#fff' }} />
                                                <Typography style={{ color: '#fff', fontWeight: '700', fontFamily: 'Livvic', fontSize: '18px' }}>Product Track</Typography>
                                            </div>
                                        </div>
                                    </Link>




                                </Stack>

                            </div>




                            <div style={{ width: '100%' }}>
                                {children}
                            </div>



                        </div>
                    </section>





                </UserContext.Provider>

            </ThemeProvider>

        </main>
    )
}

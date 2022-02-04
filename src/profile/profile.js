import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '../assets/css/profile.css'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArticleIcon from '@mui/icons-material/Article';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Users from './users';
// import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

function Profile(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const history = useHistory();

  const drawer = (
    <div>
      <div>
        <Stack direction="row" spacing={2}>
            <div className='top'>
                <Avatar className='avatar' src="/broken-image.jpg" />
                <div>
                    <Button style={{color:'gray'}}>
                      <span style={{textTransform: 'capitalize',fontSize: '14px'}}>Easwaran</span>
                      <br/>
                      <span style={{position: 'absolute',marginTop: '30px',fontSize: '11px',textTransform: 'capitalize',}}>Edit Profile</span>
                    </Button>
                </div>
            </div>
        </Stack>
      </div>
      <Divider />
      <List>
        {['Request', (localStorage.getItem('vendor') !== null) ? 'Request Completed' : 'Request History', 'Save locations', 'Prefered vendors'].map((text, index) => (
          <ListItem button key={text} onClick={() => setHead(text)}>
            <ListItemIcon>
              {index === 0 ? <ArticleIcon /> : index === 1 ? <AccessTimeIcon /> : index === 2 ? <LocationOnIcon /> : <BookmarkIcon />}
            </ListItemIcon>
            <ListItemText primary={text} style={{fontSize:18}} />
          </ListItem>
        ))}
      </List>

        <List>
            {['Setings', 'Logout'].map((text, index) => (
            <ListItem button key={text} onClick={() => setHead(text)}>
                <ListItemIcon>
                {index === 0 ? <SettingsIcon /> : index === 1 ? <LogoutIcon /> : null}
                </ListItemIcon>
                <ListItemText primary={text} style={{fontSize:20}} onClick={() => {
                  if(index === 1) {
                    localStorage.removeItem('token');
                    document.location.href = '/';
                  }
                }} />
            </ListItem>
            ))}
        </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const [head,setHead] = React.useState('Request');

  return (
    <div>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          marginTop: '79px',
          backgroundColor:'white'
        }}
      >
        <Toolbar style={{margin:'auto'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon style={{color:'black'}} />
          </IconButton>
          <Typography variant="h4" noWrap component="div" style={{color:'black'}}>
            {head}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <div className='container'>
            <Paper
                component="form"
                sx={{ p: '10px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                >
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1,fontSize:20 }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
            </Paper>

            <br/><br/><br/>

            <div>
                <Users head={head} setHead={setHead} />
            </div>

        </div>
      </Box>
    </Box>
    </div>
  );
}

Profile.propTypes = {
  window: PropTypes.func,
};

export default Profile;
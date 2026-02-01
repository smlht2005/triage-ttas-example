import React, { useState } from 'react';
import { 
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider, 
  IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Avatar, Tooltip, Container, useTheme, Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  AssignmentInd as TriageIcon,
  People as PatientIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Notifications as NotifyIcon,
  Person as PersonIcon,
  Emergency as EmergencyIcon
} from '@mui/icons-material';
import { GRADIENTS, SHADOWS } from '../theme/theme';

const drawerWidth = 260;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: '儀表板', icon: <DashboardIcon />, id: 'dashboard' },
    { text: '快速檢傷', icon: <TriageIcon />, id: 'triage', active: true },
    { text: '候診名單', icon: <PatientIcon />, id: 'patients' },
    { text: '歷史紀錄', icon: <HistoryIcon />, id: 'history' },
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 醫院 Logo 區 */}
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        background: GRADIENTS.primary,
        color: 'white',
        mb: 2
      }}>
        <EmergencyIcon fontSize="large" />
        <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
          醫域醫院 HIS
        </Typography>
      </Box>

      {/* 選單列表 */}
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton 
              selected={item.active}
              sx={{ 
                borderRadius: 2,
                '&.Mui-selected': {
                  background: 'rgba(102, 126, 234, 0.1)',
                  color: theme.palette.primary.main,
                  '& .MuiListItemIcon-root': { color: theme.palette.primary.main }
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 45 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: item.active ? 700 : 500 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />
      
      <Divider />
      
      {/* 使用者資訊區 */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>陳</Avatar>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>陳大明 醫師</Typography>
          <Typography variant="caption" color="text.secondary">急診室 A 區</Typography>
        </Box>
        <IconButton size="small" sx={{ ml: 'auto' }}><SettingsIcon fontSize="small" /></IconButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* AppBar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          color: 'text.primary'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              icon={<PersonIcon fontSize="small" />} 
              label="當前病人：王小明 (M123456789)" 
              color="primary" 
              variant="outlined" 
              sx={{ fontWeight: 'bold' }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="搜尋"><IconButton><SearchIcon /></IconButton></Tooltip>
            <Tooltip title="通知"><IconButton><NotifyIcon /></IconButton></Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none', boxShadow: SHADOWS.hover },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none', borderRight: '1px solid rgba(0,0,0,0.05)' },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px'
        }}
      >
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
    </Box>
  );
};

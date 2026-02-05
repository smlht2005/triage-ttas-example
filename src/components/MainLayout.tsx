/**
 * 專案名稱：醫域醫院 HIS 系統
 * 檔案名稱：MainLayout.tsx
 * 
 * 更新時間：2026-02-04 15:57
 * 更新人員：AI Assistant
 * 更新摘要：修復 AppBar 在 InfoBar 打開時向左移動的問題
 *   - 移除 AppBar width 對 infoOpen 的依賴，保持固定寬度
 *   - 移除 AppBar marginRight 對 infoOpen 的依賴，保持固定位置
 *   - AppBar 現在始終保持固定位置，只有 InfoBar 從右側滑入/滑出
 *   - 確保 InfoBar 的 z-index 足夠高，覆蓋在 AppBar 上方
 * 
 * 更新時間：2026-02-04 15:40
 * 更新人員：AI Assistant
 * 更新摘要：修復 UI 佈局問題 - AppBar 重疊與主內容區域間隙
 *   - Mark 1: 修復帳戶資訊與病人 Chip 重疊（改用 flex 居中，移除絕對定位）
 *   - Mark 2: 修復主內容區域與側邊欄間隙（移除多餘的 margin-left）
 *   - Toolbar: 移除 paddingRight，改用更小的值避免右側間隙
 *   - 響應式優化: 病人 Chip 在窄視窗中自動收縮，不會與帳戶資訊重疊
 * 
 * 更新時間：2026-02-02 16:00
 * 更新人員：AI Assistant
 * 更新摘要：調整帳戶資訊到真正的 top-right 位置，主內容區域擴展到側邊欄邊界
 *   - Mark 1: 帳戶資訊調整到 AppBar 最右上角（移除 flex:1，添加 pr:0，ml:auto）
 *   - Mark 2: 主內容區域左側擴展到側邊欄邊界（移除 Main Content padding，在 Container 內部添加）
 *   - UX 優化: 確保帳戶資訊緊貼右邊緣，工作區域最大化空間利用
 * 
 * 更新時間：2026-02-02 15:55
 * 更新人員：AI Assistant
 * 更新摘要：實作 InfoBar 彈出時的佈局優化（Mark 1-4）與 UX/UI Pro Max 級優化
 *   - Mark 1: 帳戶資訊在 InfoBar 打開時更靠右，添加視覺高亮
 *   - Mark 2: 主內容區域擴展到接近 InfoBar 和 Sidebar 邊界，最大化空間利用
 *   - Mark 3: 側邊欄收合按鈕向上移動，優化視覺平衡
 *   - Mark 4: 病人資訊居中對齊，使用絕對定位實現完美居中
 *   - UX 優化: 添加 Fade/Slide 動畫、GPU 加速、微交互效果、視覺引導
 * 
 * 更新時間：2026-02-02 15:50
 * 更新人員：AI Assistant
 * 更新摘要：實作側邊欄收合功能與帳戶資訊移至右上角，優化 UI/UX 體驗
 * 
 * 更新時間：2026-02-02 15:34
 * 更新人員：AI Assistant
 * 更新摘要：修復 ESLint 錯誤（縮排和引號格式）
 * 
 * 更新時間：2026-02-02
 * 修改人員：Tao (AI Assistant)
 * 修改說明：修復手機版 Header 內容溢出導致 InfoBar 按鈕不可見的問題，精簡移動端顯示
 */
import React, { useState } from 'react';
import { 
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider, 
  IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Avatar, Tooltip, Container, useTheme, Chip, useMediaQuery, Stack,
  Menu, MenuItem, Fade, Slide
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
  LocalHospital as EmergencyIcon,
  Psychology as AIIcon,
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { GRADIENTS, SHADOWS } from '../theme/theme';
import { TriageDashboard } from './TriageDashboard';
import { PatientList } from './PatientList';
import { StepperForm } from './StepperForm';
import { InfoBar } from './InfoBar';
import { useTriageForm } from '../hooks/useTriageForm';
import { FormProvider } from 'react-hook-form';

const drawerWidth = 260;
const collapsedDrawerWidth = 72; // 收合時僅顯示圖標的寬度
const infoBarWidthDesktop = 320;

export const MainLayout: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(isDesktop);
  const [currentView, setCurrentView] = useState('triage');
  const [sidebarOpen, setSidebarOpen] = useState(true); // 桌面版側邊欄收合狀態
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null);

  // 將表單狀態提升至 Layout 層級，實現 InfoBar 連動
  const triageForm = useTriageForm();
  const { formMethods, autoLevel } = triageForm;
  const formData = formMethods.watch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  const menuItems = [
    { text: '儀表板', icon: <DashboardIcon />, id: 'dashboard' },
    { text: '快速檢傷', icon: <TriageIcon />, id: 'triage' },
    { text: '候診名單', icon: <PatientIcon />, id: 'patients' },
    { text: '歷史紀錄', icon: <HistoryIcon />, id: 'history' },
  ];

  const renderContent = () => {
    switch (currentView) {
    case 'dashboard': return <TriageDashboard />;
    case 'patients': return <PatientList />;
    case 'triage': return <StepperForm triageForm={triageForm} />;
    default: return <StepperForm triageForm={triageForm} />;
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* 標題區域 - 支援收合 */}
      <Box sx={{ 
        p: sidebarOpen ? 3 : 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: sidebarOpen ? 'flex-start' : 'center',
        gap: sidebarOpen ? 2 : 0,
        background: GRADIENTS.primary,
        color: 'white',
        mb: 2,
        minHeight: 64,
        transition: theme.transitions.create(['padding', 'gap'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
      }}>
        <EmergencyIcon fontSize="large" sx={{ flexShrink: 0 }} />
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold', 
            letterSpacing: 1,
            opacity: sidebarOpen ? 1 : 0,
            width: sidebarOpen ? 'auto' : 0,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            transition: theme.transitions.create(['opacity', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
          }}
        >
          醫域醫院 HIS
        </Typography>
      </Box>

      {/* 導航選單 */}
      <List sx={{ px: sidebarOpen ? 1 : 0.5 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <Tooltip title={!sidebarOpen ? item.text : ''} placement="right" arrow>
              <ListItemButton 
                selected={currentView === item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileOpen(false);
                }}
                sx={{ 
                  borderRadius: 2,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  minHeight: 48,
                  px: sidebarOpen ? 2 : 1,
                  transition: theme.transitions.create(['padding', 'justify-content'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.standard,
                  }),
                  '&.Mui-selected': {
                    background: 'rgba(102, 126, 234, 0.1)',
                    color: theme.palette.primary.main,
                    '& .MuiListItemIcon-root': { color: theme.palette.primary.main },
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.15)',
                    }
                  },
                  '&:hover': {
                    background: 'rgba(0, 0, 0, 0.04)',
                    transform: 'translateX(4px)',
                  }
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: sidebarOpen ? 40 : 'auto',
                    justifyContent: 'center',
                    transition: theme.transitions.create('min-width', {
                      easing: theme.transitions.easing.sharp,
                      duration: theme.transitions.duration.standard,
                    }),
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    variant: 'body2', 
                    fontWeight: currentView === item.id ? 700 : 500 
                  }}
                  sx={{
                    opacity: sidebarOpen ? 1 : 0,
                    width: sidebarOpen ? 'auto' : 0,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    transition: theme.transitions.create(['opacity', 'width'], {
                      easing: theme.transitions.easing.sharp,
                      duration: theme.transitions.duration.standard,
                    }),
                  }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      {/* 收合/展開按鈕 - 向上移動 (Mark 3) */}
      {!isMobile && (
        <Box sx={{ 
          p: 1, 
          borderTop: '1px solid rgba(0,0,0,0.05)',
          mt: 2, // 向上移動，增加與選單的間距
          mb: 2, // 增加底部間距，視覺上向上移動
        }}>
          <Tooltip title={sidebarOpen ? '收合側邊欄' : '展開側邊欄'} placement="right" arrow>
            <IconButton
              onClick={handleSidebarToggle}
              sx={{
                width: '100%',
                borderRadius: '50%',
                color: 'text.secondary',
                bgcolor: 'rgba(0, 0, 0, 0.02)',
                '&:hover': {
                  background: 'rgba(102, 126, 234, 0.1)',
                  color: theme.palette.primary.main,
                  transform: 'scale(1.1) rotate(180deg)',
                  boxShadow: SHADOWS.card,
                },
                transition: theme.transitions.create(['background', 'color', 'transform', 'box-shadow'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.short,
                }),
              }}
            >
              {sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* 1. Header (AppBar) */}
      <AppBar 
        position="fixed" 
        sx={{ 
          width: { 
            lg: `calc(100% - ${sidebarOpen ? drawerWidth : collapsedDrawerWidth}px)`,
            sm: `calc(100% - ${sidebarOpen ? drawerWidth : collapsedDrawerWidth}px)`,
            xs: '100%' 
          },
          ml: { 
            sm: `${sidebarOpen ? drawerWidth : collapsedDrawerWidth}px`, 
            xs: 0 
          },
          // 移除 mr，讓 AppBar 保持固定位置，不隨 InfoBar 移動
          bgcolor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          color: 'text.primary',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin-left'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          pl: { xs: 1, sm: 2 }, // 左側 padding
          paddingRight: { xs: '4px', sm: '8px' }, // 右側極小 padding
          minHeight: 64,
          gap: 1, // 元素之間的間距
        }}>
          {/* 左側區域 - 手機版漢堡選單 */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexShrink: 0,
          }}>
            <IconButton 
              color="inherit" 
              edge="start" 
              onClick={handleDrawerToggle} 
              sx={{ 
                display: { sm: 'none' },
                '&:hover': {
                  background: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* 中間：病人資訊 - 使用 flex 居中，避免重疊 (Mark 4) */}
          <Fade in={true} timeout={300}>
            <Box sx={{ 
              flex: 1, // 佔據剩餘空間
              display: 'flex',
              justifyContent: 'center', // 居中對齊
              minWidth: 0, // 允許收縮
              overflow: 'hidden', // 防止溢出
            }}>
              <Chip 
                icon={<PersonIcon fontSize="small" />} 
                label={isMobile ? '王小明' : '當前病人：王小明 (M123456789)'}
                color="primary" 
                variant="outlined" 
                sx={{ 
                  fontWeight: 'bold', 
                  borderRadius: 3,
                  maxWidth: { xs: '150px', sm: '300px', md: 'none' }, // 響應式最大寬度
                  bgcolor: infoOpen ? 'rgba(102, 126, 234, 0.05)' : 'transparent',
                  borderColor: infoOpen ? theme.palette.primary.main : undefined,
                  '& .MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis' },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: infoOpen ? SHADOWS.card : 'none',
                  '&:hover': {
                    transform: 'translateY(-2px) scale(1.02)',
                    boxShadow: SHADOWS.hover,
                    bgcolor: 'rgba(102, 126, 234, 0.1)',
                  }
                }}
              />
            </Box>
          </Fade>

          {/* 右側：功能按鈕和帳戶資訊 - 真正的 top-right (Mark 1) */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-end',
            gap: 0.5,
            flexShrink: 0, // 防止收縮，保持位置
          }}>
            {/* AI 輔助分析按鈕 */}
            <Tooltip title="AI 輔助分析" arrow>
              <IconButton 
                onClick={() => setInfoOpen(!infoOpen)} 
                color={infoOpen ? 'primary' : 'default'}
                sx={{ 
                  bgcolor: infoOpen ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: infoOpen ? 'rgba(102, 126, 234, 0.15)' : 'rgba(0, 0, 0, 0.04)',
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <AIIcon />
              </IconButton>
            </Tooltip>
            
            {/* 搜尋按鈕 - 手機版隱藏 */}
            {!isMobile && (
              <Tooltip title="搜尋" arrow>
                <IconButton
                  sx={{
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      background: 'rgba(0, 0, 0, 0.04)',
                      transform: 'scale(1.1)',
                    }
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            )}
            
            {/* 通知按鈕 */}
            <Tooltip title="通知" arrow>
              <IconButton 
                size={isMobile ? 'small' : 'medium'}
                sx={{
                  position: 'relative',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    background: 'rgba(0, 0, 0, 0.04)',
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <NotifyIcon />
                {/* 可選：通知徽章 */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'error.main',
                    border: '2px solid white',
                  }}
                />
              </IconButton>
            </Tooltip>

            {/* 帳戶資訊 - 真正的 top-right (Mark 1) */}
            <Fade in={true} timeout={300}>
              <Tooltip title="帳戶選單" arrow>
                <Box
                  onClick={handleAccountMenuOpen}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    ml: 1,
                    pl: 1.5,
                    pr: { xs: 1, sm: 2 }, // 桌面版右側 padding，貼近 AppBar 邊緣
                    py: 0.5,
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: infoOpen ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
                    bgcolor: infoOpen ? 'rgba(102, 126, 234, 0.08)' : 'transparent',
                    boxShadow: infoOpen ? SHADOWS.card : 'none',
                    '&:hover': {
                      background: infoOpen ? 'rgba(102, 126, 234, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                      borderColor: infoOpen ? theme.palette.primary.dark : 'rgba(0, 0, 0, 0.08)',
                      transform: 'translateY(-2px)',
                      boxShadow: SHADOWS.hover,
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.secondary.main, 
                      width: 32, 
                      height: 32, 
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      boxShadow: SHADOWS.card,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: infoOpen ? GRADIENTS.primary : theme.palette.secondary.main,
                      '&:hover': {
                        transform: 'scale(1.15) rotate(5deg)',
                        boxShadow: SHADOWS.hover,
                      }
                    }}
                  >
                    陳
                  </Avatar>
                  {!isMobile && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontWeight: 'bold', 
                          lineHeight: 1.2,
                          color: 'text.primary',
                          fontSize: '0.75rem',
                        }}
                      >
                        陳大明 醫師
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'text.secondary',
                          fontSize: '0.7rem',
                          lineHeight: 1.2,
                        }}
                      >
                        急診室 A 區
                      </Typography>
                    </Box>
                  )}
                  <SettingsIcon 
                    sx={{ 
                      fontSize: 18, 
                      color: infoOpen ? theme.palette.primary.main : 'text.secondary',
                      ml: 0.5,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'rotate(90deg) scale(1.2)',
                        color: theme.palette.primary.main,
                      }
                    }} 
                  />
                </Box>
              </Tooltip>
            </Fade>

            {/* 帳戶下拉選單 */}
            <Menu
              anchorEl={accountMenuAnchor}
              open={Boolean(accountMenuAnchor)}
              onClose={handleAccountMenuClose}
              TransitionComponent={Fade}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 8,
                sx: {
                  mt: 1,
                  minWidth: 200,
                  borderRadius: 2,
                  boxShadow: SHADOWS.hover,
                  border: '1px solid rgba(0,0,0,0.05)',
                  '& .MuiMenuItem-root': {
                    px: 2,
                    py: 1.5,
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.08)',
                    }
                  }
                }
              }}
            >
              <MenuItem onClick={handleAccountMenuClose}>
                <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="個人資料" />
              </MenuItem>
              <MenuItem onClick={handleAccountMenuClose}>
                <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
                <ListItemText primary="設定" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleAccountMenuClose}>
                <ListItemText primary="登出" sx={{ color: 'error.main' }} />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 2. Left Sidebar (Drawer) */}
      <Box 
        component="nav" 
        sx={{ 
          width: { 
            sm: sidebarOpen ? drawerWidth : collapsedDrawerWidth 
          }, 
          flexShrink: { sm: 0 },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        {/* 手機版臨時側邊欄 */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth, 
              border: 'none', 
              boxShadow: SHADOWS.hover 
            },
          }}
        >
          {drawerContent}
        </Drawer>
        
        {/* 桌面版永久側邊欄 - 支援收合 */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
              border: 'none', 
              borderRight: '1px solid rgba(0,0,0,0.05)',
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.standard,
              }),
            },
          }}
          open={sidebarOpen}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* 3. Main Content Area - 擴展到側邊欄邊界 (Mark 2) */}
      <Slide direction="left" in={true} timeout={300}>
        <Box
          component="main"
          sx={{ 
            flexGrow: 1, 
            p: 0, // Mark 2: 移除所有 padding，讓容器貼近邊界
            // 注意：不需要 ml，因為 nav Box 的 width 已在 flex 布局中佔據空間
            mt: '64px',
            bgcolor: 'background.default',
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
            willChange: 'width, margin', // GPU 加速優化
          }}
        >
          <Container 
            maxWidth="xl" 
            sx={{ 
              p: { xs: 2, md: 3 }, // Mark 2: 在 Container 內部添加 padding
              pl: { xs: 2, md: 3 }, // 確保左側也有 padding
              width: '100%',
              maxWidth: infoOpen ? '100%' : 'xl',
            }}
          >
            {renderContent()}
          </Container>
        </Box>
      </Slide>

      {/* 4. Right InfoBar (AI Support) */}
      <Drawer
        variant={isDesktop ? 'persistent' : 'temporary'}
        anchor="right"
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        sx={{
          width: infoOpen ? { xs: '100%', sm: infoBarWidthDesktop } : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: infoBarWidthDesktop },
            boxSizing: 'border-box',
            border: 'none',
            bgcolor: 'background.default',
            mt: isDesktop ? '64px' : 0, 
            height: isDesktop ? 'calc(100% - 64px)' : '100%',
            boxShadow: '-4px 0 15px rgba(0,0,0,0.05)',
            zIndex: (theme) => theme.zIndex.drawer + 3 // 確保在 AppBar 之上
          },
        }}
      >
        {/* 手機版頂部關閉導航列 */}
        {!isDesktop && (
          <Box sx={{ 
            p: 1.5, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            background: GRADIENTS.primary,
            color: 'white'
          }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', ml: 1 }}>AI 輔助分析系統</Typography>
            <IconButton onClick={() => setInfoOpen(false)} color="inherit"><CloseIcon /></IconButton>
          </Box>
        )}
        <InfoBar formData={formData} autoLevel={autoLevel} />
      </Drawer>
    </Box>
  );
};

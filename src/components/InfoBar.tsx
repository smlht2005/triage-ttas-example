import React from 'react';
import { 
  Box, Typography, Paper, Stack, Divider, Chip, 
  List, ListItem, ListItemIcon, ListItemText, Alert, AlertTitle
} from '@mui/material';
import {
  Psychology as AIIcon,
  Lightbulb as SuggestIcon,
  Assignment as PathIcon,
  WarningAmber as AlertIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { SHADOWS, GRADIENTS } from '../theme/theme';

export const InfoBar: React.FC = () => {
  return (
    <Box sx={{ 
      width: 320, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      gap: 3,
      p: 2,
      bgcolor: 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(5px)',
      borderLeft: '1px solid rgba(0,0,0,0.05)'
    }}>
      {/* 標題區 */}
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 1 }}>
        <Avatar 
          sx={{ 
            bgcolor: 'primary.main', 
            width: 32, 
            height: 32,
            background: GRADIENTS.primary 
          }}
        >
          <AIIcon sx={{ fontSize: 18 }} />
        </Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          AI 輔助分析
        </Typography>
      </Stack>

      <Divider />

      {/* 檢傷建議區 */}
      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: '#f0f4ff', border: '1px solid #e0e6ff' }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
          <SuggestIcon color="primary" fontSize="small" />
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>檢傷建議</Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary" component="div" sx={{ lineHeight: 1.6 }}>
          病患血壓偏低 (SBP 尚未輸入)，建議優先測量生命徵象以即時評估克漏期。
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Chip label="建議 Level 2" size="small" sx={{ bgcolor: '#f57c00', color: 'white', fontWeight: 'bold' }} />
        </Box>
      </Paper>

      {/* 臨床路徑提示 */}
      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: '#fff4e5', border: '1px solid #ffe8cc' }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
          <AlertIcon sx={{ color: '#f57c00' }} fontSize="small" />
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>臨床路徑提示</Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary" component="div" sx={{ lineHeight: 1.6 }}>
          主訴尚未填寫。若為胸痛患者，請優先執行 ECG 檢查。
        </Typography>
      </Paper>

      {/* 歷史類似案例 */}
      <Box sx={{ px: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', mb: 1, display: 'block' }}>
          系統通知 (System Info)
        </Typography>
        <List dense>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemIcon sx={{ minWidth: 28 }}><InfoIcon sx={{ fontSize: 16 }} color="info" /></ListItemIcon>
            <ListItemText 
              primary="數據已通過臨床驗證 (TTAS 2026)" 
              primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }} 
            />
          </ListItem>
        </List>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      {/* 底部導引 */}
      <Alert severity="info" icon={<InfoIcon fontSize="small" />} sx={{ borderRadius: 2, '& .MuiAlert-message': { fontSize: '0.75rem' } }}>
        <AlertTitle sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>小提醒</AlertTitle>
        請務必人工覆核所有 AI 判定結果。
      </Alert>
    </Box>
  );
};

import { Avatar } from '@mui/material';

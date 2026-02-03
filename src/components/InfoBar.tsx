/**
 * 專案名稱：醫域醫院 HIS 系統
 * 檔案名稱：InfoBar.tsx
 * 修改日期：2026-02-03
 * 修改人員：Tao (AI Assistant)
 * 修改說明：實現反應式 AI 輔助分析，根據生命徵象即時顯示臨床預警
 */
import React from 'react';
import { 
  Box, Typography, Paper, Stack, Divider, Chip, 
  List, ListItem, ListItemIcon, ListItemText, Alert, AlertTitle, Avatar
} from '@mui/material';
import {
  Psychology as AIIcon,
  Lightbulb as SuggestIcon,
  WarningAmber as AlertIcon,
  Info as InfoIcon,
  CheckCircle as HealthyIcon
} from '@mui/icons-material';
import { GRADIENTS } from '../theme/theme';
import { TriageFormData } from '../hooks/useTriageForm';
import { LEVEL_COLORS, TriageLevel } from '../constants';
import { safeParseInt } from '../utils/triageCalculator';

interface InfoBarProps {
  formData?: TriageFormData;
  autoLevel?: number;
}

export const InfoBar: React.FC<InfoBarProps> = ({ formData, autoLevel = 5 }) => {
  const vitals = formData?.vitals;
  
  // 臨床警示邏輯
  const getClinicalWarnings = () => {
    const warnings = [];
    const sbp = safeParseInt(vitals?.sbp);
    const spo2 = safeParseInt(vitals?.spo2);
    const hr = safeParseInt(vitals?.hr);

    if (sbp > 0 && sbp < 90) warnings.push({ type: 'error', text: 'SBP < 90: 疑似低血壓休克風險！' });
    if (spo2 > 0 && spo2 < 90) warnings.push({ type: 'error', text: 'SpO2 < 90%: 嚴重低氧血症，需立即給氧。' });
    if (hr > 120) warnings.push({ type: 'warning', text: 'HR > 120: 心搏過速，請排除疼痛或脫水。' });
    
    if (warnings.length === 0 && sbp > 0) {
        warnings.push({ type: 'success', text: '目前監測數據尚在穩定範圍。' });
    }
    
    return warnings;
  };

  const warnings = getClinicalWarnings();

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      gap: 3,
      p: 2,
      bgcolor: 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(5px)',
      borderLeft: '1px solid rgba(0,0,0,0.05)',
      overflowY: 'auto'
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

      {/* 即時建議區 */}
      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: '#f0f4ff', border: '1px solid #e0e6ff' }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
          <SuggestIcon color="primary" fontSize="small" />
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>檢傷級別建議</Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary" component="div" sx={{ lineHeight: 1.6, mb: 2 }}>
          根據 TTAS 演算法，此病患初步判定為：
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Chip 
            label={`建議 Level ${autoLevel}`} 
            size="medium" 
            sx={{ 
                bgcolor: LEVEL_COLORS[autoLevel as TriageLevel], 
                color: 'white', 
                fontWeight: 'bold',
                px: 2,
                transform: 'scale(1.1)'
            }} 
          />
        </Box>
      </Paper>

      {/* 臨床警示與路徑 */}
      <Box sx={{ px: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', mb: 1.5, display: 'block' }}>
          即時預警 (Clinical Alerts)
        </Typography>
        <Stack spacing={2}>
          {warnings.length > 0 ? warnings.map((w, i) => (
            <Alert key={i} severity={w.type as any} variant="outlined" sx={{ borderRadius: 2, py: 0 }}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>{w.text}</Typography>
            </Alert>
          )) : (
            <Typography variant="caption" color="text.disabled">等待數據輸入中...</Typography>
          )}
        </Stack>
      </Box>

      {/* 臨床路徑提示 */}
      {autoLevel <= 2 && (
        <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: '#fff4e5', border: '1px solid #ffe8cc' }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
            <AlertIcon sx={{ color: '#f57c00' }} fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>危急臨床路徑</Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary" component="div" sx={{ lineHeight: 1.6 }}>
            建議立即啟動 **快速通關路徑**，通知急救團隊並準備生理監視器。
          </Typography>
        </Paper>
      )}

      <Box sx={{ flexGrow: 1 }} />

      {/* 底部導引 */}
      <Alert severity="info" icon={<InfoIcon fontSize="small" />} sx={{ borderRadius: 2, '& .MuiAlert-message': { fontSize: '0.75rem' } }}>
        <AlertTitle sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>AI 宣告</AlertTitle>
        此分析基於 TTAS 數據模型，最終處置請遵循臨床醫師判斷。
      </Alert>
    </Box>
  );
};

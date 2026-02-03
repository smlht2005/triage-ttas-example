/**
 * 專案名稱：醫域醫院 HIS 系統
 * 檔案名稱：InfoBar.tsx
 * 修改日期：2026-02-03
 * 修改人員：Tao (AI Assistant)
 * 修改說明：實現反應式 AI 輔助分析，修正臨床預警判定邏輯，增加 HR < 50 與 RR > 30 監測
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
  
  // 臨床警示邏輯 - 深度優化邊界判定
  const getClinicalWarnings = () => {
    const warnings = [];
    const sbp = safeParseInt(vitals?.sbp);
    const hr = safeParseInt(vitals?.hr);
    const rr = safeParseInt(vitals?.rr);
    const spo2 = safeParseInt(vitals?.spo2);
    const temp = safeParseInt(vitals?.temp);

    // 1. 生命徵象異常判定
    if (sbp > 0 && sbp < 90) warnings.push({ type: 'error', text: 'SBP < 90: 低血壓休克風險！' });
    if (sbp > 180) warnings.push({ type: 'warning', text: 'SBP > 180: 高血壓急症風險。' });
    
    if (hr > 0 && hr < 50) warnings.push({ type: 'error', text: 'HR < 50: 心搏過緩，需評估意識。' });
    if (hr > 120) warnings.push({ type: 'warning', text: 'HR > 120: 心搏過速。' });
    
    if (rr > 30) warnings.push({ type: 'error', text: 'RR > 30: 呼吸窘迫，需立即處置。' });
    if (rr > 0 && rr < 10) warnings.push({ type: 'error', text: 'RR < 10: 呼吸抑制風險。' });
    
    if (spo2 > 0 && spo2 < 90) warnings.push({ type: 'error', text: 'SpO2 < 90%: 嚴重缺氧。' });
    if (temp > 39) warnings.push({ type: 'warning', text: 'Temp > 39°C: 高燒，請注意意識狀態。' });
    
    // 2. 只有在「完全沒有警告」且「至少輸入一項數據」時才顯示穩定
    const hasData = sbp > 0 || hr > 0 || rr > 0 || spo2 > 0;
    if (warnings.length === 0 && hasData) {
        warnings.push({ type: 'success', text: '監測數據在目前定義範圍內尚屬穩定。' });
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
        <Stack spacing={1.5}>
          {warnings.length > 0 ? warnings.map((w, i) => (
            <Alert 
              key={i} 
              severity={w.type as any} 
              variant="filled" 
              sx={{ 
                  borderRadius: 2, 
                  py: 0,
                  boxShadow: w.type === 'error' ? '0 4px 12px rgba(244, 67, 54, 0.2)' : 'none'
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 700 }}>{w.text}</Typography>
            </Alert>
          )) : (
            <Typography variant="caption" color="text.disabled">等待生命徵象數據輸入中...</Typography>
          )}
        </Stack>
      </Box>

      {/* 臨床路徑提示 */}
      {autoLevel <= 2 && (
        <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: '#fff4e5', border: '2px solid #ff9800', animation: 'pulse 2s infinite' }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
            <AlertIcon sx={{ color: '#f57c00' }} fontSize="small" />
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#f57c00' }}>緊急醫療路徑</Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary" component="div" sx={{ lineHeight: 1.6, fontWeight: 600 }}>
            系統偵測到危急生命徵象：<br/>
            1. 立即啟動 **快速通關路徑**<br/>
            2. 通知急救團隊及高級護理師<br/>
            3. 準備生理監視器與急救設備
          </Typography>
        </Paper>
      )}

      <Box sx={{ flexGrow: 1 }} />

      {/* 底部導引 */}
      <Alert severity="info" icon={<InfoIcon fontSize="small" />} sx={{ borderRadius: 2, '& .MuiAlert-message': { fontSize: '0.75rem' } }}>
        <AlertTitle sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>系統說明</AlertTitle>
        此分析僅供參考。如遇複合性創傷或 OHCA 情況，請直接按最高級別處置。
      </Alert>
    </Box>
  );
};

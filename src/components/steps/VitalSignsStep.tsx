/**
 * 更新時間：2026-02-01 11:37
 * 作者：AI Assistant
 * 更新摘要：建立步驟一組件 - 生命徵象輸入，包含動態卡片與即時級別預覽
 */

import React from 'react';
import { Controller, Control } from 'react-hook-form';
import {
  Grid,
  TextField,
  Typography,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade,
  InputAdornment
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { TriageFormData } from '../../hooks/useTriageForm';
import { VITAL_SIGNS, GCS_OPTIONS, LEVEL_COLORS, TriageLevel } from '../../constants';

interface VitalSignsStepProps {
  control: Control<TriageFormData>;
  autoLevel: number;
}

export const VitalSignsStep: React.FC<VitalSignsStepProps> = ({ control, autoLevel }) => {
  return (
    <Fade in timeout={600}>
      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          📊 生命徵象 (Vital Signs)
        </Typography>

        <Grid container spacing={3}>
          {VITAL_SIGNS.map((vitalSign) => (
            <Grid item xs={12} sm={6} md={4} key={vitalSign.name}>
              <Controller
                name={`vitals.${vitalSign.name}`}
                control={control}
                render={({ field: { onChange, value } }) => {
                  const hasValue = value && value.trim() !== '';
                  return (
                    <TextField
                      fullWidth
                      label={vitalSign.label}
                      size="medium"
                      type={vitalSign.type}
                      value={value || ''}
                      onChange={onChange}
                      InputProps={{
                        endAdornment: hasValue ? (
                          <InputAdornment position="end">
                            <CheckCircle
                              sx={{
                                color: 'success.main',
                                animation: 'scaleIn 0.3s ease-in-out',
                                '@keyframes scaleIn': {
                                  '0%': { transform: 'scale(0)' },
                                  '50%': { transform: 'scale(1.2)' },
                                  '100%': { transform: 'scale(1)' }
                                }
                              }}
                            />
                          </InputAdornment>
                        ) : null
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)'
                          },
                          '&.Mui-focused': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 16px rgba(102, 126, 234, 0.25)'
                          }
                        }
                      }}
                    />
                  );
                }}
              />
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="medium">
              <InputLabel>意識狀態 (GCS)</InputLabel>
              <Controller
                name="vitals.gcs"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="意識狀態 (GCS)"
                    sx={{
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)'
                      }
                    }}
                  >
                    {GCS_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* 即時級別預覽卡片 */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            border: '2px solid rgba(102, 126, 234, 0.2)',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 32px rgba(102, 126, 234, 0.2)'
            }
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              系統初步建議
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              自動判定級別
            </Typography>
          </Box>
          <Chip
            label={`Level ${autoLevel}`}
            sx={{
              bgcolor: LEVEL_COLORS[autoLevel as TriageLevel],
              color: 'white',
              fontWeight: 700,
              fontSize: '1.1rem',
              px: 2,
              py: 3,
              animation: 'bounce 0.5s ease-in-out',
              '@keyframes bounce': {
                '0%, 100%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' }
              }
            }}
          />
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 2, textAlign: 'center' }}
        >
          💡 提示：輸入生命徵象數據後，系統會自動計算建議的檢傷級別
        </Typography>
      </Box>
    </Fade>
  );
};

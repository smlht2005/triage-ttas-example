/**
 * 更新時間：2026-02-01 11:39
 * 作者：AI Assistant
 * 更新摘要：建立步驟三組件 - 確認與提交，包含完整摘要預覽與最終級別選擇
 */

import React from 'react';
import { Controller, Control } from 'react-hook-form';
import {
  Typography,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade,
  Grid,
  Paper,
  Divider
} from '@mui/material';
import { CheckCircleOutline, LocalHospital, Assignment } from '@mui/icons-material';
import { TriageFormData } from '../../hooks/useTriageForm';
import { LEVEL_COLORS, TRIAGE_LEVELS, TriageLevel, VITAL_SIGNS } from '../../constants';

interface ConfirmationStepProps {
  control: Control<TriageFormData>;
  formData: TriageFormData;
  autoLevel: number;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  control,
  formData,
  autoLevel
}) => {
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
          ✓ 確認與提交 (Confirmation)
        </Typography>

        {/* 資料摘要卡片 */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            border: '2px solid rgba(102, 126, 234, 0.2)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 32px rgba(102, 126, 234, 0.15)'
            }
          }}
        >
          {/* 生命徵象摘要 */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalHospital sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                生命徵象
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {VITAL_SIGNS.map((vital) => {
                const value = formData.vitals[vital.name];
                return (
                  <Grid item xs={6} sm={4} key={vital.name}>
                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: 'rgba(102, 126, 234, 0.05)',
                        borderRadius: 2,
                        border: '1px solid rgba(102, 126, 234, 0.1)'
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {vital.label}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {value || '-'}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
              <Grid item xs={6} sm={4}>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: 'rgba(102, 126, 234, 0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(102, 126, 234, 0.1)'
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    GCS
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formData.vitals.gcs || '15'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* 病人主訴摘要 */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Assignment sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                病人主訴
              </Typography>
            </Box>
            <Box
              sx={{
                p: 2,
                bgcolor: 'rgba(102, 126, 234, 0.05)',
                borderRadius: 2,
                border: '1px solid rgba(102, 126, 234, 0.1)',
                maxHeight: 120,
                overflow: 'auto'
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {formData.complaint || '(尚未填寫)'}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* 系統建議級別 */}
        <Box
          sx={{
            p: 3,
            mb: 3,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
            borderRadius: 3,
            border: '2px solid rgba(102, 126, 234, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircleOutline sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                系統建議級別
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                自動判定結果
              </Typography>
            </Box>
          </Box>
          <Chip
            label={`Level ${autoLevel}`}
            sx={{
              bgcolor: LEVEL_COLORS[autoLevel as TriageLevel],
              color: 'white',
              fontWeight: 700,
              fontSize: '1.2rem',
              px: 3,
              py: 3.5,
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.05)' }
              }
            }}
          />
        </Box>

        {/* 最終級別選擇 */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>
            最終人工確認與修改
          </Typography>
          <FormControl
            fullWidth
            size="large"
            sx={{
              '& .MuiOutlinedInput-root': {
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)'
                }
              }
            }}
          >
            <InputLabel>最終檢傷級別</InputLabel>
            <Controller
              name="finalLevel"
              control={control}
              render={({ field }) => (
                <Select {...field} label="最終檢傷級別">
                  {TRIAGE_LEVELS.map((level) => (
                    <MenuItem key={level} value={level}>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Chip
                          label={`Level ${level}`}
                          size="small"
                          sx={{
                            bgcolor: LEVEL_COLORS[level],
                            color: 'white',
                            fontWeight: 600,
                            mr: 2
                          }}
                        />
                        <Typography variant="body2">
                          {level === 1 && '復甦救援'}
                          {level === 2 && '危急'}
                          {level === 3 && '緊急'}
                          {level === 4 && '次緊急'}
                          {level === 5 && '非緊急'}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 3, textAlign: 'center' }}
        >
          💡 提示：請根據臨床判斷確認或調整最終檢傷級別
        </Typography>
      </Box>
    </Fade>
  );
};

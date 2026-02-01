/**
 * 更新時間：2026-02-01 11:38
 * 作者：AI Assistant
 * 更新摘要：建立步驟二組件 - 病人主訴輸入，包含字數統計與即時反饋
 */

import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import {
  TextField,
  Typography,
  Box,
  Fade,
  LinearProgress,
  Alert
} from '@mui/material';
import { TriageFormData } from '../../hooks/useTriageForm';

interface ComplaintStepProps {
  control: Control<TriageFormData>;
  errors: FieldErrors<TriageFormData>;
  watchComplaint: string;
}

export const ComplaintStep: React.FC<ComplaintStepProps> = ({
  control,
  errors,
  watchComplaint
}) => {
  const charCount = watchComplaint?.length || 0;
  const minChars = 10;
  const maxChars = 500;
  const progress = Math.min((charCount / maxChars) * 100, 100);

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
          💬 病人主訴 (Chief Complaint)
        </Typography>

        <Controller
          name="complaint"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={8}
              error={!!errors.complaint}
              helperText={errors.complaint?.message}
              placeholder="請詳細描述病人的主要症狀、不適原因、發生時間等相關資訊..."
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
                  },
                  '&.Mui-error': {
                    animation: 'shake 0.4s ease-in-out',
                    '@keyframes shake': {
                      '0%, 100%': { transform: 'translateX(0)' },
                      '25%': { transform: 'translateX(-8px)' },
                      '75%': { transform: 'translateX(8px)' }
                    }
                  }
                },
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                  lineHeight: 1.6
                }
              }}
            />
          )}
        />

        {/* 字數統計與進度條 */}
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              字數統計
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: charCount < minChars ? 'error.main' : charCount >= maxChars ? 'warning.main' : 'success.main'
              }}
            >
              {charCount} / {maxChars} 字
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
                background:
                  charCount < minChars
                    ? 'linear-gradient(90deg, #f44336 0%, #ff6b6b 100%)'
                    : charCount >= maxChars
                    ? 'linear-gradient(90deg, #ff9800 0%, #ffa726 100%)'
                    : 'linear-gradient(90deg, #4caf50 0%, #66bb6a 100%)',
                transition: 'all 0.3s ease-in-out'
              }
            }}
          />
        </Box>

        {/* 提示訊息 */}
        {charCount > 0 && charCount < minChars && (
          <Alert
            severity="info"
            sx={{
              mt: 2,
              borderRadius: 2,
              animation: 'fadeIn 0.3s ease-in-out',
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(-10px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            建議至少輸入 {minChars} 字以提供完整的病人資訊
          </Alert>
        )}

        {charCount >= maxChars && (
          <Alert
            severity="warning"
            sx={{
              mt: 2,
              borderRadius: 2,
              animation: 'fadeIn 0.3s ease-in-out',
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(-10px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            已達到最大字數限制
          </Alert>
        )}

        {charCount >= minChars && charCount < maxChars && (
          <Alert
            severity="success"
            sx={{
              mt: 2,
              borderRadius: 2,
              animation: 'fadeIn 0.3s ease-in-out',
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(-10px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            ✓ 資訊完整，可以繼續下一步
          </Alert>
        )}

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 3, textAlign: 'center' }}
        >
          💡 提示：詳細的病人主訴有助於更準確的檢傷評估
        </Typography>
      </Box>
    </Fade>
  );
};

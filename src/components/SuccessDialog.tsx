/**
 * 更新時間：2026-02-01 11:40
 * 作者：AI Assistant
 * 更新摘要：建立成功提交對話框，包含動畫效果與級別視覺化
 */

import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Chip,
  Zoom,
  Slide,
  IconButton
} from '@mui/material';
import { Close, CheckCircle } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import { LEVEL_COLORS, TriageLevel } from '../constants';

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  finalLevel: number;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const SuccessDialog: React.FC<SuccessDialogProps> = ({ open, onClose, finalLevel }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
          backdropFilter: 'blur(10px)'
        }
      }}
    >
      {/* 關閉按鈕 */}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'grey.500',
          zIndex: 1
        }}
      >
        <Close />
      </IconButton>

      <DialogContent sx={{ p: 0, textAlign: 'center' }}>
        {/* 頂部彩色條 */}
        <Box
          sx={{
            height: 8,
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
          }}
        />

        <Box sx={{ p: 4 }}>
          {/* 成功圖標 */}
          <Zoom in={open} style={{ transitionDelay: '100ms' }}>
            <Box
              sx={{
                display: 'inline-flex',
                mb: 3,
                animation: 'scaleIn 0.6s ease-in-out',
                '@keyframes scaleIn': {
                  '0%': { transform: 'scale(0) rotate(0deg)' },
                  '50%': { transform: 'scale(1.2) rotate(180deg)' },
                  '100%': { transform: 'scale(1) rotate(360deg)' }
                }
              }}
            >
              <CheckCircle
                sx={{
                  fontSize: 80,
                  color: 'success.main',
                  filter: 'drop-shadow(0 4px 12px rgba(76, 175, 80, 0.3))'
                }}
              />
            </Box>
          </Zoom>

          {/* 成功標題 */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'fadeInUp 0.5s ease-in-out',
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            檢傷完成！
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 3,
              animation: 'fadeInUp 0.5s ease-in-out 0.1s both',
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            檢傷資料已成功儲存
          </Typography>

          {/* 最終級別卡片 */}
          <Box
            sx={{
              p: 4,
              mb: 3,
              background: `linear-gradient(135deg, ${LEVEL_COLORS[finalLevel as TriageLevel]}15 0%, ${LEVEL_COLORS[finalLevel as TriageLevel]}08 100%)`,
              borderRadius: 3,
              border: `2px solid ${LEVEL_COLORS[finalLevel as TriageLevel]}40`,
              animation: 'fadeInScale 0.6s ease-in-out 0.2s both',
              '@keyframes fadeInScale': {
                from: { opacity: 0, transform: 'scale(0.8)' },
                to: { opacity: 1, transform: 'scale(1)' }
              }
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              最終檢傷級別
            </Typography>
            <Chip
              label={`Level ${finalLevel}`}
              sx={{
                bgcolor: LEVEL_COLORS[finalLevel as TriageLevel],
                color: 'white',
                fontWeight: 700,
                fontSize: '2rem',
                px: 4,
                py: 5,
                height: 'auto',
                '& .MuiChip-label': {
                  padding: '12px 16px'
                },
                animation: 'bounce 0.8s ease-in-out 0.4s both',
                '@keyframes bounce': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '25%': { transform: 'translateY(-10px)' },
                  '50%': { transform: 'translateY(0)' },
                  '75%': { transform: 'translateY(-5px)' }
                }
              }}
            />
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
              {finalLevel === 1 && '復甦救援'}
              {finalLevel === 2 && '危急'}
              {finalLevel === 3 && '緊急'}
              {finalLevel === 4 && '次緊急'}
              {finalLevel === 5 && '非緊急'}
            </Typography>
          </Box>

          {/* 關閉按鈕 */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={onClose}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
              },
              animation: 'fadeInUp 0.5s ease-in-out 0.5s both',
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            關閉
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

/**
 * 更新時間：2026-02-01 11:41
 * 作者：AI Assistant
 * 更新摘要：建立主要 StepperForm 組件，整合 MUI Stepper 與所有步驟組件，包含動畫與響應式設計
 */

import React, { useState } from 'react';
import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  LinearProgress,
  useMediaQuery,
  useTheme,
  Slide
} from '@mui/material';
import { ArrowBack, ArrowForward, Send } from '@mui/icons-material';
import { FormProvider } from 'react-hook-form';
import { useTriageForm } from '../hooks/useTriageForm';
import { CustomStepConnector, CustomStepIcon } from './CustomStepperStyles';
import { VitalSignsStep } from './steps/VitalSignsStep';
import { ComplaintStep } from './steps/ComplaintStep';
import { ConfirmationStep } from './steps/ConfirmationStep';
import { SuccessDialog } from './SuccessDialog';
import { ANIMATION_DURATION } from '../theme/theme';

const steps = [
  { label: '生命徵象', description: '輸入病人生命徵象數據' },
  { label: '病人主訴', description: '記錄病人主要症狀' },
  { label: '確認提交', description: '確認資料並完成檢傷' }
];

export const StepperForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const {
    formMethods,
    activeStep,
    animationDirection,
    autoLevel,
    progressPercentage,
    handleNext,
    handleBack,
    handleReset
  } = useTriageForm();

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [slideIn, setSlideIn] = useState(true);

  const { handleSubmit, watch, formState, control } = formMethods;
  const watchComplaint = watch('complaint');
  const formData = watch();

  // 處理步驟切換動畫
  const handleStepChange = async (isNext: boolean) => {
    setSlideIn(false);
    setTimeout(() => {
      if (isNext) {
        handleNext();
      } else {
        handleBack();
      }
      setSlideIn(true);
    }, ANIMATION_DURATION.standard);
  };

  // 提交表單
  const onSubmit = (data: any) => {
    setShowSuccessDialog(true);
  };

  // 關閉成功對話框並重置
  const handleCloseSuccess = () => {
    setShowSuccessDialog(false);
    handleReset();
  };

  // 渲染當前步驟內容
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <VitalSignsStep control={control} autoLevel={autoLevel} />;
      case 1:
        return (
          <ComplaintStep
            control={control}
            errors={formState.errors}
            watchComplaint={watchComplaint}
          />
        );
      case 2:
        return <ConfirmationStep control={control} formData={formData} autoLevel={autoLevel} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
      >
        {/* 頂部漸層條 */}
        <Box
          sx={{
            height: 8,
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
          }}
        />

        {/* 進度條 */}
        <LinearProgress
          variant="determinate"
          value={progressPercentage}
          sx={{
            height: 4,
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              transition: 'transform 0.5s ease-in-out'
            }
          }}
        />

        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          {/* 標題 */}
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              mb: 1,
              fontWeight: 700,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            🏥 TTAS 急診檢傷系統
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 4, textAlign: 'center' }}
          >
            Taiwan Triage and Acuity Scale
          </Typography>

          {/* Stepper */}
          <Stepper
            activeStep={activeStep}
            connector={<CustomStepConnector />}
            orientation={isMobile ? 'vertical' : 'horizontal'}
            sx={{ mb: 4 }}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={CustomStepIcon}
                  optional={
                    !isMobile ? (
                      <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                        {step.description}
                      </Typography>
                    ) : null
                  }
                >
                  <Typography
                    variant={isMobile ? 'body2' : 'body1'}
                    sx={{ fontWeight: activeStep === index ? 700 : 500 }}
                  >
                    {step.label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* 步驟內容 */}
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Slide
                direction={animationDirection === 'left' ? 'right' : 'left'}
                in={slideIn}
                timeout={ANIMATION_DURATION.standard}
                mountOnEnter
                unmountOnExit
              >
                <Box sx={{ minHeight: { xs: 300, sm: 400, md: 450 } }}>
                  {renderStepContent()}
                </Box>
              </Slide>

              {/* 操作按鈕 */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  mt: 4,
                  pt: 3,
                  borderTop: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={() => handleStepChange(false)}
                  startIcon={<ArrowBack />}
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    order: { xs: 2, sm: 1 },
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.dark',
                      transform: 'translateX(-4px)',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)'
                    }
                  }}
                >
                  上一步
                </Button>

                <Box sx={{ flex: 1, order: { xs: 3, sm: 2 } }} />

                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<Send />}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      order: { xs: 1, sm: 3 },
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
                      }
                    }}
                  >
                    完成檢傷並存檔
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleStepChange(true)}
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      order: { xs: 1, sm: 3 },
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
                      '&:hover': {
                        transform: 'translateX(4px)',
                        boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
                      }
                    }}
                  >
                    下一步
                  </Button>
                )}
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Paper>

      {/* 成功對話框 */}
      <SuccessDialog
        open={showSuccessDialog}
        onClose={handleCloseSuccess}
        finalLevel={formData.finalLevel}
      />
    </Container>
  );
};

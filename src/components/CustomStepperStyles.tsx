/**
 * 更新時間：2026-02-01 11:36
 * 作者：AI Assistant
 * 更新摘要：建立自訂 Stepper 樣式組件，包含漸層連接線與脈動圖標動畫
 */

import { styled } from '@mui/material/styles';
import { StepConnector, stepConnectorClasses, StepIconProps } from '@mui/material';
import { Check } from '@mui/icons-material';
import { GRADIENTS } from '../theme/theme';

// 自訂連接線樣式（漸層效果）
export const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: GRADIENTS.stepper,
      boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: GRADIENTS.stepper,
      boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#e0e0e0',
    borderRadius: 2,
    transition: 'all 0.5s ease-in-out'
  }
}));

// 自訂 StepIcon 容器
const CustomStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#e0e0e0',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  transition: 'all 0.3s ease-in-out',
  ...(ownerState.active && {
    background: GRADIENTS.primary,
    boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)',
    animation: 'pulse 2s ease-in-out infinite',
    '@keyframes pulse': {
      '0%': {
        transform: 'scale(1)',
        boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)'
      },
      '50%': {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
      },
      '100%': {
        transform: 'scale(1)',
        boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)'
      }
    }
  }),
  ...(ownerState.completed && {
    background: GRADIENTS.success,
    boxShadow: '0 4px 16px rgba(132, 250, 176, 0.4)'
  })
}));

// 自訂 StepIcon 組件
export function CustomStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <span style={{ fontSize: '20px', fontWeight: 'bold' }}>1</span>,
    2: <span style={{ fontSize: '20px', fontWeight: 'bold' }}>2</span>,
    3: <span style={{ fontSize: '20px', fontWeight: 'bold' }}>3</span>
  };

  return (
    <CustomStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? (
        <Check sx={{ fontSize: 28, fontWeight: 'bold' }} />
      ) : (
        icons[String(props.icon)]
      )}
    </CustomStepIconRoot>
  );
}

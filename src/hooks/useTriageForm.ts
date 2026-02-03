/**
 * 更新時間：2026-02-01 11:35
 * 作者：AI Assistant
 * 更新摘要：建立 useTriageForm custom hook，抽取表單邏輯與狀態管理
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { calculateTriageLevel, VitalsData } from '../utils/triageCalculator';

// 定義驗證架構
const triageSchema = z.object({
  vitals: z.object({
    sbp: z.string().optional(),
    hr: z.string().optional(),
    spo2: z.string().optional(),
    rr: z.string().optional(),
    temp: z.string().optional(),
    gcs: z.string().default('15')
  }),
  complaint: z.string().min(1, '請輸入病人主訴'),
  finalLevel: z.number().min(1).max(5)
});

export type TriageFormData = z.infer<typeof triageSchema>;

export const useTriageForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('left');

  const formMethods = useForm<TriageFormData>({
    resolver: zodResolver(triageSchema),
    defaultValues: {
      vitals: { sbp: '', hr: '', spo2: '', rr: '', temp: '', gcs: '15' },
      complaint: '',
      finalLevel: 5
    },
    mode: 'onChange'
  });

  const { watch, setValue, trigger } = formMethods;

  // 監聽完整表單數據，包含生命徵象與主訴
  const formData = watch();
  const watchedVitals = formData.vitals;

  // 自動計算檢傷級別
  const autoLevel = calculateTriageLevel(watchedVitals as VitalsData);

  // 自動更新最終級別
  useEffect(() => {
    setValue('finalLevel', autoLevel);
  }, [autoLevel, setValue]);

  // 下一步
  const handleNext = async () => {
    let fieldsToValidate: any[] = [];

    // 根據當前步驟驗證不同欄位
    if (activeStep === 0) {
      // 步驟一：生命徵象（可選填）
      fieldsToValidate = ['vitals'];
    } else if (activeStep === 1) {
      // 步驟二：病人主訴（必填）
      fieldsToValidate = ['complaint'];
    }

    const isValid = await trigger(fieldsToValidate as any);

    if (isValid) {
      setAnimationDirection('left');
      setActiveStep((prev) => prev + 1);
    }
  };

  // 上一步
  const handleBack = () => {
    setAnimationDirection('right');
    setActiveStep((prev) => prev - 1);
  };

  // 重置表單
  const handleReset = () => {
    setActiveStep(0);
    formMethods.reset();
  };

  // 計算進度百分比
  const progressPercentage = ((activeStep + 1) / 3) * 100;

  return {
    formMethods,
    activeStep,
    animationDirection,
    autoLevel,
    progressPercentage,
    handleNext,
    handleBack,
    handleReset,
    setActiveStep
  };
};

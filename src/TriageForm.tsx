import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  Container, Paper, Typography, Grid, TextField, 
  MenuItem, Box, Button, Chip, Divider, 
  FormControl, InputLabel, Select 
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { calculateTriageLevel, VitalsData } from './utils/triageCalculator';
import { 
  LEVEL_COLORS, 
  GCS_OPTIONS, 
  VITAL_SIGNS, 
  TRIAGE_LEVELS,
  TriageLevel
} from './constants';

// 1. 定義驗證架構
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

type TriageFormData = z.infer<typeof triageSchema>;

const TriageForm: React.FC = () => {
  const { control, watch, setValue, handleSubmit, formState: { errors } } = useForm<TriageFormData>({
    resolver: zodResolver(triageSchema),
    defaultValues: {
      vitals: { sbp: '', hr: '', spo2: '', rr: '', temp: '', gcs: '15' },
      complaint: '',
      finalLevel: 5
    }
  });

  // 監聽數值變動
  const watchedVitals = watch('vitals');

  // 2. 自動判定邏輯 (TTAS 簡化版)
  const autoLevel = calculateTriageLevel(watchedVitals as VitalsData);

  // 3. 自動更新最終級別
  useEffect(() => {
    setValue('finalLevel', autoLevel);
  }, [autoLevel, setValue]);

  const onSubmit = (data: TriageFormData) => {
    console.log('提交數據:', data);
    alert(`檢傷成功！最終級別: Level ${data.finalLevel}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
          🏥 TTAS 急診檢傷系統 (TypeScript 版)
        </Typography>
        <Divider sx={{ my: 3 }} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* 生命徵象區 */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>1. 生命徵象 (Vital Signs)</Typography>
              <Grid container spacing={2}>
                {VITAL_SIGNS.map((vitalSign) => (
                  <Grid item xs={6} sm={4} key={vitalSign.name}>
                    <Controller
                      name={`vitals.${vitalSign.name}`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          fullWidth
                          label={vitalSign.label}
                          size="small"
                          type={vitalSign.type}
                          value={value || ''}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Grid>
                ))}
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>意識狀態 (GCS)</InputLabel>
                    <Controller
                      name="vitals.gcs"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} label="意識狀態 (GCS)">
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
            </Grid>

            {/* 病人主訴 */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>2. 病人主訴</Typography>
              <Controller
                name="complaint"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.complaint}
                    helperText={errors.complaint?.message}
                    placeholder="請輸入病人主訴..."
                  />
                )}
              />
            </Grid>

            {/* 自動判定結果 */}
            <Grid item xs={12}>
              <Box sx={{ p: 2, bgcolor: '#fafafa', borderRadius: 1, border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1">系統初步建議：</Typography>
                <Chip 
                  label={`Level ${autoLevel}`} 
                  sx={{ bgcolor: LEVEL_COLORS[autoLevel as TriageLevel], color: 'white', fontWeight: 'bold' }} 
                />
              </Box>
            </Grid>

            {/* 人工確認 */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>3. 最終人工確認與修改</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>最終級別</InputLabel>
                    <Controller
                      name="finalLevel"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} label="最終級別" value={field.value || 5}>
                          {TRIAGE_LEVELS.map(level => (
                            <MenuItem key={level} value={level}>Level {level}</MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="contained" type="submit" size="large" sx={{ height: '100%' }}>
                    完成檢傷並存檔
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default TriageForm;

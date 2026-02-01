import React from 'react';
import { 
  Grid, Paper, Typography, Box, Card, CardContent, 
  LinearProgress, Stack, Avatar, Divider, Button
} from '@mui/material';
import {
  TrendingUp,
  AccessTime,
  Warning,
  CheckCircle,
  PeopleAlt
} from '@mui/icons-material';
import { GRADIENTS, SHADOWS } from '../theme/theme';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, trend }) => (
  <Card sx={{ height: '100%', boxShadow: SHADOWS.card, borderRadius: 4, overflow: 'hidden' }}>
    <Box sx={{ height: 6, bgcolor: color }} />
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
          {trend && (
            <Typography variant="caption" sx={{ color: 'success.main', display: 'flex', alignItems: 'center', mt: 1 }}>
              <TrendingUp fontSize="inherit" sx={{ mr: 0.5 }} /> {trend}
            </Typography>
          )}
        </Box>
        <Avatar sx={{ bgcolor: `${color}15`, color: color, borderRadius: 2 }}>
          {icon}
        </Avatar>
      </Stack>
    </CardContent>
  </Card>
);

export const TriageDashboard: React.FC = () => {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        急診室實時概況 (ER Dashboard)
      </Typography>
      
      <Grid container spacing={3}>
        {/* 統計卡片 */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="待檢傷人數" 
            value="12" 
            icon={<Warning />} 
            color="#d32f2f" 
            trend="+2 較上小時"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="今日已檢傷" 
            value="148" 
            icon={<CheckCircle />} 
            color="#388e3c" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="平均等待時間" 
            value="15m" 
            icon={<AccessTime />} 
            color="#1976d2" 
            trend="-3m 優於昨日"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="當前醫護人力" 
            value="8/10" 
            icon={<PeopleAlt />} 
            color="#764ba2" 
          />
        </Grid>

        {/* 檢傷分佈圖 */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700 }}>
              各級別檢傷人數分佈
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={3}>
              {[
                { label: 'Level 1 - 復甦救援', count: 2, color: '#d32f2f', percent: 15 },
                { label: 'Level 2 - 危急', count: 5, color: '#f57c00', percent: 35 },
                { label: 'Level 3 - 緊急', count: 18, color: '#fbc02d', percent: 65 },
                { label: 'Level 4 - 次緊急', count: 42, color: '#388e3c', percent: 85 },
                { label: 'Level 5 - 非緊急', count: 12, color: '#1976d2', percent: 25 },
              ].map((item) => (
                <Box key={item.label}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2">{item.label}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{item.count} 人</Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={item.percent} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: `${item.color}20`,
                      '& .MuiLinearProgress-bar': { bgcolor: item.color }
                    }} 
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* 快速捷徑 */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', background: GRADIENTS.info, color: 'white' }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700 }}>
              快速操作
            </Typography>
            <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
            <Stack spacing={2}>
              <Button fullWidth variant="contained" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                新增無名氏病人
              </Button>
              <Button fullWidth variant="contained" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                啟動大量傷患模式
              </Button>
              <Button fullWidth variant="contained" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                交班報表匯出
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

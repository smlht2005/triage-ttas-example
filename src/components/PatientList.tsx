/**
 * 專案名稱：醫域醫院 HIS 系統
 * 檔案名稱：PatientList.tsx
 * 修改日期：2026-02-02
 * 修改人員：Tao (AI Assistant)
 * 修改說明：候診名單列表，提供病患狀態追蹤與基礎資訊展示
 */
import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Typography, Box, Chip, IconButton, Tooltip, Avatar, Stack
} from '@mui/material';
import {
  Visibility,
  Edit,
  MoreVert,
  Circle
} from '@mui/icons-material';
import { LEVEL_COLORS } from '../constants';

const patients = [
  { id: 'M123456789', name: '王小明', age: 45, sex: 'M', arrival: '07:05', status: '待檢傷', level: null },
  { id: 'A987654321', name: '李美華', age: 32, sex: 'F', arrival: '06:50', status: '候診中', level: 3 },
  { id: 'C456789123', name: '張國榮', age: 68, sex: 'M', arrival: '06:42', status: '檢查中', level: 2 },
  { id: 'D112233445', name: '陳婉瑛', age: 24, sex: 'F', arrival: '07:12', status: '待檢傷', level: null },
  { id: 'B223344556', name: '林志玲', age: 50, sex: 'F', arrival: '06:15', status: '待留觀', level: 4 },
];

export const PatientList: React.FC = () => {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        急診候診名單 (Patient Queue)
      </Typography>
      
      <TableContainer component={Paper} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(102, 126, 234, 0.05)' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>病歷號碼</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>姓名</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>性別/年齡</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>抵達時間</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>檢傷級別</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>當前狀態</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id} hover>
                <TableCell>{patient.id}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{patient.name}</TableCell>
                <TableCell>{patient.sex} / {patient.age}y</TableCell>
                <TableCell>{patient.arrival}</TableCell>
                <TableCell>
                  {patient.level ? (
                    <Chip 
                      label={`Level ${patient.level}`} 
                      size="small"
                      sx={{ 
                        bgcolor: LEVEL_COLORS[patient.level as keyof typeof LEVEL_COLORS], 
                        color: 'white', 
                        fontWeight: 'bold' 
                      }} 
                    />
                  ) : (
                    <Typography variant="caption" color="text.secondary">尚未判定</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Circle sx={{ fontSize: 10, color: patient.status === '待檢傷' ? 'error.main' : 'success.main' }} />
                    <Typography variant="body2">{patient.status}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="查看"><IconButton size="small"><Visibility fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="編輯"><IconButton size="small"><Edit fontSize="small" /></IconButton></Tooltip>
                  <IconButton size="small"><MoreVert fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

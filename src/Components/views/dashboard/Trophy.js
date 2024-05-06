import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { styled, useTheme } from '@mui/material/styles';

Chart.register(ArcElement, CategoryScale, Title, Tooltip, Legend);

const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
});

const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
});

const ReservasChart = () => {
  const data = {
    labels: ['Sala de Conferencias Piso 1', 'Homework Piso 3', 'Oficina 2', 'Oficina 3', 'Oficina 4'],
    datasets: [
      {
        data: [50, 30, 20, 10, 5],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    cutout: 70 
  };

  const theme = useTheme();
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png';

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6' textAlign="center">Ranking de reservas 🥳</Typography>
        <TrophyImg style={{ height: "50px", left: "180px", top: "165px", zIndex: 1 }} alt='trophy' src='/images/misc/trophy.png' />
        <div style={{ width: '100%', height: '200px', marginTop: "40px", marginBottom: "40px", marginLeft: "80px", position: 'relative', zIndex: 1 }}>
          <Pie data={data} options={options} />
        </div>
        <Typography textAlign="center" variant="body1" component="div" gutterBottom>
          <span style={{ color: '#FF6384', borderBottom: "1px solid white" }}>Sala de Conferencias Piso 1</span><br />
          <span style={{ color: '#36A2EB' }}>Homework Piso 3</span><br />
          <span style={{ color: '#FFCE56' }}>Oficina 2</span><br />
          <span style={{ color: '#4BC0C0' }}>Oficina 3</span><br />
          <span style={{ color: '#9966FF' }}>Oficina 4</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReservasChart;
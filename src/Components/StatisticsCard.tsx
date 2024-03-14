import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';

interface StatisticsCardProps {
  icon: any; // Material-UI icon name
  name: string;
  stat: number;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ icon, name, stat }) => {
  return (
    <Card sx={{
      // maxWidth:"400px"
    }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <Icon style={{ marginRight: '0.5rem' }}>{icon}</Icon>
          <Typography variant="subtitle1">{name}</Typography>
        </div>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          {stat}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;

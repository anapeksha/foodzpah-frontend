import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function RestaurantCards( {
    category
} ) {
    
    const restaurantType = category ? category.type : "Cannot Fetch";
    const restaurantTime = category ? category.opensAt : "Cannot Fetch";
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {restaurantType}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Opens At - {restaurantTime}
        </Typography>
      </CardContent>
    </Card>
  );
}

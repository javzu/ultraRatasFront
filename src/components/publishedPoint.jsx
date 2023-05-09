import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const PublishedPointCard = ({ id, description, price, state, pointName, pointBank }) => {
  const colorHandler = () => {
    if (state === "draft") {
      return "grey";
    }
    if (state === "published"){
        return "green";
    }
    if(state==="sold"){
      return "red";
    }
    else{
      return "yellow";
    }
  }
  return (
    <Card sx={{ minWidth: 100, background: colorHandler }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Ultra rata point
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          $ {price} CLP
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
        <Typography sx={{ mt: 2.5 }} color="text.secondary">
          {pointName}
        </Typography>
        <Typography sx={{ mb: 0.5 }} color="text.secondary">
          {pointBank}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default PublishedPointCard;
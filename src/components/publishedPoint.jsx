import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const PublishedPointCard = ({ id,data, setSelected, openModal }) => {
  const colorHandler = () => {
    if (data.publicationState === "draft") {
      return "grey";
    }
    if (data.publicationState === "published") {
      return "green";
    }
    if (data.publicationState === "sold") {
      return "red";
    }
    else {
      return "yellow";
    }
  }
  return (
    <Card sx={{ width: 300, background: colorHandler }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Ultra rata point
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          $ {data.price} CLP
        </Typography>
        <Typography variant="body2">
          {data.description}
        </Typography>
        <Typography sx={{ mt: 2.5 }} color="text.secondary">
          {data.pointName}
        </Typography>
        <Typography sx={{ mb: 0.5 }} color="text.secondary">
          {data.pointType.pointName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            setSelected(data);
            openModal(true);
          }}
          size="small"
          style={{color:"white"}}
          >Más detalles</Button>
      </CardActions>
    </Card>
  );
}

export default PublishedPointCard;




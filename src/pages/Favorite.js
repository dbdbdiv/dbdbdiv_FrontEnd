import React, { useState } from "react";
import { Container, Typography, Card, CardContent, Box, Button, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const mock = [
  { name: "Station 1", bikes: 5, rating: 4.5, isFavorite: true },
  { name: "Station 2", bikes: 8, rating: 3.2, isFavorite: false },
  { name: "Station 3", bikes: 7, rating: 4, isFavorite: false },
  { name: "Station 4", bikes: 3, rating: 2.7, isFavorite: true },
];

const Favorite = () => {
  const [favoriteStations, setFavoriteStations] = useState(mock);

  const toggleFavorite = (index) => {
    const updatedStations = [...favoriteStations];
    updatedStations[index].isFavorite = !updatedStations[index].isFavorite;
    setFavoriteStations(updatedStations);
  };

  return (
    <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "50%", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        즐겨찾기 대여소
      </Typography>
      {favoriteStations.map((station, index) => (
        <Card key={index} style={{ width: "100%", marginBottom: "16px" }}>
          <CardContent>
            <Box display="flex" alignItems="center">
              <div onClick={() => toggleFavorite(index)} style={{ cursor: "pointer", marginRight: "8px" }}>
                {station.isFavorite ? <StarIcon color="warning" /> : <StarOutlineIcon color="warning" />}
              </div>
              <Box>
                <Typography variant="h6">{station.name}</Typography>
                <Typography variant="body1">대여가능 자전거: {station.bikes}</Typography>
              </Box>
              <Box marginLeft="auto" display="flex" alignItems="center">
                <Rating name={`rating-${index}`} value={station.rating} readOnly precision={0.1} />
                <Box marginLeft={3}></Box>
                <Button variant="contained" color="primary">
                  대여하기
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Favorite;
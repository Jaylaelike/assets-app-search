/* eslint-disable react/prop-types */
import { Avatar, Skeleton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import { useNavigate } from 'react-router-dom';




export const CardAssets = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const timestamp = Date.now(); // Generate a unique timestamp

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);

  useEffect(() => {
    if (data !== "") {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } else {
      setLoading(true);
    }
  }, [data]);
  
  const navigate = useNavigate();

  const handleClick = (itemId) => {
    navigate(`/FetchDetial/${itemId}`);
  };

  // const navigate = useNavigate();
  
  //console.log(`data is : ${data.map(item => item.No )}`);


  return (
    <Grid
      container
      spacing={{ xs: 2, md: 1 }}
      columns={{ xs: 4, sm: 8, md: 16 }}
      sx={{ flexGrow: 1 }}
    >
      {data.map((item) => (
        <Grid xs={2} sm={4} md={4} key={item.id}>
          <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardHeader
              avatar={
                loading ? (
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                  />
                ) : (
                  <Avatar
                    alt="Ted talk"
                    src={
                      import.meta.env.VITE_IMAGES_URL + `${item.No}` + ".jpg" + `?t=${timestamp}`
                    }
                  />
                )
              }
              action={
                loading ? null : (
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                )
              }
              title={
                loading ? (
                  <Skeleton
                    animation="wave"
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                  />
                ) : (
                  <div className="flex justify-start">
                    <p>{item.Name_Item}</p>
                  </div>
                )
              }
              subheader={
                loading ? (
                  <Skeleton animation="wave" height={10} width="40%" />
                ) : (
                  <div className="flex justify-start">
                    <p>{item.Serial_No}</p>
                  </div>
                )
              }
            />
            {loading ? (
              <Skeleton
                sx={{ height: 190 }}
                animation="wave"
                variant="rectangular"
              />
            ) : (
              <CardMedia
                component="img"
                height="140"
                image={import.meta.env.VITE_IMAGES_URL + `${item.No}` + ".jpg" + `?t=${timestamp}`}
                alt="Nicola Sturgeon on a TED talk stage"
                key={item.id}
                onClick={() => handleClick(item.No)}
              />
            )}

            <CardContent>
              {loading ? (
                <div>
                  <Skeleton
                    animation="wave"
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="80%" />
                </div>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  {item.Description}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardAssets;

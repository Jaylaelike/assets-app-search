/* eslint-disable react/prop-types */
import { Avatar, Skeleton, Typography } from "@mui/material";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";


export const CardAssets = ({ data , isFetching}) => {
 // const [loading, setLoading] = useState(true);
  const MOCKUP_IMAGE_URL = 'https://cdn.vectorstock.com/i/preview-2x/84/01/rainbow-gradient-mesh-blurred-background-vector-29298401.webp';

  const navigate = useNavigate();

  const handleClick = (itemId) => {
    navigate(`/FetchDetial/${itemId}`);
  };


  // const navigate = useNavigate();

  //console.log(`data is : ${data.map(item => item.No )}`);

  return (
    <>

{data ? (
      <Grid
      container
      spacing={{ xs: 2, md: 1 }}
      columns={{ xs: 4, sm: 8, md: 16 }}
      sx={{ flexGrow: 1 }}
    >
      {data.map((item) => (
        <Grid xs={2} sm={4} md={4} key={item.No}>
          <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardHeader
              avatar={
                isFetching ? (
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                  />
                ) : (
                  <Avatar
                    alt="Ted talk"
                    key={item.id}
                    src={
                      item.image_url || MOCKUP_IMAGE_URL
                    }
                  />
                )
              }
              action={
                isFetching ? null : (
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                )
              }
              title={
                isFetching ? (
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
                isFetching ? (
                  <Skeleton animation="wave" height={10} width="40%" />
                ) : (
                  <div className="flex justify-start">
                    <p>{item.Serial_No}</p>
                  </div>
                )
              }
            />
            {isFetching ? (
              <Skeleton
                sx={{ height: 190 }}
                animation="wave"
                variant="rectangular"
              />
            ) : (
              <CardMedia
                component="img"
                height="140"
                width="140"
                image={
                  item.image_url || MOCKUP_IMAGE_URL
                }
                alt="Nicola Sturgeon on a TED talk stage"
                key={item.No}
                onClick={() => handleClick(item.No)}
              />
            )}

            <CardContent>
              {isFetching ? (
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
       
      ) : null}
    </>
   
  );
};

export default CardAssets;

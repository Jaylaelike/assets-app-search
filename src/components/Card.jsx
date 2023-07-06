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

export const CardAssets = ({ data, query }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (!data || data.length === 0) {
    return <p>{`ไม่พบข้อมูลทรัพย์สินในระบบ "${query}"`}</p>;
  }

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
                    src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
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
                image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
                alt="Nicola Sturgeon on a TED talk stage"
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

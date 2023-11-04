import axios from "axios";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import StarIcon from "@mui/icons-material/Star";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";

const fetchData = async (token, setData) => {
  const response = await axios.get(
    "https://staging.fastor.in/v1/m/restaurant",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(response.data);
  setData(response.data);
};

const RestroCard = ({ image, name, rating, cost, address }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        localStorage.setItem("name", name);
        navigate("/product");
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        height: "150px",
        mt: 1,
        pl: 1,
        cursor: "pointer",
        boxShadow: "none",
        "&:hover": {
          "box-shadow":
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;",
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 120, height: 120, borderRadius: "10px" }}
        image={image}
        alt="restaurant image"
      />
      <Box sx={{ height: 120 }}>
        <CardContent sx={{ paddingTop: "0px" }}>
          <Box>
            <Typography
              component="h4"
              sx={{
                textAlign: "left",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#3f4141",
              }}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                fontSize: "10px",
                textAlign: "left",
                fontWeight: "bold",
                color: "#3f4141a9",
              }}
            >
              {" "}
              {address}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Box sx={{ display: "flex", marginBottom: "0px" }}>
                <StarIcon sx={{ width: "14px", color: "#181818ce" }} />
                {rating}
              </Box>
            </Box>
            <Box sx={{ display: "flex", marginBottom: "0px" }}>
              <AttachMoneyIcon sx={{ width: "16px" }} />
              {cost}
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export const Listing = () => {
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(token, setData);
  }, []);

  return (
    <Box sx={{ m: "100px 10px 50px  10px", p: "50px 10px 50px  10px" }}>
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="h5" color="#626363">
          Popular One
        </Typography>
      </Box>

      {data.map((data) => {
        const address =
          data.location && data.location.city_name
            ? `${data.location.city_name}, ${data.location.state_name}`
            : "Delhi";
        return (
          <RestroCard
            image={data.images[0].url}
            name={data.restaurant_name}
            rating={data.rating.restaurant_avg_rating}
            cost={data.avg_cost_for_two}
            address={address}
          />
        );
      })}
    </Box>
  );
};

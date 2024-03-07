import Avatar from "@mui/material/Avatar"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import { red } from "@mui/material/colors"
import React from "react"

const ProductCard = ({ title, thumbnail, rating, price }) => {
  return (
    <Card sx={{ maxWidth: 445, maxHeight: 330 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label={title}>
            R
          </Avatar>
        }
        title={title}
      />
      <CardMedia component="img" height="194" image={thumbnail} alt={title} />
    </Card>
  )
}

export default ProductCard

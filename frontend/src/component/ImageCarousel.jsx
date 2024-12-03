import React from 'react';
import { Box, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = () => {
  const carouselItems = [
    {
      img: "https://www.vidyard.com/media/real-estate-video-marketing-1920x1080-1.jpg",
      title: "Luxury Family Home",
      subtitle: "Spacious 5-bedroom house in the heart of the city",
    },
    {
      img: "https://readytomoveflatsinchandigarh.in/wp-content/uploads/2021/01/House-for-sale-in-Chandigarh-1162x480.png",
      title: "Modern Apartment",
      subtitle: "Stylish 2-bedroom apartment with city skyline views",
    },
    {
      img: "https://img.freepik.com/free-photo/hotel_1127-4035.jpg?ga=GA1.1.1699207593.1729144514&semt=ais_hybrid",
      title: "Beachfront Villa",
      subtitle: "A beautiful villa with stunning sea views and private access",
    },
  ];

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      autoPlay
      interval={3000}
      transitionTime={1000} 
      showIndicators={false}  // Hide dots
      showArrows={false}  
    >
      {carouselItems.map((item, index) => (
        <Box key={index} position="relative">
          <img src={item.img} alt={item.title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
          {/* Overlayed Text */}
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            color="white"
            textAlign="center"
            p={4}  // Add padding here
            bgcolor="rgba(0, 0, 0, 0.5)"
          >
            <Typography variant="h3" component="h2" gutterBottom style={{ paddingBottom: '8px' }}>
              {item.title}
            </Typography>
            <Typography variant="body1" style={{ padding: '0 16px' }}>{item.subtitle}</Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: { origin: "*" }
});

const deliveryPartners = {};

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('updateLocation', ({ orderId, coords }) => {
    deliveryPartners[orderId] = coords;
    console.log(coords.latitude, coords.longitude);
    // Emit the location to customer
    io.to(orderId).emit('onPartnerLocationUpdate', coords);
  });

  socket.on('flyToLocation', ({ orderId, flyToLocation }) => {
    console.log(orderId, flyToLocation);
    io.to(orderId).emit('onFlyToLocationUpdate', flyToLocation);
  });


  socket.on('joinOrderRoom', (orderId) => {
    socket.join(orderId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, (error) => {
  if(!error) {
    console.log("Server running on port " + PORT);
  } else {
    console.log("Error: " + error);
  }
});
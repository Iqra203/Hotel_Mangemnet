import Room from '../Models/Room.js';

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRoom = async (req, res) => {
  const { name, type, price, status, description } = req.body;

  const room = new Room({
    name,
    type,
    price: Number(price),
    status,
    description,
    image: req.file ? req.file.filename : '',
    availability: status === 'Available'
  });

  try {
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    room.name = req.body.name || room.name;
    room.type = req.body.type || room.type;
    room.price = req.body.price || room.price;
    room.status = req.body.status || room.status;
    room.description = req.body.description || room.description;
    room.image = req.file ? req.file.filename : room.image;
    room.availability = req.body.status === 'Available';

    const updatedRoom = await room.save();
    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json({ message: 'Room deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

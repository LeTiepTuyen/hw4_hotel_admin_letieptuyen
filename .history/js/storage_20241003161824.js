// storage.js

// Mẫu dữ liệu phòng
const initialRooms = [
  {
    id: "SP1",
    name: "Standard Room",
    price: 120000,
    imageUrl: "../assets/images/standard-room.jpg",
    description: "A cozy standard room with basic amenities.",
  },
  {
    id: "SP2",
    name: "Deluxe Room",
    price: 350000,
    imageUrl: "assets/images/deluxe-room.jpg",
    description: "A spacious deluxe room with extra comfort and a beautiful view.",
  },
  {
    id: "SP3",
    name: "Family Suite",
    price: 500000,
    imageUrl: "assets/images/family-suite.jpg",
    description: "A large suite perfect for families, complete with a living area.",
  },
  {
    id: "SP4",
    name: "Single Room",
    price: 80000,
    imageUrl: "assets/images/single-room.jpg",
    description: "A simple yet comfortable room for solo travelers.",
  },
  {
    id: "SP5",
    name: "Presidential Suite",
    price: 1000000,
    imageUrl: "assets/images/presidential-suite.jpg",
    description: "A luxurious suite with premium facilities and stunning views.",
  },
];

// Kiểm tra nếu LocalStorage chưa có dữ liệu thì thêm dữ liệu mẫu vào
if (!localStorage.getItem("hotelRooms")) {
  localStorage.setItem("hotelRooms", JSON.stringify(initialRooms));
  console.log("Dữ liệu mẫu đã được thêm vào LocalStorage.");
} else {
  console.log("Dữ liệu đã có trong LocalStorage.");
}

// Lấy danh sách phòng từ LocalStorage
function getRooms() {
  const rooms = localStorage.getItem("hotelRooms");
  return rooms ? JSON.parse(rooms) : [];
}

// Lưu danh sách phòng vào LocalStorage
function saveRooms(rooms) {
  localStorage.setItem("hotelRooms", JSON.stringify(rooms));
}

// Thêm phòng
function addRoom(room) {
  const rooms = getRooms();
  rooms.push(room);
  saveRooms(rooms);
}

// Xóa phòng
function deleteRoom(id) {
  let rooms = getRooms();
  rooms = rooms.filter((room) => room.id !== id);
  saveRooms(rooms);
}

// Sửa phòng
function updateRoom(updatedRoom) {
  let rooms = getRooms();
  rooms = rooms.map((room) => (room.id === updatedRoom.id ? updatedRoom : room));
  saveRooms(rooms);
}

// Lấy phòng theo ID
function getRoomById(id) {
  const rooms = getRooms();
  return rooms.find((room) => room.id === id);
}

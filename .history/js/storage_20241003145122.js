// storage.js
const roomsKey = "hotelRooms";

// Lấy danh sách phòng từ LocalStorage
function getRooms() {
  const rooms = localStorage.getItem(roomsKey);
  return rooms ? JSON.parse(rooms) : [];
}

// Lưu danh sách phòng vào LocalStorage
function saveRooms(rooms) {
  localStorage.setItem(roomsKey, JSON.stringify(rooms));
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

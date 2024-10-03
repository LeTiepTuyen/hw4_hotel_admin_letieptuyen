// main.js

// Hiển thị danh sách phòng trên AdminPage và Homepage
function renderAdminRooms() {
  const roomsAdminList = document.getElementById("rooms-list-body");
  roomsAdminList.innerHTML = "";
  const rooms = getRooms();
  rooms.forEach((room) => {
    const roomRow = `
          <tr>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${room.id}</td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${room.name}</td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <img src="${room.imageUrl}" alt="${room.name}" class="h-16 w-16 object-cover">
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${room.price}</td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <button class="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2" onclick="showUpdateForm('${room.id}')">Update</button>
                  <button class="bg-red-500 text-white px-4 py-2 rounded-lg" onclick="deleteRoom('${room.id}'); renderAdminRooms(); renderHomepageRooms();">Delete</button>
              </td>
          </tr>
      `;
    roomsAdminList.innerHTML += roomRow;
  });
}

function renderHomepageRooms() {
  const roomList = document.getElementById("room-list");
  if (roomList) {
    roomList.innerHTML = "";
    const rooms = getRooms();
    rooms.forEach((room) => {
      const roomCard = `
              <div class="bg-white p-4 rounded shadow-md">
                  <img src="${room.imageUrl}" alt="${room.name}" class="w-full h-32 object-cover">
                  <h3 class="text-xl my-2">${room.name}</h3>
                  <p class="text-gray-600">Price: ${room.price}</p>
                  <a href="pages/detail.html?id=${room.id}" class="bg-blue-500 text-white px-4 py-2 mt-4 block text-center">View Details</a>
              </div>
          `;
      roomList.innerHTML += roomCard;
    });
  }
}

// Add Room
document.getElementById("add-room-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("room-name").value;
  const price = document.getElementById("room-price").value;
  const imageUrl = document.getElementById("room-image").value;
  const description = document.getElementById("room-description").value;

  const newRoom = {
    id: `SP${Date.now()}`, // Tạo ID tự động
    name,
    price,
    imageUrl,
    description,
  };

  addRoom(newRoom);
  renderAdminRooms();
  renderHomepageRooms();
  document.getElementById("popup-form").classList.add("hidden");
});

// Show Update Form
function showUpdateForm(id) {
  const room = getRoomById(id);
  if (room) {
    // Hiển thị popup form với thông tin phòng đã có
    document.getElementById("room-name").value = room.name;
    document.getElementById("room-price").value = room.price;
    document.getElementById("room-image").value = room.imageUrl;
    document.getElementById("room-description").value = room.description;

    document.getElementById("popup-form").classList.remove("hidden");

    // Thay đổi xử lý form thành update thay vì add mới
    const form = document.getElementById("add-room-form");
    form.removeEventListener("submit", addRoomHandler); // Loại bỏ sự kiện thêm mới
    form.onsubmit = function (e) {
      e.preventDefault();
      updateRoom(id); // Hàm cập nhật phòng
    };
  }
}

// Update Room
function updateRoom(id) {
  const name = document.getElementById("room-name").value;
  const price = document.getElementById("room-price").value;
  const imageUrl = document.getElementById("room-image").value;
  const description = document.getElementById("room-description").value;

  const updatedRoom = {
    id, // giữ nguyên ID
    name,
    price,
    imageUrl,
    description,
  };

  const rooms = getRooms();
  const roomIndex = rooms.findIndex((room) => room.id === id);
  if (roomIndex !== -1) {
    rooms[roomIndex] = updatedRoom;
    saveRooms(rooms);
    renderAdminRooms();
    renderHomepageRooms();
    document.getElementById("popup-form").classList.add("hidden");
  }
}

// Delete Room
function deleteRoom(id) {
  let rooms = getRooms();
  rooms = rooms.filter((room) => room.id !== id);
  saveRooms(rooms);
  renderAdminRooms();
  renderHomepageRooms();
}

// Lưu trữ phòng vào LocalStorage
function addRoomHandler(e) {
  e.preventDefault();
  addRoom({
    id: `SP${Date.now()}`,
    name: document.getElementById("room-name").value,
    price: document.getElementById("room-price").value,
    imageUrl: document.getElementById("room-image").value,
    description: document.getElementById("room-description").value,
  });
  renderAdminRooms();
  renderHomepageRooms();
  document.getElementById("popup-form").classList.add("hidden");
}

// main.js

// Render danh sách phòng trên Homepage
document.addEventListener("DOMContentLoaded", () => {
  const roomList = document.getElementById("room-list");
  if (roomList) {
    const rooms = getRooms();
    rooms.forEach((room) => {
      const roomCard = `
              <div class="bg-white p-4 rounded shadow-md">
                  <img src="${room.imageUrl}" alt="${room.name}" class="w-full h-32 object-cover">
                  <h3 class="text-xl my-2">${room.name}</h3>
                  <p class="text-gray-600">Price: ${room.price}</p>
                  <a href="detail.html?id=${room.id}" class="bg-blue-500 text-white px-4 py-2 mt-4 block text-center">View Details</a>
              </div>
          `;
      roomList.innerHTML += roomCard;
    });
  }

  const roomsAdminList = document.getElementById("rooms-admin-list");
  const addRoomBtn = document.getElementById("add-room-btn");
  if (roomsAdminList && addRoomBtn) {
    renderAdminRooms();
    addRoomBtn.addEventListener("click", () => {
      const room = {
        id: `SP${Date.now()}`,
        name: `Room ${Date.now()}`,
        price: 100000,
        imageUrl: "path/to/image.jpg",
      };
      addRoom(room);
      renderAdminRooms();
    });
  }

  const roomDetail = document.getElementById("room-detail");
  if (roomDetail) {
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get("id");
    if (roomId) {
      const room = getRoomById(roomId);
      roomDetail.innerHTML = `
              <h2 class="text-2xl">${room.name}</h2>
              <img src="${room.imageUrl}" alt="${room.name}" class="w-full h-64 object-cover">
              <p class="mt-4">Price: ${room.price}</p>
              <p class="mt-2">${room.description || "No description available"}</p>
          `;
    }
  }
});

// Render danh sách phòng trên AdminPage
function renderAdminRooms() {
  const roomsAdminList = document.getElementById("rooms-admin-list");
  roomsAdminList.innerHTML = "";
  const rooms = getRooms();
  rooms.forEach((room) => {
    const roomRow = `
          <div class="flex justify-between bg-white p-4 rounded shadow-md mb-2">
              <div>
                  <h3 class="text-xl">${room.name}</h3>
                  <p>Price: ${room.price}</p>
              </div>
              <div>
                  <button class="bg-red-500 text-white px-4 py-2" onclick="deleteRoom('${room.id}'); renderAdminRooms();">Delete</button>
              </div>
          </div>
      `;
    roomsAdminList.innerHTML += roomRow;
  });
}

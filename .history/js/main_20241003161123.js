// main.js

let editingRoomId = null;

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
                    <div class="w-16 h-16 overflow-hidden flex items-center justify-center">
                        <img src="${room.imageUrl}" alt="${room.name}" class="object-contain h-full w-full">
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${room.price}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 flex justify-between">
                    <button class="bg-red-500 text-white text-sm px-3 py-1 rounded-lg mr-2" onclick="showUpdateForm('${room.id}')">Update</button>
                    <button class="bg-red-500 text-white text-sm px-3 py-1 rounded-lg" onclick="deleteRoom('${room.id}'); renderAdminRooms(); renderHomepageRooms();">Delete</button>
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
document.getElementById("add-room-btn").addEventListener("click", () => {
  editingRoomId = null;
  document.getElementById("popup-title").innerText = "Add New Room";
  document.getElementById("room-form").reset();
  document.getElementById("popup-form").classList.remove("hidden");
});

document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("popup-form").classList.add("hidden");
});

// Add or Update Room
document.getElementById("room-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("room-name").value;
  const price = document.getElementById("room-price").value;
  const imageUrl = document.getElementById("room-image").value;
  const description = document.getElementById("room-description").value;

  if (editingRoomId === null) {
    const newRoom = {
      id: `SP${Date.now()}`, // Tạo ID tự động
      name,
      price,
      imageUrl,
      description,
    };
    addRoom(newRoom);
  } else {
    updateRoom({ id: editingRoomId, name, price, imageUrl, description });
  }

  renderAdminRooms();
  renderHomepageRooms();
  document.getElementById("popup-form").classList.add("hidden");
});

// Show Update Form
function showUpdateForm(id) {
  editingRoomId = id;
  const room = getRoomById(id);
  if (room) {
    document.getElementById("popup-title").innerText = "Update Room";
    document.getElementById("room-name").value = room.name;
    document.getElementById("room-price").value = room.price;
    document.getElementById("room-image").value = room.imageUrl;
    document.getElementById("room-description").value = room.description;
    document.getElementById("popup-form").classList.remove("hidden");
  }
}

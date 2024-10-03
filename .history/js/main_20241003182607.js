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
            <img src="../${room.imageUrl}" alt="${room.name}" style="width: 7%; height: 7%; object-fit: contain;">
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${room.price}</td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 flex items-center justify-center space-x-4">
    <button class="text-blue-500 hover:text-blue-700" onclick="showUpdateForm('${room.id}')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
    </button>
    <button class="text-red-500 hover:text-red-700" onclick="deleteRoom('${room.id}'); renderAdminRooms(); renderHomepageRooms();">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-7 7-7-7" />
        </svg>
    </button>
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
        <div class="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div class="h-48 overflow-hidden">
            <img src="${room.imageUrl}" alt="${room.name}" class="w-full h-full object-cover">
          </div>
          <div class="mt-4">
            <h3 class="text-lg font-semibold">${room.name}</h3>
            <p class="text-gray-600 mt-2">${room.price.toLocaleString()}₫</p>
          </div>
          <div class="mt-4 flex justify-between items-center">
            <a href="pages/detail.html?id=${
              room.id
            }" class="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">View Details</a>
            <button class="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors">Book Now</button>
          </div>
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

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
            <img src="${
              room.imageUrl.startsWith("assets") ? (room.imageUrl = `../${room.imageUrl}`) : room.imageUrl
            }" alt="${room.name}" style="width: 7%; height: 7%; object-fit: contain;">
          </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">${room.price}</td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 flex items-center justify-center space-x-4">
          <button class="p-4 hover:bg-blue-100 rounded-full" onclick="showUpdateForm('${room.id}')">
            <img src="../assets/images/update-icon.png" alt="Update" class="w-6 h-6">
          </button>
          <button class="p-4 hover:bg-red-100 rounded-full" onclick="deleteRoom('${
            room.id
          }'); renderAdminRooms(); renderHomepageRooms();">
            <img src="../assets/images/delete-icon.png" alt="Delete" class="w-6 h-6">
          </button>
        </td>
    </tr>
`;

    roomsAdminList.innerHTML += roomRow;
  });
}

function renderHomepageRooms() {
  const rooms = getRooms();
  renderRoomCards(rooms);
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

// Function to create room cards
function createRoomCard(room) {
  const card = document.createElement("div");
  card.className =
    "bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500";
  card.tabIndex = "0";
  card.innerHTML = `
    <div class="flex flex-col h-full">
      <div class="w-full h-96 overflow-hidden">
        <img src="${room.imageUrl}" alt="${room.name}" class="w-full h-full object-cover">
      </div>
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h2 class="text-2xl font-semibold mb-2 text-gray-800">${room.name}</h2>
          <p class="text-gray-600 mb-4">${room.description}</p>
        </div>
        <div class="flex justify-center space-x-4 mt-4">
          <a href="pages/detail.html?id=${room.id}" class="bg-blue-500 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition-colors duration-300">View Details</a>
          <button class="bg-green-500 text-white px-6 py-3 rounded-md font-medium hover:bg-green-600 transition-colors duration-300" aria-label="Book ${room.name}">Book Now</button>
        </div>
      </div>
    </div>
  `;
  return card;
}

// Function to filter rooms based on search input
function filterRooms(rooms, searchTerm) {
  return rooms.filter((room) => room.name.toLowerCase().includes(searchTerm.toLowerCase()));
}

// Function to render room cards
function renderRoomCards(rooms) {
  const roomList = document.getElementById("room-list");
  roomList.innerHTML = ""; // Clear existing room cards

  if (rooms.length > 0) {
    rooms.forEach((room) => {
      roomList.appendChild(createRoomCard(room));
    });
  } else {
    const noRoomsMessage = document.createElement("p");
    noRoomsMessage.textContent = "No rooms found matching your search.";
    noRoomsMessage.className = "text-center text-gray-600 text-xl col-span-full";
    roomList.appendChild(noRoomsMessage);
  }
}

// Function to handle search
function handleSearch() {
  const searchInput = document.getElementById("room-search");
  const searchTerm = searchInput.value.trim();
  const allRooms = getRooms();

  const filteredRooms = searchTerm ? filterRooms(allRooms, searchTerm) : allRooms;
  renderRoomCards(filteredRooms);
}

// Function to initialize homepage
function initializeHomepage() {
  renderHomepageRooms();

  const searchInput = document.getElementById("room-search");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }
}

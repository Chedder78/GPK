function addGlossyEffect(element) {
    element.classList.toggle('glossy-effect');
}

function expandBox(boxId) {
    var box = document.getElementById(boxId);
    var content = box.querySelector('.content');
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
}

function closeBox(boxId) {
    var content = document.getElementById(boxId).querySelector('.content');
    content.style.display = 'none';
}
function addGlossyEffect(element) {
  element.classList.add('glossy-effect');
  setTimeout(() => {
    element.classList.remove('glossy-effect');
  }, 2000); // Remove the glossy effect after 2 seconds
}
function expandBox(boxId) {
  var box = document.getElementById(boxId);
  var content = document.getElementById('content' + boxId);
  if (box.style.width !== "100%") {
    box.style.width = "100%";
    box.style.height = "90vh"; // Adjust as needed
    content.style.display = "block";
  } else {
    box.style.width = "300px"; // Original size
    box.style.height = "200px"; // Original size
    content.style.display = "none";
  }
}
function expandBox(boxId) {
  var box = document.getElementById(boxId);
  var content = document.getElementById('content' + boxId);
  box.style.width = "100%";
  box.style.height = "90vh"; // Adjust as needed
  content.style.display = "block";
}

function closeBox(boxId) {
  var box = document.getElementById(boxId);
  var content = document.getElementById('content' + boxId);
  box.style.width = "300px"; // Original size
  box.style.height = "200px"; // Original size
  content.style.display = "none";
}
function toggleMenu() {
  const menu = document.getElementById('sliding-Menu');
  menu.classList.toggle('show');
}

// Close the menu when clicking outside
window.onclick = function(event) {
  const menu = document.getElementById('sliding-Menu');
  if (!menu.contains(event.target) && !event.target.matches('.menu-button')) {
    menu.classList.remove('show');
  }
}
function toggleMenu() {
  const menu = document.getElementById('sliding-Menu');
  menu.classList.toggle('show');
}

// Close the menu when clicking outside
window.onclick = function(event) {
  const menu = document.getElementById('sliding-Menu');
  if (!menu.contains(event.target) && !event.target.matches('.menu-button')) {
    menu.classList.remove('show');
  }
}


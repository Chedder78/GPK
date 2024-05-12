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

document.addEventListener('DOMContentLoaded', function () {
    const menu = document.querySelector('.menu');
    const menuBtn = document.querySelector('.menu-btn');
    const menuWidth = getComputedStyle(document.documentElement)
                      .getPropertyValue('--menu-width');

    // Function to toggle the menu
    function toggleMenu() {
        if (menu.style.left === '-250px') {
            menu.style.left = '-' + menuWidth;
        } else {
            menu.style.left = '-250px';
        }
    }

    // Event listener for the menu button
    menuBtn.addEventListener('click', function () {
        toggleMenu();
    });

    // Close the menu if clicking outside of it
    document.addEventListener('click', function (event) {
        let targetElement = event.target; // clicked element

        do {
            if (targetElement === menu || targetElement === menuBtn) {
                // This is a click inside, do nothing, just return.
                return;
            }
            // Go up the DOM
            targetElement = targetElement.parentNode;
        } while (targetElement);

        // This is a click outside, close the menu if it's open.
        if (menu.style.left === '-250px') {
            toggleMenu();
        }
    });
});

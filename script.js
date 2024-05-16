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
});document.addEventListener('DOMContentLoaded', function() {
    // Ensure the menu element and its width are correctly initialized
    const menu = document.getElementById('sliding-menu'); // Adjust ID as necessary
    const menuWidth = menu.offsetWidth; // This assumes the width is set and stable

    // Function to toggle the menu
    function toggleMenu() {
        // Check if the menu is already shown (positioned at 0px)
        if (menu.style.left === '0px') {
            menu.style.left = '-' + menuWidth + 'px'; // Move it left by its own width
        } else {
            menu.style.left = '0px'; // Move it back to show it
        }
    }

    // Event listener for menu toggle (assumes a button with class 'menu-button' exists)
    const menuButton = document.querySelector('.menu-button');
    menuButton.addEventListener('click', toggleMenu);
});

  document.addEventListener("DOMContentLoaded", function() {
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazyload"));
    if ("IntersectionObserver" in window) {
      let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazyload");
            observer.unobserve(img);
          }
        });
      });
      lazyImages.forEach(img => {
        observer.observe(img);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove("lazyload");
      });
    }
  });
document.querySelectorAll('.info-box button').forEach(button => {
    button.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.border = '1px solid #ccc';
        modal.style.padding = '20px';
        modal.style.background = 'white';
        modal.innerText = 'Detailed info here!';
        document.body.appendChild(modal);
        setTimeout(() => document.body.removeChild(modal), 3000); // Remove modal after 3 seconds
    });
});

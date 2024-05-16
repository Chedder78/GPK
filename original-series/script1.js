// Function to open the corresponding large box
function openLargeBox(boxId) {
    var box = document.getElementById('largeBox' + boxId);
    box.style.display = 'block'; // Show the large box
    // Add functionality to close the box when clicked outside
    window.onclick = function(event) {
        if (event.target == box) {
            box.style.display = 'none'; // Hide the box
        }
    }
}

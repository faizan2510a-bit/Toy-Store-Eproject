// ----------------- Download Button -----------------
function downloadToyFeatures(element) {
    // Get the toy div containing the button
    const toyDiv = element.closest('.toy');

    // Get file path from data attribute
    const filePath = toyDiv.dataset.doc; // e.g., "documents/lego1.docx"
    if (!filePath) {
        alert("No file available to download.");
        return;
    }

    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = filePath;
    a.download = filePath.split('/').pop(); // use file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// ----------------- View Details Modal -----------------
function showDetailsFromHTML(element) {
    const toyDiv = element.closest('.toy');

    // Fill modal info
    document.getElementById('modalTitle').innerText = toyDiv.querySelector('h3').innerText;
    document.getElementById('modalBrand').innerText = 'Brand: ' + toyDiv.dataset.brand;
    document.getElementById('modalAge').innerText = 'Recommended Age: ' + toyDiv.dataset.age;
    document.getElementById('modalPrice').innerText = 'Price: $' + toyDiv.dataset.price;
    document.getElementById('modalDetails').innerText = toyDiv.dataset.details;

    // Set download button in modal
    const modalDownload = document.getElementById('modalDownload');
    modalDownload.onclick = function() {
        downloadToyFeatures(toyDiv.querySelector('.download-btn'));
    };

    // Show modal
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('detailsModal').style.display = 'block';
}

function closeDetails() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('detailsModal').style.display = 'none';
}


// --- SCROLL BUTTONS FIXED ---
// Use a fixed scroll distance for consistency
const scrollAmount = 220; // pixels to scroll each click

function scrollLeft() {
    const container = document.getElementById("toyContainer");
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
}

function scrollRight() {
    const container = document.getElementById("toyContainer");
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

// document

function downloadFeatures(el) {
    const card = el.closest('.toy');
    const toyName = card.querySelector('h3').innerText;
    const featuresText = card.dataset.features;

    // Create a Blob with text content
    const blob = new Blob([featuresText], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    
    // Create a temporary download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${toyName}_Features.docx`;
    
    // Trigger download
    link.click();

    // Clean up
    URL.revokeObjectURL(link.href);
}

// --- FILTERS ---
function filterByBrand(brand) {
    const toys = document.querySelectorAll(".toy");
    toys.forEach(toy => {
        toy.style.display = (brand === "all" || toy.dataset.brand === brand) ? "block" : "none";
    });
}

function filterByAge(age) {
    const toys = document.querySelectorAll(".toy");
    toys.forEach(toy => {
        toy.style.display = (age === "all" || toy.dataset.age === age) ? "block" : "none";
    });
}


// --- DETAILS ---
function showDetailsFromHTML(el) {
    const card = el.closest('.toy');
    document.getElementById("detailsImage").src = card.querySelector('img').src;
    document.getElementById("detailsName").innerText = card.querySelector('h3').innerText;
    document.getElementById("detailsBrand").innerText = "Brand: " + card.dataset.brand;
    document.getElementById("detailsAge").innerText = "Age: " + card.dataset.age;
    document.getElementById("detailsPrice").innerText = "Price: $" + card.dataset.price;
    document.getElementById("detailsDesc").innerText = card.dataset.details;

    document.getElementById("mainContent").style.display = "none";
    document.getElementById("toyDetails").style.display = "block";
}

function closeDetailsPage() {
    document.getElementById("toyDetails").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
}

// --- CART ---
function addToCartFromHTML(el) {
    const card = el.closest('.toy');
    document.getElementById("cartToyImage").src = card.querySelector('img').src;
    document.getElementById("cartToyName").innerText = card.querySelector('h3').innerText;
    document.getElementById("cartToyPrice").innerText = "Price: $" + card.dataset.price;
    document.getElementById("cartModal").style.display = "block";
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

// Contact form validation and success message
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // prevent actual submission

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Show success message
    document.getElementById("successMessage").style.display = "block";

    // Optional: clear form
    document.getElementById("contactForm").reset();
});


// --- COMPARE ---
let compareList = []; // stores toy objects

function addToCompareFromHTML(el) {
    const card = el.closest('.toy');
    
    const toy = {
        name: card.querySelector('h3').innerText,
        brand: card.dataset.brand,
        age: card.dataset.age,
        price: card.dataset.price
    };

    // Check if already in compare
    if (compareList.some(t => t.name === toy.name)) {
        alert(`"${toy.name}" is already in compare list.`);
        return;
    }

    // Limit to 3 toys
    if (compareList.length >= 3) {
        alert("You can compare only up to 3 toys at a time.");
        return;
    }

    compareList.push(toy);
    updateCompareTable();
}

// --- UPDATE TABLE ---
function updateCompareTable() {
    const tableBody = document.querySelector("#compareTable tbody");
    tableBody.innerHTML = ""; // clear previous rows

    compareList.forEach((toy, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${toy.name}</td>
            <td>${toy.brand}</td>
            <td>${toy.age}</td>
            <td>$${toy.price}</td>
            <td><button onclick="removeFromCompare(${index})">Remove</button></td>
        `;
        tableBody.appendChild(row);
    });

    // Show compare section if there's at least 1 toy
    document.getElementById("compareSection").style.display = compareList.length > 0 ? "block" : "none";
}

// --- REMOVE FROM COMPARE ---
function removeFromCompare(index) {
    compareList.splice(index, 1);
    updateCompareTable();
}

// --- CLEAR ALL ---
function clearCompare() {
    compareList = [];
    updateCompareTable();
}


// --- NAV LINKS ---
function showMain() {
    closeDetailsPage();
}


// --- CART ---
function addToCart(index) {
    const toy = toyData[index];
    document.getElementById("cartToyImage").src = toy.img;
    document.getElementById("cartToyName").innerText = toy.name;
    document.getElementById("cartToyPrice").innerText = "Price: $" + toy.price;
    document.getElementById("cartModal").style.display = "block";
}

function addToCartFromDetails() {
    addToCart(0);
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

// --- NAV LINKS ---
function showMain() {
    closeDetailsPage();
}

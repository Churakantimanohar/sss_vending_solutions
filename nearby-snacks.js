// Sample data: You can replace this with an actual database or API
const vendingMachines = [
    { name: "Vending Machine A", location: "Mumbai", lat: 19.0760, lon: 72.8777 },
    { name: "Vending Machine B", location: "Delhi", lat: 28.7041, lon: 77.1025 },
    { name: "Vending Machine C", location: "Bangalore", lat: 12.9716, lon: 77.5946 },
    { name: "Vending Machine D", location: "Chennai", lat: 13.0827, lon: 80.2707 },
    // Add more machines as necessary
];

// Function to calculate distance between two locations (in km)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

// Event listener for the form submission
document.getElementById('location-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const locationInput = document.getElementById('location').value.trim();
    if (locationInput) {
        findNearbyMachines(locationInput);
    }
});

// Function to find nearby vending machines
function findNearbyMachines(location) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = ""; // Clear previous results

    // Use a predefined location to simulate the user's location
    const userLocation = { lat: 19.0760, lon: 72.8777 }; // You can use Geolocation API for dynamic location

    // Filter machines that are within a certain distance (e.g., 50km)
    const nearbyMachines = vendingMachines.filter(machine => {
        const distance = calculateDistance(userLocation.lat, userLocation.lon, machine.lat, machine.lon);
        return distance <= 50; // Only machines within 50km
    });

    // Display results
    if (nearbyMachines.length > 0) {
        nearbyMachines.forEach(machine => {
            const machineElement = document.createElement('div');
            machineElement.classList.add('machine-item');
            machineElement.innerHTML = `
                <h3>${machine.name}</h3>
                <p>Location: ${machine.location}</p>
                <p>Distance: ${calculateDistance(userLocation.lat, userLocation.lon, machine.lat, machine.lon).toFixed(2)} km</p>
            `;
            resultContainer.appendChild(machineElement);
        });
    } else {
        resultContainer.innerHTML = "<p>No vending machines found nearby.</p>";
    }
}

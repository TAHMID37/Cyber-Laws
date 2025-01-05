// Load countries data from JSON file
let cyberLaws = {};

// Function to get all countries
export function getCountries() {
    return Object.keys(cyberLaws);
}

// Function to get laws for a specific country
export function getLaws(country) {
    return cyberLaws[country] || [];
}

// Function to add a new country and its laws
export function addCountry(country, laws) {
    if (!cyberLaws[country]) {
        cyberLaws[country] = laws;
        return true;
    }
    return false;
}

// Initialize data
fetch('/js/data/countries.json')
    .then(response => response.json())
    .then(data => {
        cyberLaws = data;
    })
    .catch(error => {
        console.error('Error loading countries data:', error);
    });
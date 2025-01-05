import { loadCountriesData, saveCountriesData } from './data/dataService.js';

let cyberLaws = {};

document.addEventListener('DOMContentLoaded', async () => {
    const countrySelect = document.getElementById('countrySelect');
    const lawsDisplay = document.getElementById('lawsDisplay');
    const addCountryForm = document.getElementById('addCountryForm');

    // Load initial data
    cyberLaws = await loadCountriesData();
    populateCountries();

    // Populate country dropdown
    function populateCountries() {
        const countries = Object.keys(cyberLaws).sort();
        countrySelect.innerHTML = '<option value="">Select a country...</option>';
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });
    }

    // Display laws for selected country
    function displayLaws(country) {
        const laws = cyberLaws[country] || [];
        if (laws.length === 0) {
            lawsDisplay.innerHTML = '<p class="select-prompt">No laws found for this country.</p>';
            return;
        }

        lawsDisplay.innerHTML = laws.map(law => 
            `<div class="law-item">${law}</div>`
        ).join('');
    }

    // Event Listeners
    countrySelect.addEventListener('change', (e) => {
        const selectedCountry = e.target.value;
        if (selectedCountry) {
            displayLaws(selectedCountry);
        } else {
            lawsDisplay.innerHTML = '<p class="select-prompt">Please select a country to view its cyber laws.</p>';
        }
    });

    addCountryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const countryName = document.getElementById('newCountry').value.trim();
        const lawsText = document.getElementById('newLaws').value.trim();
        
        if (!countryName || !lawsText) {
            alert('Please fill in all fields');
            return;
        }

        const lawsArray = lawsText.split('\n').filter(law => law.trim() !== '');

        // Save to backend
        const saved = await saveCountriesData(countryName, lawsArray);
        if (saved) {
            // Update local data
            cyberLaws = await loadCountriesData();
            populateCountries();
            countrySelect.value = countryName;
            displayLaws(countryName);
            addCountryForm.reset();
            alert('Country added successfully!');
        } else {
            alert('Error saving country data. Please try again.');
        }
    });
});
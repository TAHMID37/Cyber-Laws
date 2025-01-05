// Function to load countries data
export async function loadCountriesData() {
    try {
        const response = await fetch('http://localhost:8000/api/countries');
        return await response.json();
    } catch (error) {
        console.error('Error loading countries data:', error);
        return {};
    }
}

// Function to save country data
export async function saveCountriesData(countryName, laws) {
    try {
        const response = await fetch('http://localhost:8000/api/countries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: countryName,
                laws: laws
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to save country');
        }
        
        return true;
    } catch (error) {
        console.error('Error saving country data:', error);
        return false;
    }
}
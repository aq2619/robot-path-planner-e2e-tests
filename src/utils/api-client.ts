import axios from 'axios';

const API_BASE_URL = 'http://localhost:1000/node-api/edge';

// Function to check the health of the API
export const checkHealth = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/health`);
        return response.data;
    } catch (error) {
        throw new Error(`Error checking health: ${error.message}`);
    }
};

// Function to get the API version
export const getVersion = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/version`);
        return response.data;
    } catch (error) {
        throw new Error(`Error getting version: ${error.message}`);
    }
};

// Function to get missions and validate their structure
export const getMissions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/missions`);
        const missions = response.data;

        // Validate structure (you can add your validation logic here)
        if (!Array.isArray(missions)) {
            throw new Error('Missions should be an array');
        }

        return missions;
    } catch (error) {
        throw new Error(`Error fetching missions: ${error.message}`);
    }
};

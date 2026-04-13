class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async healthCheck() {
        const response = await fetch(`${this.baseURL}/health`);
        return await response.json();
    }

    async getVersion() {
        const response = await fetch(`${this.baseURL}/version`);
        return await response.json();
    }

    async validateZoneRetrieval(zoneId) {
        const response = await fetch(`${this.baseURL}/zones/${zoneId}`);
        return await response.json();
    }
}

export default new ApiClient('http://localhost:1000/node-api/edge');

import axios from "axios";

class ApiManager {
    axiosClient = axios.create();
    apiKey = process.env.REACT_APP_API_KEY;

    async initialize() {     
        this.axiosClient.defaults.baseURL = process.env.REACT_APP_BASE_URL;
    }

    // makeRequest = async (url) => {
    //     await this.initialize();
        
    //     const axiosOptions = {
    //         method: "GET",
    //         url: `${url}`,
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             "x-rapidapi-host": "v3.football.api-sports.io",
    //             "x-rapid-key": this.apiKey,
    //         },
    //     };

    //     try {
    //         const response = await this.axiosClient(axiosOptions);
    //         console.log(response)
    //         return response;
    //     } catch (error) {
    //         console.log("Error:", error);
    //         throw error;
    //     }
    // }

    makeRequest = async (url) => {
        try { 
            const response = await this.axiosClient({
                method: "GET",
                url: `https://v3.football.api-sports.io/${url}`,
                headers: {
                    "x-rapidapi-host": "v3.football.api-sports.io",
                    "x-rapidapi-key": this.apiKey,
                },
            });    
            // console.log(response.data);
            return response.data;
        } catch (error) {
            // console.error(error);
            throw error;
        }
    };
    
}

export default ApiManager;

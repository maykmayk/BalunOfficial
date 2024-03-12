import axios from "axios";

class ProvaApi {
    axiosClient = axios.create();

    makeRequest = async (url, includeTimestamp = true) => {
        try {
            let fullUrl = `https://thingproxy.freeboard.io/fetch/https://www.fotmob.com/${url}`;
            
            if (includeTimestamp) {
                const timestamp = new Date().getTime();
                fullUrl += `${url.includes('?') ? '&' : '?'}_=${timestamp}`;
            }
    
            const response = await this.axiosClient({
                method: "GET",
                url: fullUrl,
            });
    
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    makeSearch = async (url) => {
        try { 
            const fullUrl = `https://thingproxy.freeboard.io/fetch/https://apigw.fotmob.com/${url}`;
            const response = await this.axiosClient({
                method: "GET",
                url: fullUrl,
                headers: {
                    'Cache-Control': 'no-cache',
                },
            });    
            return response;
        } catch (error) {
            // console.error(error);
            throw error;
        }
    };
}

export default ProvaApi;

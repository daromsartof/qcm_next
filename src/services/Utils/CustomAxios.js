import axios from "axios"

class CustomAxios {
   async getData(url, params) {
        try {
          const response = await axios.get(url, {
                params: {
                    ...params
                }
            })
            return response.data
        } catch (error) {
            console.error("ici", error)
        }
        
    }
}

export default new CustomAxios()
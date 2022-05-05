import axios from "axios";
export default axios.create({
    //change from localhost:8080/api
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-type": "application/json"
    }
});
import axios from "axios";

const serviceUserURL = "http://localhost:8080";


class ServiceUser {
    userId;

    getUsers()
    {
        return axios.get(serviceUserURL);
    }

    createUsers(user)
    {
        return axios.post(serviceUserURL, user);
    }

    getUserById(userId)
    {
        return axios.get(serviceUserURL + '/' + userId);
    }

    updateUser(user, userid)
    {
        return axios.put(serviceUserURL + '/' + this.userId, user);
    }

    deleteUser(userId)
    {
        return axios.delete(serviceUserURL + '/' + userId);
    }
}

export default new ServiceUser()
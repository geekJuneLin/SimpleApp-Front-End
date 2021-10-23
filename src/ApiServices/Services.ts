import axios from "axios";
import { User } from "../Data/User";

const POST_URL = "http://localhost:5000/api/user"
const FETCH_USER_URL = "http://localhost:5000/api/user"

export const postUser = (user: User): Promise<string> => {
    return new Promise((resolve, reject) => {
        axios.post<string>(POST_URL, user, {
            headers: {
                "Content-Type": "application/json"
            }
        } )
            .then(res => resolve(res.data))
        .catch(err => reject(err)
        )
    })
}

export const fetchUsers = (): Promise<Array<User>> => {
    return new Promise<Array<User>>((resolve, reject) => {
        axios
            .get<Array<User>>(FETCH_USER_URL)
            .then((res) => res.data)
            .then((data) => {
                resolve(data);
            })
        .catch(err => reject(err))
    })
    
}

export const fetchUserByEmail = (email: string):Promise<User> => {
    return new Promise((resolve, reject) => {
        axios.get<User>(`${FETCH_USER_URL}/${email}`)
            .then(res => res.data)
            .then(data => resolve(data))
        .catch(err=>reject(err))
    })
}

interface Patch{
    op: string,
    path: string,
    value: object | string | null
}

export const updateUser = (email:string, user: User): Promise<string> => {
    const patchDocument = Array<Patch>();

    return new Promise((resolve, reject) => {
        Object.entries(user).forEach(([key, value]) => {
        var operation = {
            "op": "replace",
            "path": `/${key}`,
            "value": `${value}`
        }
        patchDocument.push(operation)
    })

    axios.patch<string>(`${POST_URL}/${email}`, patchDocument, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => resolve(res.data))
    .catch(err=> reject(err))
    })
}

export const deleteUser = (user: User) => {
    axios.delete(`${POST_URL}/${user.email}`)
        .then(res => res.data)
    .catch(err=>console.log(err))
}
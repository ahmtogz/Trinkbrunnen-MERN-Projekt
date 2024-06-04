import  axios from "axios";

const HTTP = axios.create({
    baseURL: "http://localhost:5000",
});

export const LoginAxios = async (formData)=>
    await HTTP.post("/home", { ...formData, responseType: 'json' });
// Diese Funktion sendet eine POST-Anfrage an "/home" mit den Formulardaten und erwartet eine JSON-Antwort


export const AddAxios = async (formData) =>
    await HTTP.post("/save", formData);
// Diese Funktion sendet eine POST-Anfrage an "/save" mit den Formulardaten

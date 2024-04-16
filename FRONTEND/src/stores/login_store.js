import { writable } from "svelte/store";

let localStorageEmail = window.localStorage.getItem('email')

let email = JSON.parse(localStorageEmail)

//buscamos el email en el local storage, si no está devuleve ""

export const Usuario = writable(email || "")
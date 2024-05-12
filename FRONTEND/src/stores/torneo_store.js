import { writable } from "svelte/store";

let localStorageTorneo = window.localStorage.getItem('torneo')

let torneo = JSON.parse(localStorageTorneo)

//buscamos el Torneo en el local storage, si no está devuleve ""

export const Torneo = writable(torneo|| "Torneo1")
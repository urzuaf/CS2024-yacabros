import pkg from 'pg'
import data from '../credentials.js'
const {Pool} = pkg;


const db = new Pool(data)

export default db
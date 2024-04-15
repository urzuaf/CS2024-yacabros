import Queries from '../Queries/Queries.js'
import db from '../DB/dbconnect.js'

const getUsers = (req, res) =>{
    db.query(Queries.getAllUsers, (error, results)=>{
        if(error) throw error
        res.status(200).json(results.rows)
    })
}
const decirWena = (req, res) =>{
    res.send("wena")
}
export default {
    getUsers,
    decirWena
}
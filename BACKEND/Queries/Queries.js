const getAllUsers = "select * from usuario"
const getUserByEmail = "select * from usuario where email = $1"
const deleteUser = "delete from usuario where email = $1"

export default({
    getAllUsers,
    getUserByEmail,
    deleteUser
})
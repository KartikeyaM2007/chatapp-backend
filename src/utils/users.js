const users = []

export const addUser = ({ id, username, room } = {}) => {

    //validate the data
    if (!username || !room) {
        return {
            error: 'Username and Room are requierd'
        }
    } 


    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()


    //check for exixting user
    const userExist = users.find((user) => {
        return user.room === room && user.username === username
    })

    //validate username 
    if (userExist) {
        return {
            error: "Username already exist"
        }
    }

    //if all okay then we store user 
    const user = { id, username, room }
    users.push(user)
    return { user }
}


export const removeUser = (id) => {

    const index = users.findIndex((user) => user.id === id)

    //if found match
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }

}

export const getUser = (id) => {
    return users.find((user) => user.id === id)

}

export const getUserInRoom = (room) => {
    return users.filter(
        user => user.room === room.trim().toLowerCase()
    )
}




// addUser({
//     id: 12,
//     username: 'Kartik',
//     room: 'Lucknow'
// })

// addUser({
//     id: 13,
//     username: 'Aman',
//     room: 'Lucknow'
// })

// addUser({
//     id: 14,
//     username: 'Rajendra',
//     room: 'Delhi'
// })

// const user  = getUser(1224);
// console.log(user)

// const userinRoom  = getUserInRoom("DELHI");
// console.log(userinRoom)


// console.log(users)
// const rem = removUser(12)

// console.log(rem)
// console.log(users)


export const generateMessages = (username , text) => {
    return {
        username,
        text,
        createdAt: new Date().getTime()
    }
}

export const generateMessageslocation = (username , url) => {
    return {
        username,
        url,
        createdAt: new Date().getTime()
    }
}

//this is for require and is a common js syntax

// module.exports = {
//     generateMessages ,
// }

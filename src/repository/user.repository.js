const users = []

export const addUser = (name, email, password) => {
    users.push({name, email, password})
}

export const getUser = (email) => {
    const user = users.find(user => user.email === email)
    return user
}
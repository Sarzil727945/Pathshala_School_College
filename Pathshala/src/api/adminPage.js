

// get All Admin Data 
export const getAllAdminData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/allAdmin`)
    const data = await response.json()
    return data
}

// get All user Data 
export const getAllUserData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/allUser`)
    const data = await response.json()
    return data
}

// get All user role Data 
export const getUserRoleData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/userRole`)
    const data = await response.json()
    return data
}


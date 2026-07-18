export interface RegisterInfo {
    email:string,
    password:string,
    confirmPassword:string,
    username:string,
}

export const SESSION_KEY = 'register-draft'

export const saveToSession = (values:RegisterInfo) => {
    sessionStorage.setItem(SESSION_KEY,JSON.stringify(values))
}
export const clearRegisterSession = () => {
    sessionStorage.removeItem(SESSION_KEY)
}

export const getRegisterSession = () => {

    const raw = sessionStorage.getItem(SESSION_KEY)

    if(!raw) return null

    try {
        return JSON.parse(raw) as RegisterInfo
    } catch {
        sessionStorage.removeItem(SESSION_KEY)
        return null
    }
}
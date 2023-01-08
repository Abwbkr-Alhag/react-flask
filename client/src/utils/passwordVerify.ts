// Returns true if 
function ValidatePassword(password:string) {
    if (password.length === 0 || (password.length > 8)) {
        return true
    } else {
        return false
    }
}

export default ValidatePassword;
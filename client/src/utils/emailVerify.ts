// Returns True if email is a valid email string, false if not
function ValidateEmail(email:string) {
    // eslint-disable-next-line
    if (email.length === 0 || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
    } else {
        return false
    }
}

export default ValidateEmail;
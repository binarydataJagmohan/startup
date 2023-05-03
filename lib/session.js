/**
 * * Remove stored token
 * It should remove the Token into the SessionStorage or LocalStorage
 *
 * @returns {void}
 */
export function removeToken() {
    window.localStorage.removeItem("token");
    window.sessionStorage.removeItem("token");
}
export function removeStorageData() {
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("user_role");
    window.localStorage.removeItem("position");
    window.localStorage.removeItem("phone_no");
    window.localStorage.removeItem("date_of_birth");
    window.localStorage.removeItem("first_name");
    window.localStorage.removeItem("last_name");
    window.localStorage.removeItem("approval_status");
    window.localStorage.removeItem("is_profile_completed");

}

/**
 * * Get the Token if presents.
 *
 * @returns {string | undefined}
 */
export function getToken() {
    return window.localStorage.getItem("token") || window.sessionStorage.getItem("token");
}

export function getCurrentUserData() {
    if (typeof window !== 'undefined') {
        const current_user_data = {
                id: window.localStorage.getItem("id"),
                username: window.localStorage.getItem("username"),
                email: window.localStorage.getItem("email"),
                role: window.localStorage.getItem("user_role"),
                position: window.localStorage.getItem("position"),
                phoneno: window.localStorage.getItem("phone_no"),
                dateofbirth: window.localStorage.getItem("date_of_birth"),
                firstname: window.localStorage.getItem("first_name"),
                lastname: window.localStorage.getItem("last_name"),
                approval_status:window.localStorage.getItem("approval_status")
            }
            //console.log(current_user_data)
        return current_user_data;
    } else {
        const current_user_data = {}
        return current_user_data;
    }
}
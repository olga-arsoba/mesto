export class UserInfo {
    constructor({profileNameSelector, profileOccupationSelector}) {
        this._name = document.querySelector(profileNameSelector)
        this._occupation = document.querySelector(profileOccupationSelector)
    }

    getUserInfo = () => {
        return {
            name: this._name.textContent,
            occupation: this._occupation.textContent
        }
    }

    setUserInfo = (userInfo) => {
        this._name.textContent = userInfo.name
        this._occupation.textContent = userInfo.occupation
    }
}
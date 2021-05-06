export class UserInfo {
    constructor({profileNameSelector, profileOccupationSelector, profileAvatarSelector}) {
        this._name = document.querySelector(profileNameSelector)
        this._about = document.querySelector(profileOccupationSelector)
        this._avatar = document.querySelector(profileAvatarSelector)
    }

    setData = (data) => {
        this._data = data

        this.setUserInfo(data)
        this.setAvatar(data)
    }

    getId = () => {
        return this._data._id
    }

    getUserInfo = () => {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        }
    }

    setUserInfo = (userInfo) => {
        this._name.textContent = userInfo.name
        this._about.textContent = userInfo.about
    }

    setAvatar = (userInfo) => {
        this._avatar.src = userInfo.avatar
        this._avatar.alt = userInfo.name
    }
}
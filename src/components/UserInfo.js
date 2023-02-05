export class UserInfo {
  constructor(userNameSelector, userInfoSelector, avatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userWork: this._userInfo.textContent,
    };
  }
  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userInfo.textContent = about;
    this._avatar.src = avatar;
    this._userId = _id;
  }
}

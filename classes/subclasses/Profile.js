export default class Profile {
    constructor(steamID, pseudonyme, url, avatar, lastConnexion, createdAt, countryCode) {
        this.steamID = steamID;
        this.pseudonyme = pseudonyme;
        this.url = url;
        this.avatar = avatar;
        this.lastConnexion = lastConnexion;
        this.createdAt = createdAt;
        this.countryCode = countryCode;
    }
}
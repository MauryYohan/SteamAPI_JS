import fetch from 'node-fetch';

export default class SteamAPI {
    constructor() {
        // Claim your own key : https://steamcommunity.com/dev/apikey
        // Your Profile Steam ID: https://steamcommunity.com/profiles/your_id/
        this.steamKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
        this.steamID = "00000000000000000";
    }
    
    /**
     * @param relationship Type of relationship [friend, all]
     * @returns jsonResponse : JSON
     */
    async getFriendList(relationship) {
        const url = `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${this.steamKey}&steamid=${this.steamID}&relationship=${relationship}`;
        try {
            let response = await fetch(url);
            let jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            console.log(`Error: ${error}`);
            return 1;
        }
    }

    /**
     * 
     * @param gameId ID of the game you want the global achievement percentages of the community
     * @returns jsonResponse : JSON
     */
    async getGlobalAchievementPercentagesForApp(id) {
        const url = `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${id}&format=json`;
        try {
            let response = await fetch(url);
            let jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            console.log(`Error: ${error}`);
            return 1;
        }
    }

    /**
     * GetNewsForApp returns the latest of a game specified by its appID. 
     * @param appId         AppID of the game you want the news of
     * @param newsNumber    How many news enties you want to get returned
     * @param maxLength     Maximum length of each news entry
     */
    async getNewsForApp(appId, newsNumber=1, maxLength=800000) {
        const url = `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${appId}&count=${newsNumber}&maxlength=${maxLength}&format=json`;
        try {
            let response = await fetch(url);
            let jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    /**
     * 
     * @param  key      STEAM API Key 
     * @param  steamID  ID of player's profile
     */
    async getOwnedGames() {
        const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${this.steamKey}&steamid=${this.steamID}&format=json`
        try {
            let response = await fetch(url);
            let jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    /**
     * 
     * @param  key      STEAM API Key
     * @param  steamId  Id of profile you want to get his summary
     */
    async getPlayerSummaries() {
        const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${this.steamKey}&steamids=${this.steamID}`;
        try {
            let response = await fetch(url);
            let jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    /**
     * 
     * @param { number } appID    Application/Game ID
     */
    async getPlayerAchievements(appID = 601510) {
        // 440&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&steamid=76561197972495328
        const url = `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appID}&key=${this.steamKey}&steamid=${this.steamID}`;
        try {
            let response = await fetch(url);
            let jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            console.log(`Error: ${error}`);
            return 1;
        }
    }

    /**
     * 
     * @param { string } key      STEAM API Key
     * @param { bigint } steamID  ID of player's profile
     */
    async getRecentlyPlayedGames() {
        const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${this.steamKey}&steamid=${this.steamID}&format=json`;
        try {
            let response = await fetch(url);
            let jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            console.log(`Error: ${error}`);
            return 1;
        }
    }

}
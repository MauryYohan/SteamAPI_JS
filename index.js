// IMPORTS
import SteamAPI from "./classes/SteamAPI.js";
import Friend from "./classes/subclasses/Friend.js";
import Games from "./classes/subclasses/Games.js";
import GlobalAchievement from "./classes/subclasses/GlobalAchievement.js";
import News from './classes/subclasses/News.js';
import PlayerAchievement from "./classes/subclasses/PlayerAchievement.js";
import Profile from "./classes/subclasses/Profile.js";
import RecentlyPlayedGames from './classes/subclasses/RecentlyPlayedGames.js'


// CALLBACKS FUNCTIONS
const friendList = relationship => {
    steam.getFriendList(relationship).then(
        jsonData => {
            let friendsArray = [];
            let lists = jsonData['friendslist'];
            let friends = lists['friends'];
            for (let friend of friends) {
                let steamid = friend['steamid'];
                let relationship = friend['relationship'];
                let friend_since = new Date(friend['friend_since'] * 1000);
                friend_since = friend_since.toUTCString();
                var newFriend = new Friend(steamid, relationship, friend_since);
                friendsArray.push(newFriend);
            }
            friendsArray.forEach(friend => { 
                console.log(`[FRIENDS] ID: ${friend.steamid}, Relationship: ${friend.relationship}, Since: ${friend.friend_since}`); 
            });
        }
    )
}
const globalAchievementPercentForApp = appId => {
    steam.getGlobalAchievementPercentagesForApp(appId).then(
        jsonData => {
            let achievementList = [];
            let percent = jsonData['achievementpercentages'];
            let achievements = percent['achievements'];
            for (let achievement of achievements) {
                let name = achievement['name'];
                let percent = achievement['percent'];
                let newPercent = percent.toFixed(2);
                var newAchievement = new GlobalAchievement(name, newPercent);
                achievementList.push(newAchievement);
            }
            achievementList.forEach(achievement => {
                console.log(`[ACHIEVEMENTS] Achievement Name: ${achievement.name}, Percent: ${achievement.percent}%`);
            });
        }
    )
}
const newsForApp = appId => {
    steam.getNewsForApp(appId).then(
        jsonData => {
            let newsList = [];
            let applicationsNews = jsonData['appnews'];
            let newsItems = applicationsNews['newsitems'];
    
            for (let item of newsItems) {
                let gid = item['gid'];
                let title = item['title'];
                let url = item['url'];
                let author = item['author'];
                let contents = item['contents'];
                let feedLabel = item['feedlabel'];
                let date = new Date(item['date'] * 1000);
                date = date.toUTCString();
                let feedName = item['feedname'];
                let feedType = item['feed_type'];
                var article = new News(gid, title, url, author, contents, feedLabel, date, feedName, feedType);
                newsList.push(article);
            }
            newsList.forEach(article => {
                console.log("\n");
                console.log(`NewsID: ${article.gid}, Author: ${article.author}`);
                console.log(`Title: ${article.title}`);
                console.log(`FeedLabel: ${article.feedLabel} | FeedName: ${article.feedName}`);
                console.log(`URL: ${article.url}`);
                console.log(`Date: ${article.date}`);
                console.log(`Contents: ${article.contents}`);
                console.log("\n");
            });
        }
    )
}
const ownedGames = () => {
    steam.getOwnedGames().then(
        jsonData => {
            let OwnedGames = [];
            let response = jsonData['response'];
            let games = response['games'];
            for (let game of games) {
                let appId = game['appid'];
                let playTime = game['playtime_forever'];
                if (playTime > 0) {
                    var myGame = new Games(appId, playTime);
                    OwnedGames.push(myGame);
                } else {
                    continue;
                }
            }
    
            OwnedGames.forEach(game => {
                console.log(`[GamesLibrary] ID: ${game.appid}, Playtime: ${game.playtime}`);
            });
        }
    )
}
const playerSummaries = () => {
    steam.getPlayerSummaries().then(
        jsonData => {
            let playersList = [];
            let response = jsonData['response'];
            let players = response['players'];
    
            for (let player of players) {
                let steamID = player['steamid'];
                let pseudonyme = player['personaname'];
                let url = player['profileurl'];
                let avatar = player['avatar'];
                let lastConnexion = new Date(player['lastlogoff'] * 1000);
                lastConnexion = lastConnexion.toUTCString();
                let createdAt = new Date(player['timecreated'] * 1000);
                createdAt = createdAt.toUTCString();
                let countryCode = player['loccountrycode'];
                var playerProfile = new Profile(steamID, pseudonyme, url, avatar, lastConnexion, createdAt, countryCode);
                playersList.push(playerProfile);
            }
    
            playersList.forEach(player => {
                console.log(`[PROFILE] SteamID: ${player.steamID}, Pseudo: ${player.pseudonyme}, LastConnexion: ${player.lastConnexion}, Account Creation Date: ${player.createdAt}, From: ${player.countryCode}`);
            });
        }
    )
}
const playerAchievements = () => {
    steam.getPlayerAchievements().then(
        jsonData => {
            let PlayerAchievementsList = [];
            let playerstats = jsonData['playerstats'];
            let gameName = playerstats['gameName'];
            console.log(`[${gameName}]`);
            let achievements = playerstats['achievements'];
            for (let achievement of achievements) {
                let apiname = achievement['apiname'];
                let achieved = achievement['achieved'];
                let unlocktime = new Date(achievement['unlocktime'] * 1000).toUTCString();
                if (achieved > 0) {
                    let succes = new PlayerAchievement(apiname, achieved, unlocktime);
                    PlayerAchievementsList.push(succes);
                }
            }
            PlayerAchievementsList.forEach(succes => {
                console.log(`[PlayersAchievements] Name: ${succes.apiname}, Unlocked at: ${succes.unlocktime}`);
            });
        }
    )
}
const recentlyPlayedGames = () => {
    steam.getRecentlyPlayedGames().then(
        jsonData => {
            let RecentlyPlayedGamesList = [];
            let response = jsonData['response'];
            let games = response['games'];
            for (let game of games) {
                let id = game['appid'];
                let name = game['name'];
                let playtime = game['playtime_forever'];
                let playedGame = new RecentlyPlayedGames(id, name, playtime);
                RecentlyPlayedGamesList.push(playedGame);
            }
            for (let game of RecentlyPlayedGamesList) {
                console.log(`[RecentlyPlayedGames] ID: ${game.id}, Name: ${game.name}, Playtime: ${game.playtime}`);
            }
        }
    )
}

const steam = new SteamAPI();
const relationship = "friend";
const appId = 601510;
friendList(relationship);
globalAchievementPercentForApp(appId);
newsForApp(appId);
ownedGames();
playerSummaries();
playerAchievements();
recentlyPlayedGames();

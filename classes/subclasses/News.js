export default class News {
    constructor(gid, title, url, author, contents, feedLabel, date, feedName, feedType) {
        this.gid = gid;
        this.title = title;
        this.url = url;
        this.author = author;
        this.contents = contents;
        this.feedLabel = feedLabel;
        this.date = date;
        this.feedName = feedName;
        this.feedType = feedType;
    }
}
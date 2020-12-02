# GuildWarsBot

Bot is scanning folder and subfolders for new created and changed files. After it gets the path to file it uploads it to https://dps.report/ and then it returns generated link to raport.

### Clone project:
```
git clone https://github.com/BeastHub/GuildWarsBot.git
```
### Init project:
```
cd GuildWarsBot
npm init (enter to all and write 'yes' at the end)
```
### Install packages:
```
npm install discord.js chokidar puppeteer
```
### Add auth.json:
```
{
    "token": "Your Bot's token here"
}
```
### Change scanning folder in index.js (line 16):
```
var dirPath = 'Your\\Path\\Here';
```
### Run project:
```
node index.js
```
### Commands on discord:
```
.help - prints all possible commands
.set '/' - change prefix to /
.start - starts scanning directory
.print - prints path of added file in scanned directory (or '' if nothing was added)
.raport - generate raport with new added file (returns link to raport)
```
### Test if works:

```
.start
```
Add new file to the directory that bot is scanning and check if bot updated file:

```
.print
```

Generate raport:
```
.raport
```



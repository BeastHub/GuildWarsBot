# GuildWarsBot

### Install packages:
```
npm install discord.js chokidar puppeteer
```
### Clone project:
```
git clone https://github.com/BeastHub/GuildWarsBot.git
```
### Init project:
```
cd GuildWarsBot
npm init
```
### Change auth.json:
```
{
    "token": "Your Bot's token here"
}
```
### Change scanning folder in index.json (line 16):
```
var dirPath = 'Your\\Path\\Here';
```
### Run project:
```
node index.json
```
### Commands:
```
.help - prints all possible commands
.prefix '/' - change prefix to /
.start - starts scanning directory
.print - prints path of added file in scanned directory (or '' if nothing was added)
.raport - generate raport with new added file (returns link to raport)
```

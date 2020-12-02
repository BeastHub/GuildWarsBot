var auth = require('./auth.json');
const Discord = require('discord.js')
const client = new Discord.Client()
const chokidar = require('chokidar');
const puppeteer = require('puppeteer');

client.login(auth.token)

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

var prefix = "."
var raportFileName = "";
// Change this path to directory that bot will be scann for new files
var dirPath = 'F:\\Pobrane z neta\\test';
var downloadUrl = ''

require('node-dir').files(dirPath, function(err, files) { 

    client.on('message', (message) => {
        // Prevent bot from responding to its own messages
        if (message.author == client.user) {
            return
        }
        if(message.content.startsWith(prefix)){
            message.content = message.content.substr(prefix.length,message.content.length)
    
            // help
            if(message.content.startsWith("help")){
                message.channel.send("Available commands:\n" + prefix + "help\n" + prefix + "set 'prefix'\n"+ prefix + "start\n");
            }
            // change prefix
            if(message.content.startsWith("set ")){
                message.content = message.content.substr(4, message.content.length)
                prefix = message.content
                message.channel.send("Prefix set to: " + prefix)
            }
            if(message.content.startsWith("start")){
                // One-liner for current directory
                chokidar.watch(dirPath).on('all', (event, path) => {
                    if(!files.includes(path)){
                        if (event.includes("add")){
                            if(path.includes(".zevtc")){
                                raportFileName = path;
                                console.log(event, path);
    
                                (async () => {
                                    const browser = await puppeteer.launch()
                                    const page = await browser.newPage()
                                    await page.setViewport({ width: 1280, height: 1800 })
                                    await page.goto('https://dps.report/')
                    
                                    await page.waitForSelector('input[type=file]');
                                    await page.waitForTimeout(1000);
                                    const inputUploadHandle = await page.$('input[type=file]');
                                    let fileToUpload = raportFileName;
                                    inputUploadHandle.uploadFile(fileToUpload);
                    
                                    await page.waitForSelector('#myDropzone');
                                    await page.evaluate(() => document.getElementById('myDropzone').click());
                    
                                    await page.waitForSelector('#hostedfiles > p');
                                    await page.waitForTimeout(5000);
                    
                                    downloadUrl = await page.$eval('#hostedfiles > p', el => el.textContent);
                                    
                                    message.channel.send(" Generated raport: " + downloadUrl + message.author.username);
                                    await browser.close();
                                  })()
                            }
                        }
                    }
                });
            }
        }
    })
});
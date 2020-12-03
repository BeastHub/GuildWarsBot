var auth = require('./auth.json');
const Discord = require('discord.js')
const client = new Discord.Client()
const chokidar = require('chokidar');
const puppeteer = require('puppeteer');

client.login(auth.token)

var raportFileName = "";
// Change this path to directory that bot will be scanning for new files
var dirPath = 'F:\\Pobrane z neta\\test';
var downloadUrl = ''
var channelID = '778366792690696252';

require('node-dir').files(dirPath, function(err, files) { 
    client.on('ready', () => {
        console.log("Connected as " + client.user.tag)
        client.channels.fetch(channelID).then(channel => {
            channel.send(`Listening...`);
        })
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
            
                            await page.waitForSelector('#hostedfiles > p').then(() => console.log('got it'));
            
                            downloadUrl = await page.$eval('#hostedfiles > p', el => el.textContent);
                            
                            client.channels.fetch(channelID).then(channel => {
                                channel.send(`Generated raport: `+ downloadUrl);
                            })
                            await browser.close();
                        })()
                    }
                }
            }
        });
    })
})
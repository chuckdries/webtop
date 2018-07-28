const electron = require('electron');
const { app, BrowserWindow } = electron;
const { resolve } = require('path');
const { homedir } = require('os');
const { access, readFile } = require('fs');
const { mergeDeepLeft } = require('ramda');

const defaultConfig = require('./config-default');

const userConfigPath = '~/.webtop/config.json';

let mainWindow;

async function createBar() {
  const { width } = electron.screen.getPrimaryDisplay().workAreaSize

  const configExists = await new Promise((resolve) =>
    access(resolveHome(userConfigPath), (err) => err && resolve(false) || resolve(true)));

  let userConfig;
  if (configExists) {
    userConfig = await new Promise((resolve, reject) => 
      readFile(resolveHome(userConfigPath), 'utf8', (err, data) => err && reject(err) || resolve(data)));
    userConfig = JSON.parse(userConfig);
  } else {
    console.error('couldn\'t find user config, falling back to defaults');
  }
  
  mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    frame: false,
    height: 50,
    type: 'dock',
    width,
    x: 0,
    y: 0,
  });


  const config = mergeDeepLeft(userConfig, defaultConfig);
  console.log('config:', config);

  if(config.barUrl.slice(0,4) === 'http') {
    mainWindow.loadURL(config.barUrl);
  } else {
    mainWindow.loadFile(resolveHome(config.barUrl));
  }


  mainWindow.on('closed', () => {
    mainWindow = null;
  })
}

app.on('ready', createBar);

function resolveHome(filePath) {
  if(filePath[0] === '~') {
    return resolve(homedir(), filePath.slice(2));
  }
  return filePath;
}

function protocolForUrl(urlString) {
  if(urlString[0] === '/') {
    return 'file:/' + urlString;
  }
  return urlString;
}
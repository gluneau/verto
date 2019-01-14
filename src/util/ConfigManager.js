import sjcl from 'sjcl'
import router from '../router'
import axios from 'axios'
const fs = require("fs");
const path = require("path")
const electron = require("electron")

class ConfigManager {
    currentConfig
    currentWallet
    createWallet(router, password) {
        this.currentConfig = {keys: []}
        let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');  
        const payload = JSON.stringify(this.currentConfig);
        fs.writeFile(filePath, sjcl.encrypt(password, payload), 'utf-8', () => {
            router.replace('keepYourKeysafe')
        });
    }
  }
  export default new ConfigManager()
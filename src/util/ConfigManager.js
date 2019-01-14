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

    hasWallets() {
        console.log("has wallet.")
        if (this.currentConfig.keys && this.currentConfig.keys.length > 0) {
            return true
        }
        return false
    }

    hasCurrentWallet() {
        return this.currentWallet
    }

    saveWalletAndKey(keyname, vertoPassword, privateKeyPassword, publicAddress, privateAddress, savePath) {
        let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
        const databack = fs.readFileSync(filePath, 'utf-8');
        let config = {};
        try {
            config = JSON.parse(sjcl.decrypt(vertoPassword, databack));
        } catch (error) {
            return {success: false, message: 'bad_password'}
        }
        let i;
        for (i = 0; i < config.keys.length; i++) {
            const key = config.keys[i];
            if (key.name.toLowerCase() === keyname.toLowerCase()) {
                return {success: false, message: 'name_already_used'}
            }
        }
        let defaultKey = false;
        if (config.keys.length <= 0) {
            defaultKey = true;
        }
        const key = {name: keyname, key: publicAddress, defaultKey: defaultKey}
        config.keys.push(key);
        this.currentConfig = config
        if (defaultKey) {
            this.currentWallet = key
        }
        const privateWallet = JSON.stringify({name: keyname, publickey: publicAddress, privatekey: privateAddress})
        fs.writeFileSync(savePath, sjcl.encrypt(privateKeyPassword, privateWallet), 'utf-8')
        fs.writeFileSync(filePath, sjcl.encrypt(vertoPassword, JSON.stringify(config)), 'utf-8');
        return {success: true}
    }
  }
  export default new ConfigManager()
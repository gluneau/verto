import sjcl from 'sjcl'
import store from '../store'
const fs = require('fs')
const path = require('path')
const electron = require('electron')

class ConfigManager {
    currentConfig
    currentWallet

    getConfig (password) {
      let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config')
      const databack = fs.readFileSync(filePath, 'utf-8')
      let config = {}
      try {
        config = JSON.parse(sjcl.decrypt(password, databack))
        return {success: true, config: config}
      } catch (error) {
        return {success: false, message: 'bad_password'}
      }
    }

    saveConfig (password, currentWallet, config) {
      let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config')
      fs.writeFileSync(filePath, sjcl.encrypt(password, JSON.stringify(config)), 'utf-8')
      store.commit('currentwallet/updateCurrentWallet', currentWallet)
      store.commit('currentwallet/updateConfig', config)
      return {success: true}
    }

    updateCurrentWallet (wallet) {
      this.currentWallet = wallet
      store.commit('currentwallet/updateCurrentWallet', wallet)
    }

    createWallet (password) {
      return new Promise((resolve, reject) => {
        this.currentConfig = {keys: []}
        let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config')

        const payload = JSON.stringify(this.currentConfig)
        fs.writeFile(filePath, sjcl.encrypt(password, payload), 'utf-8', (err) => {
          if (err) return reject(err)
          resolve(true)
        })
      })
    }

    changeVertoPassword (currentPassword, newPassword) {
      const result = this.getConfig(currentPassword)
      if (!result.success) {
        return result
      }
      return this.saveConfig(newPassword, store.state.currentwallet.wallet, result.config)
    }

    login (password) {
      let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config')
      const databack = fs.readFileSync(filePath, 'utf-8')
      let config = {}
      try {
        config = JSON.parse(sjcl.decrypt(password, databack))
      } catch (error) {
        return {success: false, message: 'bad_password'}
      }
      console.log(JSON.stringify(config, null, 4))

      store.commit('currentwallet/updateConfig', config)
      let i
      for (i = 0; i < config.keys.length; i++) {
        const key = config.keys[i]
        if (key.defaultKey) {
          store.commit('currentwallet/updateCurrentWallet', key)
          return {success: true, message: 'success'}
        }
      }
      return {success: false, message: 'no_default_key'}
    }

    deleteWallet (password, wallet) {
      if (wallet.defaultKey) {
        return {success: false, message: 'cannot_delete_default'}
      }
      const configInfo = this.getConfig(password)
      if (!configInfo.success) {
        return configInfo
      }
      let currentWallet = store.state.currentwallet.wallet
      // we are deleting the current wallet (not the default)
      // so we need to get the default and make it the current wallet.
      if (currentWallet.key === wallet.key) {
        const currentWallets = configInfo.config.keys.filter(function (value, index, arr) {
          return value.defaultKey
        })
        currentWallet = currentWallets[0]
      }
      const keys = configInfo.config.keys.filter(function (value, index, arr) {
        return value.key !== wallet.key
      })
      configInfo.config.keys = keys
      this.saveConfig(password, currentWallet, configInfo.config)
      return {success: true}
    }

    /*
    removeKey (removeKey, keys) {
      const filteredKeys = []
      let i = 0
      for (i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (removeKey.key !== key.key) {
          filteredKeys.push(key)
        }
      }
      return filteredKeys
    }

    getDefault (keys) {
      let i = 0
      for (i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (key.defaultKey) {
          return key
        }
      }
      return null
    }
    */

    changeToDefault (newDefaultWallet, password) {
      const configInfo = this.getConfig(password)
      if (!configInfo.success) {
        return configInfo
      }
      const config = configInfo.config
      let i = 0
      for (i = 0; i < config.keys.length; i++) {
        const key = config.keys[i]
        if (key.name === newDefaultWallet.name) {
          key.defaultKey = true
        } else if (key.name !== newDefaultWallet.name && key.defaultKey) {
          key.defaultKey = false
        }
      }
      return this.saveConfig(password, newDefaultWallet, config)
    }

    addAssociationToWallet (address, password, associationName, data) {
      const configInfo = this.getConfig(password)
      if (!configInfo.success) {
        return configInfo
      }
      const config = configInfo.config
      let wallet = null
      let i = 0
      for (i = 0; i < config.keys.length; i++) {
        const key = config.keys[i]
        if (key.key === address) {
          wallet = key
        }
      }
      if (!wallet) {
        return {success: false, message: 'key_not_found'}
      }
      if (!wallet.associations) {
        wallet.associations = []
      }
      wallet.associations.push({name: associationName, createTime: new Date(), data: data})
      return this.saveConfig(password, wallet, config)
    }

    hasVertoConfig () {
      return fs.existsSync(path.join(electron.remote.app.getPath('userData'), '/verto.config'))
    }

    hasWallets () {
      if (this.currentConfig.keys && this.currentConfig.keys.length > 0) {
        return true
      }
      return false
    }

    hasCurrentWallet () {
      return store.state.currentwallet.wallet
    }

    addWallet (keyname, vertoPassword, publicAddress) {
      let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config')
      const databack = fs.readFileSync(filePath, 'utf-8')
      let config = {}
      try {
        config = JSON.parse(sjcl.decrypt(vertoPassword, databack))
      } catch (error) {
        return {success: false, message: 'bad_password'}
      }
      let i
      for (i = 0; i < config.keys.length; i++) {
        const key = config.keys[i]
        if (key.name.toLowerCase() === keyname.toLowerCase()) {
          return {success: false, message: 'name_already_used'}
        }
      }
      const key = {name: keyname, key: publicAddress, defaultKey: false}
      config.keys.push(key)
      fs.writeFileSync(filePath, sjcl.encrypt(vertoPassword, JSON.stringify(config)), 'utf-8')
      store.commit('currentwallet/updateCurrentWallet', key)
      store.commit('currentwallet/updateConfig', config)
      return {success: true}
    }

    logout () {
      store.commit('currentwallet/updateCurrentWallet', null)
      store.commit('currentwallet/updateConfig', null)
    }

    saveWalletAndKey (keyname, vertoPassword, privateKeyPassword, publicAddress, privateAddress, savePath) {
      let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config')
      const databack = fs.readFileSync(filePath, 'utf-8')
      let config = {}
      try {
        config = JSON.parse(sjcl.decrypt(vertoPassword, databack))
      } catch (error) {
        return {success: false, message: 'bad_password'}
      }
      let i
      for (i = 0; i < config.keys.length; i++) {
        const key = config.keys[i]
        if (key.name.toLowerCase() === keyname.toLowerCase()) {
          return {success: false, message: 'name_already_used'}
        }
      }
      let defaultKey = false
      if (config.keys.length <= 0) {
        defaultKey = true
      }
      const key = {name: keyname, key: publicAddress, defaultKey: defaultKey}
      config.keys.push(key)
      this.currentConfig = config
      if (defaultKey) {
        this.currentWallet = key
      }
      const privateWallet = JSON.stringify({name: keyname, publickey: publicAddress, privatekey: privateAddress})
      if (savePath && privateKeyPassword) {
        fs.writeFileSync(savePath, sjcl.encrypt(privateKeyPassword, privateWallet), 'utf-8')
      }
      fs.writeFileSync(filePath, sjcl.encrypt(vertoPassword, JSON.stringify(config)), 'utf-8')
      store.commit('currentwallet/updateCurrentWallet', key)
      store.commit('currentwallet/updateConfig', config)
      return {success: true}
    }
}
export default new ConfigManager()

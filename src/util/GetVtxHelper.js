import axios from 'axios'

class GetVtxHelper {

    getWalletStatus(walletAddress, callback) {
        let url = process.env.CROWDFUND_URL + "/public/api/allocate-native-chain/?verto_public_address=" + walletAddress
        console.log('URL: ' + url)
        axios.get(url).then(function (response) {
            console.log(response.data.message + " ((((((((((((((((((((((99")
            callback({success: true, message: response.data.message, data: response.data})
        }).catch(function (error) {
            console.log(error + " ((((((((((((((((((((((99")
            callback({success: false, error})
          });
    }
}
export default new GetVtxHelper()
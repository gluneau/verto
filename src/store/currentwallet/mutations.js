/*
export function someMutation (state) {
}
*/
export const updateCurrentWallet = (state, newwallet) => {
  state.wallet = newwallet
}


export const updateConfig = (state, newconfig) => {
  state.config = newconfig
}
import getWeb3 from "../utils/getWeb3";
import {ON_SNACK} from '../constance/ActionTypes';

export const WEB3_CONNECT = "WEB3_CONNECT";
export const web3Connect = () => async (dispatch) => {
  try {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
  
  
    if (accounts.length > 0) {
      const account = accounts[0];
      let balance = await web3.eth.getBalance(account);

      
          dispatch({
            type: WEB3_CONNECT,
            payload: {
              web3: web3,
              accounts: accounts,
              currentAccount: account,
              balance: balance
            },
          });
      // Promise.all([web3, account, balance])
      //   .then((values) => {
          
      //     dispatch({
      //       type: WEB3_CONNECT,
      //       payload: {
      //         web3: values[0],
      //         account: values[1],
      //         balance: values[2]
      //       },
      //     });
      //   }).catch((e) => {
      //     console.error(e.message)
      //     dispatch({type: ON_SNACK, payload: {message: 'Fail to connect web3', severity: 'error'}})
      //   })
      
    } else {
      dispatch({type: ON_SNACK, payload: {message: "Can't connect any account", severity: 'warning'}})
    }
  }catch (e) {
    console.log(e?.message)
  }
  
};

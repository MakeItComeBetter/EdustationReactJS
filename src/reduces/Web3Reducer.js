import { WEB3_CONNECT, INIT_CONTRACT, GET_BALANCE } from "../constance/ActionTypes"

const initialState = {
  web3: null,
  accounts: [],
  currentAccount: null,
  balance: null,
  dinoCoin: null 
}

export default function web3(state = initialState, {type, payload}){

  switch(type){
    case WEB3_CONNECT:
      return {
        ...state,
        web3: payload?.web3,
        accounts: payload?.accounts,
        currentAccount: payload?.currentAccount,
        balance: payload?.balance
      }
      case INIT_CONTRACT:
        return {
          ...state,
          dinoCoin: payload?.dinoCoin
        }
        case GET_BALANCE:
          return {
            ...state,
            balance: payload?.balance
          }
    default:
      return {
        ...state
      }
  }
}
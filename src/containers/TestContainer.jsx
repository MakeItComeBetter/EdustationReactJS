import { connect } from "react-redux";
import Test from "../components/Test";
import { getUser, getMessenger, getWeb3 } from "../selectors/CommonSelectors";
import { initMessages, fetchMoreMessages } from "../actions/MessengerActions";
import { web3Connect } from "../actions/Web3Action";

const mapStateToProps = (state) => {
  return {
    ...getUser(state),
    ...getMessenger(state),
    ...getWeb3(state)
  };
};

export default connect(mapStateToProps, {
  fetchMoreMessages,
  initMessages,
  web3Connect,
})(Test);

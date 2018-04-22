/**
 * @providesModule WithLastAction
 */

import { connect } from "react-redux";
import { lastActionSet } from "ReduxActions";

const mapDispatchToProps = dispatch => ({
    setLastAction: obj => {
        dispatch(lastActionSet(obj));
    }
});

const mapStateToProps = state => ({
    lastAction: state.lastAction ? state.lastAction : null
});

export default connect(mapStateToProps, mapDispatchToProps);

/**
 * @providesModule WithToast
 */

import {connect} from "react-redux";
import {notificationPush} from "ReduxActions";

const mapDispatchToProps = dispatch => ({
    toast: text => {
        dispatch(notificationPush(text));
    }
});

export default connect(null, mapDispatchToProps);

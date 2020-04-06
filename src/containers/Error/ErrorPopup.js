import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLastError, isLoading } from '../../reducers';
import ErrorPopup from '../../components/Error/ErrorPopup';
import { hideError } from '../../actions/status';


const mapsStateToProps = (state) => ({
    isLoading: isLoading(state),
    lastError: getLastError(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onClose: hideError,
}, dispatch);

export default connect(mapsStateToProps, mapDispatchToProps)(ErrorPopup);

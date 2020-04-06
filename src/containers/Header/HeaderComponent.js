import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteFile } from '../../actions/file';
import HeaderComponent from '../../components/Header/HeaderComponent';
import { syncPasswordStore } from '../../actions/sync';
import { getLastError, isLoading } from '../../reducers';

const mapsStateToProps = (state) => ({
    isLoading: isLoading(state),
    lastError: getLastError(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onDelete: deleteFile,
    onSync: syncPasswordStore,
}, dispatch);


export default connect(mapsStateToProps, mapDispatchToProps)(HeaderComponent);

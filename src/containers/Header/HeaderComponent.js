import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteFile } from '../../actions/file';
import HeaderComponent from '../../components/Header/HeaderComponent';
import { syncPasswordStore } from '../../actions/sync';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    onDelete: deleteFile,
    onSync: syncPasswordStore,
}, dispatch);


export default connect(null, mapDispatchToProps)(HeaderComponent);

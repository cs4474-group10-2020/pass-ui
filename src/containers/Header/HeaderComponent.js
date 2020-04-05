import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteFile } from '../../actions/file';
import HeaderComponent from '../../components/Header/HeaderComponent';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    onDelete: deleteFile,
}, dispatch);


export default connect(null, mapDispatchToProps)(HeaderComponent);

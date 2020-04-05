import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import { fetchPassword } from '../actions/password';
import { getDirectoryContents } from '../actions/directory';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPassword: fetchPassword,
    getDirectoryContents,
}, dispatch);

export default connect(null, mapDispatchToProps)(Layout);

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import { fetchPassword } from '../actions/password';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPassword: fetchPassword,
}, dispatch);

export default connect(null, mapDispatchToProps)(Layout);

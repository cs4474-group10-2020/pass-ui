import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { savePassword } from '../../actions/password';
import SaveError from '../../components/Error/SaveError';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    onFix: savePassword,
}, dispatch);

export default connect(null, mapDispatchToProps)(SaveError);

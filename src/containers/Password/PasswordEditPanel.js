import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPassword, getPasswordPath } from '../../reducers';
import { savePassword } from '../../actions/password';
import PasswordEditPanel from '../../components/Password/PasswordEditPanel';


const mapStateToProps = (state) => {
    const fullPath = getPasswordPath(state);
    return ({
        password: getPassword(state),
        path: fullPath.slice(0, -1),
        fileName: fullPath[fullPath.length - 1],
        editFileName: false,
    });
};


const mapDispatchToProps = (dispatch) => bindActionCreators({
    onSave: savePassword,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PasswordEditPanel);

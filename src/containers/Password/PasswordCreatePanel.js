import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { savePassword } from '../../actions/password';
import PasswordEditPanel from '../../components/Password/PasswordEditPanel';

// TODO template
const mapStateToProps = (state) => ({
    password: {
        password: '',
        fields: {},
    },
    editFileName: true,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onSave: savePassword,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PasswordEditPanel);
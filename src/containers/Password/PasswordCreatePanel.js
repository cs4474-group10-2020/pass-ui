import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createPassword } from '../../actions/password';
import PasswordEditPanel from '../../components/Password/PasswordEditPanel';

// TODO template
const mapStateToProps = (state) => ({
    password: {
        password: '',
        fields: {},
    },
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onSave: createPassword,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PasswordEditPanel);

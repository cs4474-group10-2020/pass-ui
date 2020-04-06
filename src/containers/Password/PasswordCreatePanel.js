import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { savePassword } from '../../actions/password';
import PasswordEditPanel from '../../components/Password/PasswordEditPanel';
import { getTemplate } from '../../reducers';

// TODO template
const mapStateToProps = (state) => ({
    password: {
        password: '',
        fields: getTemplate(state).map((key) => ({ key, value: '' })),
    },
    editFileName: true,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onSave: savePassword,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PasswordEditPanel);

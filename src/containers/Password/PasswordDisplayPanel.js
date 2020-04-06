import { connect } from 'react-redux';
import { getPassword, getPasswordPath } from '../../reducers';
import PasswordDisplayPanel from '../../components/Password/PasswordDisplayPanel';

const mapStateToProps = (state) => ({
    password: getPassword(state),
    path: getPasswordPath(state),
});

export default connect(mapStateToProps)(PasswordDisplayPanel);

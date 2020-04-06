import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SettingsModal from '../../components/Settings/SettingsModal';
import { updateTemplate } from '../../actions/settings';
import { getTemplate } from '../../reducers';

const mapStateToProps = (state) => ({
    template: getTemplate(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setTemplate: updateTemplate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);

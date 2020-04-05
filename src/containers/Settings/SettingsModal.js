import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SettingsModal from '../../components/Settings/SettingsModal';
import { updateTemplate } from '../../actions/settings';

const mapStateToProps = (state) => ({
    template: state.settings.template,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setTemplate: updateTemplate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);

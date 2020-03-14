import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import Directory from '../../components/FileNavigation/Directory';
import { getDirectory } from '../../reducers';
import { getDirectoryContents } from '../../actions/directory';


const mapStateToProps = (state, { path }) => ({
    directoryChildren: getDirectory(state, path),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getDirectoryContents,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Directory);

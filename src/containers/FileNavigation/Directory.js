import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import Directory from '../../components/FileNavigation/Directory';
import { getDirectory } from '../../reducers';
import { createDirectory, getDirectoryContents } from '../../actions/directory';
import { deleteFile, renameFile } from '../../actions/file';


const mapStateToProps = (state, { path }) => ({
    directoryChildren: getDirectory(state, path),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getDirectoryContents,
    onCreateDirectory: createDirectory,
    onDeleteDirectory: deleteFile,
    onRenameDirectory: renameFile,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Directory);

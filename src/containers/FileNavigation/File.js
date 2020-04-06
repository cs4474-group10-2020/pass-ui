import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getDirectoryContents } from '../../actions/directory';
import { deleteFile, renameFile } from '../../actions/file';
import File from '../../components/FileNavigation/File';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    getDirectoryContents,
    onDeleteFile: deleteFile,
    onRenameFile: renameFile,
}, dispatch);

export default connect(null, mapDispatchToProps)(File);

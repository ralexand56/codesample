import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import DataExtractPreview from './DataExtractPreview';

export default connect((state: ApplicationState) => ({}))(DataExtractPreview);

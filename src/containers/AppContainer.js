import { connect } from 'react-redux';

import App from '../components/App';
import { changeFilter, getFilter } from '../redux/filter';

const mapStateToProps = state => ({
  filter: getFilter(state),
});

export default connect(mapStateToProps, { changeFilter })(App);

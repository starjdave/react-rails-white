import {connect} from 'react-redux'

import Listing from '../../components/listing/index'

function mapStateToProps(state, props) {
    return {
        listing: state.listings.length ? state.listings.find(id => id = props.match.params.id) : {}
    };
}

export default connect(mapStateToProps)(Listing)
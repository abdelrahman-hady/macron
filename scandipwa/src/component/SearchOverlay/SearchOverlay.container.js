/**
  * @category    Macron
  * @author      Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
  * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
  * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
  */

import { connect } from 'react-redux';

import { mapDispatchToProps, mapStateToProps, SearchOverlayContainer as SourceSearchOverlayContainer }
from 'SourceComponent/SearchOverlay/SearchOverlay.container';
import SearchBarReducer from 'Store/SearchBar/SearchBar.reducer';
import { withReducers } from 'Util/DynamicReducer';

/** @namespace Scandipwa/Component/SearchOverlay/Container */
export class SearchOverlayContainer extends SourceSearchOverlayContainer {
    makeSearchRequest() {
        const {
            makeSearchRequest,
            clearSearchResults,
            searchCriteria
        } = this.props;

        if (searchCriteria) {
            console.log('ccheck12ab', this.props);

            clearSearchResults();
            const search = encodeURIComponent(searchCriteria.trim().replace(/%/g, '%25'));
            makeSearchRequest({
                args: {
                    search,
                    pageSize: 24,
                    currentPage: 1,
                    filter: { IsPatch: 1 }
                }
            });
        }
    }
}

export default withReducers({
    SearchBarReducer
})(connect(mapStateToProps, mapDispatchToProps)(SearchOverlayContainer));

import { connect } from 'react-redux';

import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    SearchItemContainer as SourceSearchItemContainer
} from 'SourceComponent/SearchItem/SearchItem.container';

/** @namespace Scandipwa/Component/SearchPatchItem/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch)
    // TODO extend mapDispatchToProps
});

/** @namespace Scandipwa/Component/SearchPatchItem/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state)
    // TODO extend mapStateToProps
});

/** @namespace Scandipwa/Component/SearchPatchItem/Container */
export class SearchPatchItemContainer extends SourceSearchItemContainer {
    // TODO implement logic
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPatchItemContainer);

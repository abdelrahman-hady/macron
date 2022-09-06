/*
 * @category Macron
 * @author    Shehab Mohsen <shehab.mohsen@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';

import MyProfilePageComponent from './MyProfilePage.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Scandipwa/Route/MyProfilePage/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({
});
/** @namespace Scandipwa/Route/MyProfilePage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    setHeaderState: (stateName) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
        );
    }
});

/** @namespace Scandipwa/Route/MyProfilePage/Container */
export class MyProfilePageContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.updateMeta();
        this.updateBreadcrumbs();
    }

    __construct(props) {
        super.__construct(props, 'MyProfilePageContainer');

        this.updateBreadcrumbs();
    }

    updateMeta() {
        const { updateMeta } = this.props;
        updateMeta({ title: __('My Profile') });
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '/my-profile',
                name: __('My Profile')
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    containerProps() {
        return {};
    }

    render() {
        return <MyProfilePageComponent { ...this.containerProps() } />;
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyProfilePageContainer);

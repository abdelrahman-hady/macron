/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import SidebarCustomHtmlComponent from './SidebarCustomHtml.component';
import {
    CUSTOM_HTML_ITEM_NAME,
    CUSTOM_HTML2_ITEM_NAME
} from './SidebarCustomHtml.config';

/** @namespace Scandiweb/MagefanBlog/Component/SidebarCustomHtml/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    customHtmlData: state.ConfigReducer.mfblog_sidebar_custom_html,
    customHtml2Data: state.ConfigReducer.mfblog_sidebar_custom2_html
});

/** @namespace Scandiweb/MagefanBlog/Component/SidebarCustomHtml/Container/mapDispatchToProps */
export const mapDispatchToProps = (_dispatch) => ({});

/** @namespace Scandiweb/MagefanBlog/Component/SidebarCustomHtml/Container/SidebarCustomHtmlContainer */
export class SidebarCustomHtmlContainer extends PureComponent {
    static propTypes = {
        itemName: PropTypes.string.isRequired
    };

    customHtmlMap = {
        [CUSTOM_HTML_ITEM_NAME]: {
            getHtmlData: (props) => (props.customHtmlData)

        },
        [CUSTOM_HTML2_ITEM_NAME]: {
            getHtmlData: (props) => (props.customHtml2Data)
        }
    };

    containerFunctions = {
    };

    containerProps() {
        return { ...this.getCurrentCustomHtml() };
    }

    getCurrentCustomHtml = () => {
        const { itemName } = this.props;
        const { getHtmlData } = this.customHtmlMap[itemName];

        return {
            htmlData: getHtmlData(this.props) || ''
        };
    };

    render() {
        return (
            <SidebarCustomHtmlComponent
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCustomHtmlContainer);

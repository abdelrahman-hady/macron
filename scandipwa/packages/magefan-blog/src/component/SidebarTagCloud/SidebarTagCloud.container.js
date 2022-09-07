/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { MagefanBlogContext } from '../../context/MagefanBlog';
import { tagsType } from '../../type/MagefanBlog';
import TagCanvas from '../../util/tagcanvas';
import SidebarTagCloud from './SidebarTagCloud.component';

/** @namespace Scandiweb/MagefanBlog/Component/SidebarTagCloud/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    tagClaudIsAnimated: state.ConfigReducer.mfblog_sidebar_tag_claud_animated,
    tagClaudCloudHeight: state.ConfigReducer.mfblog_sidebar_tag_claud_cloud_height,
    tagClaudTextHighlightColor: state.ConfigReducer.mfblog_sidebar_tag_claud_text_highlight_color
});

/** @namespace Scandiweb/MagefanBlog/Component/SidebarTagCloud/Container/mapDispatchToProps */
export const mapDispatchToProps = (_dispatch) => ({});

/** @namespace Scandiweb/MagefanBlog/Component/SidebarTagCloud/Container/SidebarTagCloudContainer */
export class SidebarTagCloudContainer extends PureComponent {
    static propTypes = {
        tagClaudIsAnimated: PropTypes.number.isRequired,
        tagClaudCloudHeight: PropTypes.number.isRequired,
        tagClaudTextHighlightColor: PropTypes.string.isRequired,
        tagClaudTagCount: PropTypes.number.isRequired,
        tags: tagsType.isRequired
    };

    static contextType = MagefanBlogContext;

    containerFunctions = {
        getTagClass: this.getTagClass.bind(this)
    };

    componentDidMount() {
        const { tagClaudIsAnimated, tags } = this.props;

        if (tagClaudIsAnimated === 1 && tags.length > 0) {
            const options = this.getAnimationConfig();
            // eslint-disable-next-line new-cap
            TagCanvas.Start('blogSidebarCloudCanvas', '', options);
        }
    }

    componentDidUpdate(prevProps) {
        const { tags: prevTags } = prevProps;
        const { tags: currentTags } = this.props;
        const { tagClaudIsAnimated } = this.props;

        if (tagClaudIsAnimated === 1 && prevTags !== currentTags && currentTags.length > 0) {
            const options = this.getAnimationConfig();
            // eslint-disable-next-line new-cap
            TagCanvas.Start('blogSidebarCloudCanvas', '', options);
        }
    }

    containerProps() {
        const { isSidebarItemsLoading } = this.context;
        const {
            tagClaudCloudHeight, tagClaudTextHighlightColor, tagClaudIsAnimated, tags = []
        } = this.props;

        return {
            tags, tagClaudCloudHeight, tagClaudTextHighlightColor, tagClaudIsAnimated, isSidebarItemsLoading
        };
    }

    getTagClass(tagIndex) {
        const { tags } = this.props;
        // eslint-disable-next-line no-magic-numbers
        const percent = Math.floor((tagIndex / tags.length) * 100);

        // eslint-disable-next-line no-magic-numbers
        if (percent < 20) {
            return 'largest';
        }
        // eslint-disable-next-line no-magic-numbers
        if (percent >= 20 && percent < 40) {
            return 'large';
        }
        // eslint-disable-next-line no-magic-numbers
        if (percent >= 40 && percent < 60) {
            return 'medium';
        }
        // eslint-disable-next-line no-magic-numbers
        if (percent >= 60 && percent < 80) {
            return 'small';
        }

        return 'smallest';
    }

    getAnimationConfig() {
        const { tagClaudTextHighlightColor } = this.props;
        // This is similar to implementation on original extension , just to make sure we support both with and without #
        const color = `#${ tagClaudTextHighlightColor.replace('#', '')}`;

        return {
            textColour: color,
            outlineColour: color,
            maxSpeed: 0.03,
            depth: 0.75,
            weight: true,
            initial: [0, 1]
        };
    }

    render() {
        return (
            <SidebarTagCloud
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarTagCloudContainer);

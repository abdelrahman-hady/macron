/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { showNotification } from 'Store/Notification/Notification.action';
import { CustomerType } from 'Type/Account.type';
import { isSignedIn } from 'Util/Auth';
import transformToNameValuePair from 'Util/Form/Transform';
import { prepareQuery } from 'Util/Query';
import { executeGet, fetchMutation } from 'Util/Request';

import BlogPostCommentQuery from '../../query/BlogPostComment.query';
import BlogPostCommentsQuery from '../../query/BlogPostComments.query';
import { convertNumToBool, formatDate, getTwoDigitNumber } from '../../util/BlogPage';
import { ONE_MONTH_IN_SECONDS } from '../BlogPost/BlogPost.config';
import BlogPostComments from './BlogPostComments.component';
import { COMMENT_STATUS_PENDING } from './BlogPostComments.config';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Scandiweb/MagefanBlog/Component/BlogPostComments/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    commentsType: state.ConfigReducer.mfblog_post_view_comments_type,
    numberOfComments: state.ConfigReducer.mfblog_post_view_comments_number_of_comments,
    commentsNumberOfReplies: state.ConfigReducer.mfblog_post_view_comments_number_of_replies,
    guestComments: state.ConfigReducer.mfblog_post_view_comments_guest_comments,
    displayPrivacyPolicyCheckbox: state.ConfigReducer.mfblog_post_view_comments_display_privacy_policy_checkbox,
    defaultStatus: state.ConfigReducer.mfblog_post_view_comments_default_status,
    formatDate: state.ConfigReducer.mfblog_post_view_comments_format_date,
    customer: state.MyAccountReducer.customer

});

/** @namespace Scandiweb/MagefanBlog/Component/BlogPostComments/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    requestCustomerData: () => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.requestCustomerData(dispatch)
    ),
    showErrorNotification: (message) => dispatch(showNotification('error', message)),
    showSuccessNotification: (message) => dispatch(showNotification('success', message))
});

/** @namespace Scandiweb/MagefanBlog/Component/BlogPostComments/Container/BlogPostCommentsContainer */
export class BlogPostCommentsContainer extends PureComponent {
    static propTypes = {
        postId: PropTypes.number.isRequired,
        commentsType: PropTypes.string.isRequired,
        numberOfComments: PropTypes.number.isRequired,
        commentsNumberOfReplies: PropTypes.number.isRequired,
        guestComments: PropTypes.number.isRequired,
        displayPrivacyPolicyCheckbox: PropTypes.number.isRequired,
        defaultStatus: PropTypes.number.isRequired,
        formatDate: PropTypes.string.isRequired,
        requestCustomerData: PropTypes.func.isRequired,
        customer: CustomerType.isRequired,
        showErrorNotification: PropTypes.func.isRequired,
        showSuccessNotification: PropTypes.func.isRequired
    };

    containerFunctions = {
        getFormattedPublishDate: this.getFormattedPublishDate,
        getFormattedCommentId: this.getFormattedCommentId,
        handleSendComment: this.handleSendComment.bind(this),
        onSubmit: this.onSubmit.bind(this),
        handleShowReplyForm: this.handleShowReplyForm.bind(this),
        handleHideReplyForm: this.handleHideReplyForm.bind(this),
        userCanSendComment: this.userCanSendComment.bind(this)
    };

    componentDidUpdate() {
        const {
            requestCustomerData,
            customer
        } = this.props;

        if (isSignedIn() && !Object.keys(customer).length) {
            requestCustomerData();
        }
    }

    __construct(props) {
        super.__construct(props);

        const {
            requestCustomerData,
            customer
        } = props;

        if (isSignedIn() && !Object.keys(customer).length) {
            requestCustomerData();
        }

        this.state = {
            isLoading: true,
            comments: [],
            replyFormId: -1,
            defaultCommentText: '',
            defaultAuthorNickname: '',
            defaultAuthorEmail: ''
        };
        this.getComments();
    }

    containerProps() {
        const {
            comments,
            totalCount = 0,
            replyFormId,
            isLoading,
            defaultCommentText,
            defaultAuthorNickname,
            defaultAuthorEmail
        } = this.state;
        const { displayPrivacyPolicyCheckbox } = this.props;

        return {
            isPrivacyPolicyCheckboxEnabled: convertNumToBool(displayPrivacyPolicyCheckbox),
            comments,
            totalCount,
            replyFormId,
            isLoading,
            defaultCommentText,
            defaultAuthorNickname,
            defaultAuthorEmail
        };
    }

    getComments = async () => {
        const { postId } = this.props;
        const query = BlogPostCommentsQuery.getBlogComments({ filter: { post_id: { eq: postId } } });

        try {
            const {
                blogComments: { items, total_count }
            } = await executeGet(prepareQuery(query), 'MagefanBlogPostComments', ONE_MONTH_IN_SECONDS);

            this.setState({
                comments: items,
                totalCount: total_count,
                isLoading: false
            });
        } catch (_error) {
            this.setState({ isLoading: false });
        }
    };

    getFormattedCommentId(commentId) {
        return `c-post-${commentId}`;
    }

    getFormattedPublishDate(rawDate) {
        const date = new Date(rawDate);
        const hours = getTwoDigitNumber(date.getHours());
        const minutes = getTwoDigitNumber(date.getMinutes());

        return `${formatDate(rawDate)} ${hours}:${minutes}`;
    }

    async handleSendComment(input) {
        const { showErrorNotification, showSuccessNotification } = this.props;
        this.setState({ isLoading: true });

        try {
            const {
                addCommentToPost: { comments }
            } = await fetchMutation(BlogPostCommentQuery.getBlogCommentMutation(input));
            const { defaultStatus } = this.props;

            this.setState({
                comments,
                totalCount: this.getCommentsTotalCount(comments),
                replyFormId: -1,
                isLoading: false
            });

            if (defaultStatus === COMMENT_STATUS_PENDING) {
                showSuccessNotification(__('You submitted your comment for moderation.'));
            } else {
                showSuccessNotification(__('Thank you for your comment.'));
            }
        } catch (_error) {
            this.setState({ isLoading: false });
            showErrorNotification(
                __('Something went wrong, we couldn\'t submit your comment, please try again in a few moments.')
            );
        }
    }

    onSubmit(form, fields) {
        const {
            commentText,
            authorNickname,
            authorEmail,
            parentId
        } = transformToNameValuePair(fields);
        const { postId, customer } = this.props;

        const input = {
            post_id: postId,
            text: commentText,
            author_nickname: isSignedIn() ? `${customer.firstname} ${customer.lastname}` : authorNickname,
            author_email: isSignedIn() ? customer.email : authorEmail,
            parent_id: parentId < 0 ? 0 : parentId
        };

        this.handleSendComment(input);
    }

    handleShowReplyForm(commentId) {
        this.setState({ replyFormId: commentId });
    }

    handleHideReplyForm() {
        this.setState({ replyFormId: -1 });
    }

    getCommentsTotalCount(comments) {
        /* eslint-disable fp/no-let */
        let totalCount = 0;

        for (let i = 0; i < comments.length; i++) {
            totalCount += comments[i].replies.length + 1;
        }
        /* eslint-enable fp/no-let */

        return totalCount;
    }

    userCanSendComment() {
        const { guestComments: isGuestCommentEnabled } = this.props;
        return convertNumToBool(isGuestCommentEnabled) || isSignedIn();
    }

    render() {
        return (
            <BlogPostComments
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostCommentsContainer);

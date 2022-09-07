/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import { isSignedIn } from 'Util/Auth';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

import { commentsType } from '../../type/MagefanBlog';

import './BlogPostComments.style';

/** @namespace Scandiweb/MagefanBlog/Component/BlogPostComments/Component/BlogPostCommentsComponent */
export class BlogPostCommentsComponent extends PureComponent {
    static propTypes = {
        comments: commentsType.isRequired,
        onSubmit: PropTypes.func.isRequired,
        handleShowReplyForm: PropTypes.func.isRequired,
        handleHideReplyForm: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isPrivacyPolicyCheckboxEnabled: PropTypes.bool.isRequired,
        userCanSendComment: PropTypes.func.isRequired,
        totalCount: PropTypes.number.isRequired,
        getFormattedPublishDate: PropTypes.func.isRequired,
        getFormattedCommentId: PropTypes.func.isRequired,
        replyFormId: PropTypes.number.isRequired,
        defaultCommentText: PropTypes.string.isRequired,
        defaultAuthorNickname: PropTypes.string.isRequired,
        defaultAuthorEmail: PropTypes.string.isRequired
    };

    renderTitle() {
        const { totalCount = 0 } = this.props;
        const commentsString = __('Comment(s)');

        return (
            <div className="c-count">
                <strong>{ `${totalCount} ${commentsString}` }</strong>
            </div>
        );
    }

    renderReplies(replies) {
        if (!replies || replies.length < 1) {
            return null;
        }

        return (
            <div className="p-replies">
                { replies.map((replay) => this.renderComment(replay, 1)) }
            </div>
        );
    }

    renderComment(comment, parentIndex) {
        const {
            getFormattedPublishDate,
            getFormattedCommentId,
            replyFormId,
            handleShowReplyForm
        } = this.props;

        return (
            <div className={ `c-comment c-comment-parent-${parentIndex}` } key={ `comment${comment.comment_id}` }>
                <div
                  className={ `c-post ${getFormattedCommentId(comment.comment_id)}` }
                  id={ getFormattedCommentId(comment.comment_id) }
                >
                    <div className="p-info">
                        <div className="p-name">{ comment.author_nickname }</div>
                        <div className="publish-date">{ getFormattedPublishDate(comment.creation_time) }</div>
                    </div>
                    <p className="p-text">{ comment.text }</p>
                    <div className="p-actions">
                        <button
                          className="reply-action"
                          title="Reply"
                          // eslint-disable-next-line react/jsx-no-bind
                          onClick={ () => handleShowReplyForm(comment.comment_id) }
                        >
                            { __('Reply') }
                        </button>
                    </div>
                    { parentIndex < 1
                        && (
                            <>
                            { this.renderReplies(comment.replies) }
                            { replyFormId === comment.comment_id && this.renderSendCommentForm(comment.comment_id) }
                            </>
                        ) }
                </div>
            </div>
        );
    }

    renderCommentsElements(comments) {
        return comments.map((comment) => this.renderComment(comment, 0));
    }

    renderComments() {
        const { comments = [], totalCount } = this.props;
        if (!comments || totalCount < 1) {
            return null;
        }

        return (
            <div className="c-comments">
                { this.renderCommentsElements(comments) }
            </div>
        );
    }

    renderParentIdField(parentId) {
        return (
            <Field
              attr={ {
                  id: 'parentId',
                  name: 'parentId',
                  value: parentId,
                  type: 'hidden'
              } }
              validationRule={ {
                  isRequired: true
              } }
            />
        );
    }

    renderCommentTextField() {
        const { userCanSendComment, defaultCommentText } = this.props;

        return (
            <Field
              type={ FIELD_TYPE.textarea }
              attr={ {
                  id: 'commentText',
                  name: 'commentText',
                  defaultValue: defaultCommentText,
                  placeholder: userCanSendComment() ? __('Add a comment...') : __('Sign in to add a comment...'),
                  autocomplete: 'off'
              } }
              validateOn={ ['onChange'] }
              validationRule={ {
                  isRequired: true
              } }
              isDisabled={ !userCanSendComment() }
              addRequiredTag
            />
        );
    }

    renderAuthorNameField() {
        const { defaultAuthorNickname } = this.props;
        return (
            <div className="left-hld">
                <Field
                  type={ FIELD_TYPE.text }
                  attr={ {
                      id: 'authorNickname',
                      name: 'authorNickname',
                      defaultValue: defaultAuthorNickname,
                      className: 'input-text required-entry',
                      placeholder: __('Full Name'),
                      autocomplete: 'given-name'
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      inputType: VALIDATION_INPUT_TYPE.alphaSpace,
                      isRequired: true
                  } }
                  addRequiredTag
                />
            </div>
        );
    }

    renderAuthorEmailField() {
        const { defaultAuthorEmail } = this.props;
        return (
            <div className="right-hld">
                <Field
                  type={ FIELD_TYPE.text }
                  attr={ {
                      id: 'authorEmail',
                      name: 'authorEmail',
                      defaultValue: defaultAuthorEmail,
                      className: 'input-text',
                      placeholder: __('Email'),
                      autocomplete: 'email'
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      isRequired: true,
                      inputType: VALIDATION_INPUT_TYPE.email
                  } }
                  addRequiredTag
                />
            </div>
        );
    }

    renderAuthorFields() {
        const { userCanSendComment } = this.props;
        if (isSignedIn()) {
            return null;
        }
        if (!userCanSendComment()) {
            return null;
        }

        return (
            <div className="lr-hld">
                { this.renderAuthorNameField() }
                { this.renderAuthorEmailField() }
            </div>
        );
    }

    renderPrivacyPolicyFieldLabel() {
        // TODO make it translatable
        // TODO take the link dynamaticly (?)
        return (
            <p className="privacy">
            { __('Yes, I have read the ') }
                <Link to="/privacy-policy-cookie-restriction-mode" target="_blank">{ __('privacy policy') }</Link>
            { __(' and agree to the processing of my personal data.') }
            </p>
        );
    }

    renderPrivacyPolicyField() {
        const { isPrivacyPolicyCheckboxEnabled } = this.props;
        if (!isPrivacyPolicyCheckboxEnabled) {
            return null;
        }

        const { userCanSendComment } = this.props;

        return (
            <Field
              type={ FIELD_TYPE.checkbox }
              label={ this.renderPrivacyPolicyFieldLabel() }
              attr={ {
                  id: 'privacy',
                  name: 'privacy',
                  value: 'privacy',
                  checked: false
              } }
              validateOn={ ['onChange'] }
              validationRule={ {
                  isRequired: true
              } }
              isDisabled={ !userCanSendComment() }
            />
        );
    }

    renderCancelButton(parentId) {
        const { handleHideReplyForm } = this.props;
        if (parentId < 0) {
            return null;
        }

        return (
            <button
              block="Button"
              className="cancel"
              type={ FIELD_TYPE.button }
              onClick={ handleHideReplyForm }
            >
                { __('Cancel') }
            </button>
        );
    }

    renderSubmitButton() {
        return (
            <button
              block="Button"
              type={ FIELD_TYPE.submit }
            >
                { __('Submit') }
            </button>
        );
    }

    renderSignInButton() {
        return (
            <Link
              to="/customer/account/login"
              className="Button"
            >
                { __('Sign In') }
            </Link>
        );
    }

    renderActionFields(parentId) {
        const { userCanSendComment } = this.props;
        if (!userCanSendComment()) {
            return this.renderSignInButton();
        }

        return (
            <>
                { this.renderCancelButton(parentId) }
                { this.renderSubmitButton() }
            </>
        );
    }

    renderSendCommentFields(parentId) {
        return (
            <>
                { this.renderParentIdField(parentId) }
                { this.renderCommentTextField() }
                <div className="c-btn-hld">
                    { this.renderAuthorFields() }
                    { this.renderPrivacyPolicyField() }
                    <div className="clearfix" />
                    { this.renderActionFields(parentId) }
                </div>
            </>
        );
    }

    renderSendCommentForm(parentId) {
        const { onSubmit } = this.props;
        return (
            <div className="c-reply cf">
                <div className="c-replyform <?php if ($canPost) {  echo 'no-active'; } ?>">
                    <Form
                      key="send-comment"
                      onSubmit={ onSubmit }
                    >
                        { this.renderSendCommentFields(parentId) }
                    </Form>
                </div>
            </div>
        );
    }

    renderContent() {
        const { isLoading } = this.props;
        if (isLoading) {
            return <Loader />;
        }

        return (
            <>
                { this.renderSendCommentForm(-1) }
                { this.renderComments() }
            </>
        );
    }

    render() {
        return (
            <div className="block comments">
                { this.renderTitle() }
                { this.renderContent() }
            </div>
        );
    }
}

export default BlogPostCommentsComponent;

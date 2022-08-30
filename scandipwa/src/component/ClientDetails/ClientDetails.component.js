/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Popup from 'Component/Popup/Popup.container';

import { ADD_NOTE_POPUP } from './ClientDetails.config';

import './ClientDetails.style';

/** @namespace Scandipwa/Component/ClientDetails/Component */
export class ClientDetailsComponent extends PureComponent {
    static propTypes = {
        showAddNotePopup: PropTypes.func.isRequired,
        onFieldChange: PropTypes.func.isRequired,
        onNoteSave: PropTypes.func.isRequired,
        savedNote: PropTypes.string.isRequired,
        savedInternalNote: PropTypes.string.isRequired,
        isReadMore: PropTypes.bool.isRequired,
        toggleIsReadMore: PropTypes.func.isRequired
    };

    renderPopUpContent() {
        const {
            onFieldChange, onNoteSave, savedNote, savedInternalNote
        } = this.props;

        return (
            <div block="ClientDetails" elem="Note">
                <Field
                  type={ FIELD_TYPE.text }
                  label={ <b>{ __('Note:') }</b> }
                  attr={ {
                      id: 'note',
                      name: 'note',
                      defaultValue: savedNote
                  } }
                  events={ {
                      onChange: onFieldChange
                  } }
                />
                <Field
                  type={ FIELD_TYPE.text }
                  label={ <b>{ __('Internal note:') }</b> }
                  attr={ {
                      id: 'internalNote',
                      name: 'internalNote',
                      defaultValue: savedInternalNote
                  } }
                  events={ {
                      onChange: onFieldChange
                  } }
                />
                <button
                  onClick={ onNoteSave }
                  block="Button"
                >
                    { __('Save notes') }
                </button>
            </div>
        );
    }

    render() {
        const {
            showAddNotePopup, savedNote, savedInternalNote, isReadMore, toggleIsReadMore
        } = this.props;

        const readMoreText = isReadMore ? __('see more') : __('see less');

        const characterCount = 35;
        const noteText = isReadMore && savedNote.length > characterCount
            ? `${savedNote.slice(0, characterCount) }...` : savedNote;
        const internalNoteText = isReadMore && savedInternalNote.length > characterCount
            ? `${savedInternalNote.slice(0, characterCount) }...` : savedInternalNote;

        return (
            <div block="ClientDetails">
                <div block="ClientDetails" elem="NoteContainer">
                    { savedNote && (
                        <>
                            <div block="ClientDetails" elem="EditNote">
                                <span><b>{ __('Note:') }</b></span>
                                <button onClick={ showAddNotePopup }>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12"
                                      height="12"
                                      viewBox="0 0 24 24"
                                    >
                                        { /* eslint-disable-next-line max-len */ }
                                        <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
                                    </svg>
                                </button>
                            </div>
                            <p>{ noteText }</p>
                            { savedNote.length > characterCount
                            && <button onClick={ toggleIsReadMore }><b>{ readMoreText }</b></button> }
                            <br />
                        </>
                    ) }
                    { savedInternalNote && (
                        <>
                            <div block="ClientDetails" elem="EditNote">
                                <span><b>{ __('Internal note:') }</b></span>
                                <button onClick={ showAddNotePopup }>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12"
                                      height="12"
                                      viewBox="0 0 24 24"
                                    >
                                        { /* eslint-disable-next-line max-len */ }
                                        <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
                                    </svg>
                                </button>
                            </div>
                            <p>{ internalNoteText }</p>
                            { savedInternalNote.length > characterCount
                            && <button onClick={ toggleIsReadMore }><b>{ readMoreText }</b></button> }
                        </>
                    ) }
                </div>
                { (!savedNote || !savedInternalNote) && (
                    <button
                      onClick={ showAddNotePopup }
                      block="Button"
                    >
                        { __('Add notes') }
                    </button>
                ) }
                <Popup
                  id={ ADD_NOTE_POPUP }
                  mix={ { block: 'ClientDetails', elem: 'Popup' } }
                >
                    { this.renderPopUpContent() }
                </Popup>
            </div>
        );
    }
}

export default ClientDetailsComponent;

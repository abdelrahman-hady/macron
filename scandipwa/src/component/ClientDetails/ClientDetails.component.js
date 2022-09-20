/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @author    Abdelrahman Hady <abdelrahman.hady@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Popup from 'Component/Popup/Popup.container';
import { RefType } from 'Type/Common.type';

import { ADD_NOTE_POPUP } from './ClientDetails.config';

import './ClientDetails.style';

/** @namespace Scandipwa/Component/ClientDetails/Component */
export class ClientDetailsComponent extends PureComponent {
    static propTypes = {
        showAddNotePopup: PropTypes.func.isRequired,
        onNoteSave: PropTypes.func.isRequired,
        note: PropTypes.string.isRequired,
        internalNote: PropTypes.string.isRequired,
        selectedCustomer: PropTypes.string.isRequired,
        isReadMore: PropTypes.bool.isRequired,
        toggleIsReadMore: PropTypes.func.isRequired,
        noteRef: RefType.isRequired,
        internalNoteRef: RefType.isRequired,
        defaultShippingAddress: PropTypes.objectOf.isRequired
    };

    renderPopUpContent() {
        const {
            onNoteSave, note, internalNote, noteRef, internalNoteRef
        } = this.props;

        return (
            <div block="ClientDetails" elem="Note">
                <Field
                  type={ FIELD_TYPE.text }
                  label={ <b>{ __('Note:') }</b> }
                  attr={ {
                      id: 'note',
                      name: 'note',
                      defaultValue: note
                  } }
                  elemRef={ noteRef }
                />
                <Field
                  type={ FIELD_TYPE.text }
                  label={ <b>{ __('Internal note:') }</b> }
                  attr={ {
                      id: 'internalNote',
                      name: 'internalNote',
                      defaultValue: internalNote
                  } }
                  elemRef={ internalNoteRef }
                />
                <div block="ClientDetails" elem="SaveNotes">
                    <button
                      onClick={ onNoteSave }
                      block="Button"
                    >
                        { __('Save notes') }
                    </button>
                </div>
            </div>
        );
    }

    render() {
        const {
            showAddNotePopup, note, internalNote, isReadMore, toggleIsReadMore, selectedCustomer, defaultShippingAddress
        } = this.props;

        const readMoreText = isReadMore ? __('see more') : __('see less');

        const characterCount = 35;
        const noteText = isReadMore && note.length > characterCount
            ? `${note.slice(0, characterCount) }...` : note;
        const internalNoteText = isReadMore && internalNote.length > characterCount
            ? `${internalNote.slice(0, characterCount) }...` : internalNote;

        return (
            <div block="ClientDetails">
                <h3 block="ClientDetails" elem="Heading">{ __('Client details:') }</h3>
                <div block="ClientDetails" elem="Info">
                    { /* eslint-disable-next-line max-len */ }
                    <div block="ClientDetails" elem="Customer">
                        <span block="ClientDetails" elem="CustomerText">{ __('Customer:') }</span>
                        <span block="ClientDetails" elem="CustomerValue">{ selectedCustomer }</span>
                    </div>
                    { /* eslint-disable-next-line max-len */ }
                    <div block="ClientDetails" elem="Address">
                        <span block="ClientDetails" elem="AddressText">{ __('Address:') }</span>
                        <span block="ClientDetails" elem="AddressValue">{ defaultShippingAddress.address }</span>
                    </div>
                    <div block="ClientDetails" elem="OrderType">
                        <span block="ClientDetails" elem="OrderTypeText">{ __('Order type:') }</span>
                    </div>
                </div>
                <div block="ClientDetails" elem="NoteContainer">
                    { note && (
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
                            { note.length > characterCount
                            && <button onClick={ toggleIsReadMore }><b>{ readMoreText }</b></button> }
                            <br />
                        </>
                    ) }
                    { internalNote && (
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
                            { internalNote.length > characterCount
                            && <button onClick={ toggleIsReadMore }><b>{ readMoreText }</b></button> }
                        </>
                    ) }
                </div>
                { ((!note || !internalNote)) && (
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

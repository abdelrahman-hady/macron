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
        savedInternalNote: PropTypes.string.isRequired
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
        const { showAddNotePopup, savedNote, savedInternalNote } = this.props;
        return (
            <div block="ClientDetails">
                <div block="ClientDetails" elem="NoteContainer">
                    { savedNote && (
                        <>
                            <span><b>{ __('Note:') }</b></span>
                            <p>{ savedNote }</p>
                        </>
                    ) }
                    { savedInternalNote && (
                        <>
                            <span><b>{ __('Internal note:') }</b></span>
                            <p>{ savedInternalNote }</p>
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

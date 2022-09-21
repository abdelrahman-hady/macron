/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @author    Abdelrahman Hady <abdelrahman.hady@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { createRef, PureComponent } from 'react';
import { connect } from 'react-redux';

import { updateNotes } from 'Store/CustomCartData/CustomCartData.action';
import { hideActivePopup } from 'Store/Overlay/Overlay.action';
import { showPopup } from 'Store/Popup/Popup.action';

import ClientDetails from './ClientDetails.component';
import { ADD_NOTE_POPUP } from './ClientDetails.config';

/** @namespace Scandipwa/Component/ClientDetails/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    note: state.CustomCartDataReducer.note,
    internalNote: state.CustomCartDataReducer.internalNote,
    selectedCustomer: state.CustomCartDataReducer.selectedCustomer
});

/** @namespace Scandipwa/Component/ClientDetails/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showAddNotePopup: () => dispatch(showPopup(ADD_NOTE_POPUP)),
    hideActivePopup: () => dispatch(hideActivePopup()),
    updateNotes: (notes) => dispatch(updateNotes(notes))
});

/** @namespace Scandipwa/Component/ClientDetails/Container */
export class ClientDetailsContainer extends PureComponent {
    static propTypes = {
        showAddNotePopup: PropTypes.func.isRequired,
        hideActivePopup: PropTypes.func.isRequired,
        updateNotes: PropTypes.func.isRequired,
        note: PropTypes.string.isRequired,
        internalNote: PropTypes.string.isRequired,
        selectedCustomer: PropTypes.string.isRequired
    };

    state = {
        noteRef: createRef(),
        internalNoteRef: createRef(),
        isReadMore: true
    };

    containerFunctions = {
        onNoteSave: this.onNoteSave.bind(this),
        toggleIsReadMore: this.toggleIsReadMore.bind(this),
        getDefaultShippingAddress: this.getDefaultShippingAddress.bind(this)
    };

    getDefaultShippingAddress() {
        const customer = JSON.parse(localStorage.getItem('customer'));
        const address = customer.data.addresses[0];
        if (address.default_shipping) {
            const street = address.street[0];
            const { city, region, country_id } = address;
            const defaultShippingAddress = `${street}, ${region.region}, ${city}, ${country_id}`;

            return defaultShippingAddress;
        }

        return '';
    }

    toggleIsReadMore() {
        const { isReadMore } = this.state;
        this.setState((prevState) => ({ ...prevState, isReadMore: !isReadMore }));
    }

    onNoteSave() {
        const { noteRef, internalNoteRef } = this.state;
        const { hideActivePopup, updateNotes } = this.props;

        updateNotes({ note: noteRef.current.value, internalNote: internalNoteRef.current.value });

        hideActivePopup();
    }

    containerProps = () => {
        const {
            showAddNotePopup, note, internalNote, selectedCustomer
        } = this.props;
        const {
            isReadMore, noteRef, internalNoteRef
        } = this.state;

        return {
            showAddNotePopup,
            note,
            internalNote,
            selectedCustomer,
            isReadMore,
            noteRef,
            internalNoteRef
        };
    };

    render() {
        return (
            <ClientDetails
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetailsContainer);

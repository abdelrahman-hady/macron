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

import CustomerQuery from 'Query/Customer.query';
import { updateNotes } from 'Store/CustomCartData/CustomCartData.action';
import { hideActivePopup } from 'Store/Overlay/Overlay.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { fetchQuery } from 'Util/Request';

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
        isReadMore: true,
        defaultShippingAddress: {}
    };

    containerFunctions = {
        onNoteSave: this.onNoteSave.bind(this),
        toggleIsReadMore: this.toggleIsReadMore.bind(this)
    };

    componentDidMount() {
        const query = CustomerQuery.getDefaultShippingAddressQuery();
        fetchQuery(query).then(
            /** @namespace Scandipwa/Component/ClientDetails/Container/ClientDetailsContainer/componentDidMount/fetchQuery/then */
            ({ getDefaultShippingAddress }) => {
                this.setState({ defaultShippingAddress: getDefaultShippingAddress });
            }
        );
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
            isReadMore, noteRef, internalNoteRef, defaultShippingAddress
        } = this.state;

        return {
            showAddNotePopup,
            note,
            internalNote,
            selectedCustomer,
            isReadMore,
            noteRef,
            internalNoteRef,
            defaultShippingAddress
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

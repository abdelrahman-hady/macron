/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { hideActivePopup } from 'Store/Overlay/Overlay.action';
import { showPopup } from 'Store/Popup/Popup.action';

import ClientDetails from './ClientDetails.component';
import { ADD_NOTE_POPUP } from './ClientDetails.config';

/** @namespace Scandipwa/Component/ClientDetails/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({
});

/** @namespace Scandipwa/Component/ClientDetails/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showAddNotePopup: () => dispatch(showPopup(ADD_NOTE_POPUP)),
    hideActivePopup: () => dispatch(hideActivePopup())
});

/** @namespace Scandipwa/Component/ClientDetails/Container */
export class ClientDetailsContainer extends PureComponent {
    static propTypes = {
        showAddNotePopup: PropTypes.func.isRequired,
        hideActivePopup: PropTypes.func.isRequired
    };

    state = {
        note: '',
        internalNote: '',
        savedNote: '',
        savedInternalNote: '',
        isReadMore: true
    };

    containerFunctions = {
        onFieldChange: this.onFieldChange.bind(this),
        onNoteSave: this.onNoteSave.bind(this),
        toggleIsReadMore: this.toggleIsReadMore.bind(this)
    };

    toggleIsReadMore() {
        const { isReadMore } = this.state;
        this.setState((prevState) => ({ ...prevState, isReadMore: !isReadMore }));
    }

    onFieldChange(e) {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    onNoteSave() {
        const { note, internalNote } = this.state;
        const { hideActivePopup } = this.props;
        this.setState({
            savedNote: note,
            savedInternalNote: internalNote
        });

        hideActivePopup();
    }

    containerProps = () => {
        const { showAddNotePopup } = this.props;
        const { savedNote, savedInternalNote, isReadMore } = this.state;

        return {
            showAddNotePopup,
            savedNote,
            savedInternalNote,
            isReadMore
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

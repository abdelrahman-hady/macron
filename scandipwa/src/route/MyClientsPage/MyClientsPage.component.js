/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import AddIcon from 'Component/AddIcon';
import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import MyClientsTable from 'Component/MyClientsTable';

/** @namespace Scandipwa/Route/MyClientsPage/Component */
export class MyClientsPageComponent extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        onCreateClientHandler: PropTypes.func.isRequired
    };

    static defaultProps = {
        isLoading: false
    };

    renderHeading() {
        return (
            <h1>
                { __('My clients') }
            </h1>
        );
    }

    renderCreateClient() {
        const { onCreateClientHandler } = this.props;
        return (
            <button block="Button" mods={ { isHollow: true } } onClick={ onCreateClientHandler }>
                <AddIcon />
                { __('Create new client') }
            </button>
        );
    }

    renderMainContent() {
        return (
            <ContentWrapper label="My Clients Page">
                { this.renderHeading() }
                { this.renderCreateClient() }
                <MyClientsTable />
            </ContentWrapper>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <main block="MyClientsPage">
                <Loader isLoading={ isLoading } />
                { this.renderMainContent() }
            </main>
        );
    }
}

export default MyClientsPageComponent;

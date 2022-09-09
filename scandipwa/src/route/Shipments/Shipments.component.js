/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright  Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com) (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

/* eslint-disable react/jsx-no-bind */
/* eslint-disable @scandipwa/scandipwa-guidelines/no-jsx-variables */
/* eslint-disable max-len */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import ShipmentsTable from 'Component/ShipmentsTable';

import './Shipments.style';

/** @namespace Scandipwa/Route/Shipments/Component */
export class ShipmentsComponent extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool
    };

    static defaultProps = {
        isLoading: false
    };

    title = __('Shipments');

    renderTitle() {
        return (
            <h1 block="Shipments" elem="Title">
                { this.title }
            </h1>
        );
    }

    renderContent() {
        return (
            <ContentWrapper label="Shipments">
                { this.renderTitle() }
                <ShipmentsTable />
            </ContentWrapper>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <main block="Shipments">
                <Loader isLoading={ isLoading } />
                { this.renderContent() }
            </main>
        );
    }
}

export default ShipmentsComponent;

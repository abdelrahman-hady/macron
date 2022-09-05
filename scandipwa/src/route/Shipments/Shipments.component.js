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

// import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';

import './Shipments.style';

/** @namespace Scandipwa/Route/Shipments/Component */
export class ShipmentsComponent extends PureComponent {
    static propTypes = {
        // TODO: implement prop-types
    };

    title = __('Shipments');

    renderTitle() {
        return (
            <h1 block="Shipments" elem="Title">
                { this.title }
            </h1>
        );
    }

    render() {
        return (
            <main block="Shipments">
                <ContentWrapper label="Shipments">
                  { this.renderTitle() }
                </ContentWrapper>
            </main>
        );
    }
}

export default ShipmentsComponent;

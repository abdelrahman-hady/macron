import { Suspense } from 'react';

import ClientDetails from 'Component/ClientDetails';
import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import {
    CartCoupon,
    Checkout as SourceCheckout,
    CheckoutBilling,
    CheckoutOrderSummary,
    CheckoutShipping,
    CheckoutSuccess,
    CmsBlock,
    ExpandableContent
} from 'SourceRoute/Checkout/Checkout.component';

import {
    DETAILS_STEP
} from './Checkout.config';

export {
    CartCoupon,
    CmsBlock,
    CheckoutOrderSummary,
    CheckoutBilling,
    CheckoutShipping,
    CheckoutSuccess,
    ExpandableContent
};

/** @namespace Scandipwa/Route/Checkout/Component */
export class CheckoutComponent extends SourceCheckout {
    renderOrderNotes() {
        return (
             <ClientDetails
               isCheckoutPage
             />
        );
    }

    render() {
        const { totals, checkoutStep } = this.props;

        if (totals.items.length < 1 && checkoutStep !== DETAILS_STEP) {
            return this.renderFullPageLoader();
        }

        return (
            <main block="Checkout">
                <ContentWrapper
                  wrapperMix={ { block: 'Checkout', elem: 'Wrapper' } }
                  label={ __('Checkout page') }
                >
                    { this.renderSummary(true) }
                    <div>
                        <div block="Checkout" elem="Step">
                            { this.renderTitle() }
                            { this.renderStoreInPickUpMethod() }
                            { this.renderStep() }
                            { this.renderLoader() }
                        </div>
                    </div>
                    <div>
                        <Suspense fallback={ <Loader /> }>
                            { this.renderSummary() }
                            { this.renderOrderNotes() }
                            { this.renderPromo() }
                        </Suspense>
                    </div>
                </ContentWrapper>
            </main>
        );
    }
}

export default CheckoutComponent;

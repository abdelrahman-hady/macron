/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import {
    getBundleOptions,
    getIndexedAttributes, getIndexedConfigurableOptions, getIndexedCustomOptions, getIndexedReviews, getIndexedVariants
} from 'SourceUtil/Product';

export * from 'SourceUtil/Product/Product';

/** @namespace Scandipwa/Util/Product/getIndexedProduct */
export const getIndexedProduct = (product) => {
    const {
        variants: initialVariants = [],
        configurable_options: initialConfigurableOptions = [],
        attributes: initialAttributes = [],
        options: initialOptions = [],
        rating_summary,
        review_count,
        reviews: initialReviews,
        items = [],
        bundle_options = []
    } = product;

    const attributes = getIndexedAttributes(initialAttributes || []);
    const reviews = getIndexedReviews(initialReviews);

    const updatedProduct = {
        ...product,
        configurable_options: getIndexedConfigurableOptions(initialConfigurableOptions, attributes),
        variants: getIndexedVariants(initialVariants),
        options: getIndexedCustomOptions(initialOptions || []),
        attributes,
        // Magento 2.4.1 review endpoint compatibility
        reviews,
        review_summary: {
            rating_summary,
            review_count
        }
    };

    if (bundle_options.length) {
        updatedProduct.items = getBundleOptions(bundle_options, items);
    }

    return updatedProduct;
};

import {
    getQuantity, MIN_SALE_QTY
} from 'SourceUtil/Product/Extract';

export * from 'SourceUtil/Product/Extract';

export const DEFAULT_MIN_PRODUCTS = 0;
export const DEFAULT_MAX_PRODUCTS = 99999;

/**
 * Returns minimum purchasable item quantity
 * @param product
 * @param configIndex
 * @returns {*}
 * @namespace Scandipwa/Util/Product/Extract/getMinQuantity */
export const getMinQuantity = (product, configIndex = -1) => (
    getQuantity(product, DEFAULT_MIN_PRODUCTS, MIN_SALE_QTY, configIndex)
);

/**
 * Returns maximum purchasable item quantity.
 * @param product
 * @param configIndex
 * @returns {*}
 * @namespace Scandipwa/Util/Product/Extract/getMaxQuantity */
export const getMaxQuantity = () => DEFAULT_MAX_PRODUCTS;

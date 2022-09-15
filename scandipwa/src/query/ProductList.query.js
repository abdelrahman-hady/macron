import { SORT_DIRECTION_TYPE } from 'Route/CategoryPage/CategoryPage.config';
import { NONE_SORT_OPTION_VALUE } from 'Route/SearchPage/SearchPage.config';
import { ProductListQuery as SourceProductListQuery } from 'SourceQuery/ProductList.query';
import { CUSTOMER } from 'Store/MyAccount/MyAccount.dispatcher';
import BrowserDatabase from 'Util/BrowserDatabase';

/** @namespace Scandipwa/Query/ProductList/Query */
export class ProductListQuery extends SourceProductListQuery {
    _getFilterArgumentMap() {
        return {
            categoryIds: (id) => ({ category_id: { eq: id } }),
            categoryUrlPath: (url) => ({ category_url_path: { eq: url } }),
            priceRange: ({ min, max }) => {
                const price = {};

                if (min) {
                    price.from = min;
                }

                if (max) {
                    price.to = max;
                }

                return { price };
            },
            productsSkuArray: (sku) => ({ sku: { in: sku } }),
            productSKU: (sku) => ({ sku: { eq: sku } }),
            productID: (id) => ({ id: { eq: id } }),
            productUrlPath: (url) => ({ url_key: { eq: url } }),
            customFilters: this._getCustomFilters.bind(this),
            newToDate: (date) => ({ news_to_date: { eq: date } }),
            conditions: (conditions) => ({ conditions: { eq: conditions } }),
            customerGroupId: (id) => ({ customer_group_id: { eq: id } }),
            IsPatch: (val) => ({ is_patch: { eq: val } })
        };
    }

    _getArgumentsMap() {
        const { requireInfo } = this.options;
        const filterArgumentMap = this._getFilterArgumentMap();

        return {
            currentPage: { type: 'Int!' },
            pageSize: {
                type: 'Int!',
                handler: (option) => (requireInfo ? 1 : option)
            },
            search: {
                type: 'String!',
                handler: (option) => option.replace(/\+/g, ' ')
            },
            sort: {
                type: 'ProductAttributeSortInput!',
                handler: ({ sortKey, sortDirection }) => {
                    if (sortKey === NONE_SORT_OPTION_VALUE) {
                        return {};
                    }

                    return { [sortKey]: sortDirection || SORT_DIRECTION_TYPE.asc };
                }
            },
            filter: {
                type: 'ProductAttributeFilterInput!',
                handler: (initialOptions = {}) => {
                    // add customer group by default to all requests
                    const { group_id } = BrowserDatabase.getItem(CUSTOMER) || {};

                    const options = {
                        ...initialOptions,
                        customerGroupId: group_id || '0'
                    };

                    const {
                        customFilters: { category_id, IsPatch } = {}
                    } = options;

                    /**
                     * Remove category ID from select, if there is a custom filter
                     * of category already selected in filtering options.
                     */
                    if (category_id) {
                        // eslint-disable-next-line fp/no-delete
                        options.categoryIds = undefined;
                    }

                    if (!IsPatch) {
                        // eslint-disable-next-line fp/no-delete
                        options.categoryIds = undefined;
                    }

                    const parsedOptions = Object.entries(options).reduce(
                        (acc, [key, option]) => {
                            // if there is no value, or if the key is just not present in options object
                            if (!option || !filterArgumentMap[key]) {
                                return acc;
                            }

                            return { ...acc, ...filterArgumentMap[key](option) };
                        },
                        {}
                    );

                    return parsedOptions;
                }
            }
        };
    }
}

export default new ProductListQuery();

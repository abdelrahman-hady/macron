/**
 * @category  Macron
 * @author    Abdelhakk Bakry <abdelhakk.bakry@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

define([
    'jquery'
], function ($) {
    'use strict';
    return function (target) {
        $.validator.addMethod(
            'validate-comma-separated-numbers',
            function (value) {
                let isValid = true;
                const values = value.split(',')
                let arrLength = values.length
                if (arrLength === undefined || arrLength === 0) {
                    isValid = false;
                }
                values.forEach((item) => {
                    //validating if it is a finit number and no more than 4 digits, max should be 9999
                    if (isNaN(item) || !isFinite(item) || item.length > 4 || item.length === 0) {
                        isValid = false
                    }
                })
                return isValid;
            },
            $.mage.__('Please enter a valid value, ex: 10,20,30.')
        );
        return target;
    };
});

/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';

import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import FieldForm from 'Component/FieldForm';
import SearchIcon from 'Component/SearchIcon';

import './SidebarSearch.style';

/** @namespace Scandiweb/MagefanBlog/Component/SidebarSearch/Component/SidebarSearchComponent */
export class SidebarSearchComponent extends FieldForm {
    static propTypes = {
        input: PropTypes.string.isRequired,
        handleChange: PropTypes.func.isRequired,
        handleClick: PropTypes.func.isRequired,
        handleKeyPress: PropTypes.func.isRequired

    };

    renderSearch() {
        const {
            input, handleChange, handleKeyPress
        } = this.props;

        return (
            <Field
              type={ FIELD_TYPE.text }
              attr={ {
                  id: 'blogSearch',
                  name: 'blogSearch',
                  defaultValue: input,
                  placeholder: __('Search posts here...'),
                  'aria-label': __('Search posts here...')
              } }
              events={ {
                  onChange: handleChange,
                  onKeyPress: handleKeyPress
              } }
            />
        );
    }

    renderActions() {
        const {
            handleClick
        } = this.props;

        return (
            <button
              onClick={ handleClick }
              type="submit"
              mix={ { block: 'Button' } }
            >
                <SearchIcon />
            </button>
        );
    }

    renderFormBody() {
        return (
            <div block="FieldForm" elem="Body">
                <div block="FieldForm" elem="Fieldset">
                    { this.renderSearch() }
                </div>
                { this.renderActions() }
            </div>
        );
    }

    render() {
        return (
            <div className="widget block blog-search">
                <div className="block-content">
                    { super.render() }
                </div>
            </div>
        );
    }
}

export default SidebarSearchComponent;

import TextPlaceholder from 'Component/TextPlaceholder';
import {
    SearchItem as SourceSearchItem
} from 'SourceComponent/SearchItem/SearchItem.component';

import './SearchPatchItem.style';

/** @namespace Scandipwa/Component/SearchPatchItem/Component */
export class SearchPatchItemComponent extends SourceSearchItem {
    renderContent() {
        const { product: { sku } } = this.props;

        return (
            <figcaption block="SearchItem" elem="Content">
                { this.renderCustomAttribute() }
                <h4 block="SearchItem" elem="Title" mods={ { isLoaded: !!sku } }>
                    <TextPlaceholder content={ sku } length="long" />
                </h4>
            </figcaption>
        );
    }

    renderLink() {
        return (
                <figure
                  block="SearchItem"
                  elem="Wrapper"
                >
                    { this.renderContent() }
                </figure>
        );
    }
}

export default SearchPatchItemComponent;

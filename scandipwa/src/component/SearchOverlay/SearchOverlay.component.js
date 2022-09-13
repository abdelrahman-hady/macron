import SearchItem from 'Component/SearchItem';
import {
    SearchOverlay as SourceSearchOverlay
} from 'SourceComponent/SearchOverlay/SearchOverlay.component';

// import SearchPatchItem from '../SearchPatchItem/SearchPatchItem.component';

/** @namespace Scandipwa/Component/SearchOverlay/Component */
export class SearchOverlayComponent extends SourceSearchOverlay {
    renderSearchItem(product, i) {
        // const { attributes:
        //     { is_patch = {} } } = product;
        //     const attribute_options = attributes !== [] ? is_patch.attribute_value : null;
        // const { attributes } = product;

        // const test = attributes !== undefined ? attributes.is_patch : 'not yet';
        console.log('ccheck products', product);

        // if (product) {
        //     <SearchPatchItem
        //       product={ product }
        //       key={ i }
        //     />;

        //     console.log('ccheck products WAS RENDERED');
        // }

        return (
            <SearchItem
              product={ product }
              key={ i }
            />
        );
    }
}

export default SearchOverlayComponent;

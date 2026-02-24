declare module 'fslightbox-react' {
    import React from 'react';

    interface FsLightboxProps {
        toggler?: boolean;
        sources?: string[];
        slide?: number;
        sourceIndex?: number;
        disableThumbs?: boolean;
        disableLocalStorage?: boolean;
        loadOnlyCurrentSource?: boolean;
        onClose?: () => void;
        onInit?: () => void;
        onOpen?: () => void;
        onShow?: () => void;
        onSlideChange?: (index: number) => void;
    }

    const FsLightbox: React.FC<FsLightboxProps>;
    export default FsLightbox;
}

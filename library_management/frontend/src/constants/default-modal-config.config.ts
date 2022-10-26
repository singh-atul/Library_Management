import { GeneralModalConfig } from "../../../models";

export const defaultModalConfig: GeneralModalConfig = {
    title: 'Modal',
    show: false,
    controls: 'closeOnly',
    size: 'lg',
    handleClose: () => {},
};
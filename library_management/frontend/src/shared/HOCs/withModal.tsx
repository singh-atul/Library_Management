import React from 'react'
import { GeneralModalConfig } from '../../../../models';
import { GeneralModal } from '../Modal/GeneralModal';

interface Args {
    Component: React.FC<any>,
    componentProps?: {[key: string]: any};
    modalConfig: GeneralModalConfig;
}

const withModal =({ Component, componentProps, modalConfig }: Args)  => (
    <GeneralModal {...modalConfig} >
        <Component {...componentProps} />
    </GeneralModal>
);

export default withModal;

/* Copyright (c) 2020 IceRock MAG Inc. Use of this source code is governed by the Apache 2.0 license. */

import { FC } from 'react';
import { IEntityField } from '../../../application';
interface RegionData {
    regionId: number | null;
    region: {
        id: number;
        name: string;
    };
}
interface IProps {
    label: string;
    data: RegionData;
    value: any;
    fields: IEntityField[];
    error: string;
    options: {
        getRegionsUrl: string;
    };
    isEditing?: boolean;
    handler: (val: any) => void;
    withToken: (req: any, args: any) => any;
}
declare const RegionSelectField: FC<IProps>;
export { RegionSelectField };
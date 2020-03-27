import { FC, HTMLAttributes } from 'react';
declare type IProps = HTMLAttributes<HTMLDivElement> & {
    field: string;
    active?: boolean;
    direction?: 'desc' | 'asc';
    onSortChange: (field: string) => void;
};
declare const EntityHeadSortable: FC<IProps>;
export { EntityHeadSortable };
export type CrudlFilterComponentProps = {
  label: string;
  name: string;
  value: any;
  onChange: (field: string, val: any) => void;
  onReset: (field: string) => void;
};

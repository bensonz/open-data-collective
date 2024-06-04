export interface IAlertAction {
  text: string;
  className?: string;
  onClick: (e?: any) => Promise<boolean>;
}
export interface IAppDialogProps {
  open: boolean;
  loading?: boolean;
  setOpen: (open: boolean) => void;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  body?: string | React.ReactNode;
  actions: IAlertAction[];
}

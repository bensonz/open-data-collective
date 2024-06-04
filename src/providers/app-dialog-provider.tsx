import { createContext, useContext, useState } from "react";

import { IAlertAction, IAppDialogProps } from "@/components/app-dialog/types";

interface IAppDialogState extends IAppDialogProps {
  show: (props: TDialogOptions) => void;
  hide: () => void;
}

export const AppDialogContext = createContext<IAppDialogState | null>(null);

/**
 * usage
 * ```tsx
 * const { show, hide } = useAppDialog();
 * show({
 *  title: "Are you sure?",
 *  description: "This action cannot be undone",
 *  actions: [
 *  {
 *    text: "Yes",
 *    onClick: () => {
 *    // do something
 *    return true;
 *  },
 * },
 * ```
 * @returns {IAppDialogState} AppDialogState
 */
export const useAppDialog = () => {
  const context = useContext(AppDialogContext);
  if (!context) {
    throw new Error("useAppDialog must be used within AppDialogProvider");
  }
  return context;
};

type TDialogOptions = {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  body?: string | React.ReactNode;
  actions: IAlertAction[];
};

export const AppDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dialogState, setDialogState] = useState<TDialogOptions>({
    title: "Are you sure?",
    actions: [],
  });

  const show = (props: TDialogOptions) => {
    setDialogState(props);
    setOpen(true);
  };
  const hide = () => {
    setOpen(false);
  };

  const wrappedActions = dialogState.actions.map((action) => ({
    ...action,
    onClick: async (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      setLoading(true);
      const finishedSuccessfully = await action.onClick();
      setLoading(false);
      setOpen(!finishedSuccessfully);
      return finishedSuccessfully;
    },
  }));

  return (
    <AppDialogContext.Provider
      value={{
        show,
        hide,

        open,
        setOpen,
        loading,
        actions: wrappedActions,
        title: dialogState.title,
        description: dialogState.description,
        body: dialogState.body,
      }}
    >
      {children}
    </AppDialogContext.Provider>
  );
};

import { useState } from "react";
import { JsonValue } from "@prisma/client/runtime/library";

import { Textarea } from "../ui/textarea";

interface IMetadataTextProps {
  value: Record<string, string>;
  onValueSubmit: (value: Record<string, string>) => void;
}
export const MetadataText = ({ value, onValueSubmit }: IMetadataTextProps) => {
  const [values, setValues] = useState<Record<string, string>>(value);

  return <Textarea />;
};

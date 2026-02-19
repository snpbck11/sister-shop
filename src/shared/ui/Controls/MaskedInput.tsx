'use client'

import { Input } from "@/shared/ui";
import { IMaskInputProps, IMaskMixin } from "react-imask";
import { IInputProps } from "./shared/types";

type MaskedInputProps = IMaskInputProps<HTMLInputElement> & IInputProps;

export const MaskedInput = IMaskMixin<HTMLInputElement, MaskedInputProps>(
  ({ inputRef, ...props }) => {
    return <Input {...props} ref={inputRef} />;
  }
);
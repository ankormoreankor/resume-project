import type { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, SVGProps, VideoHTMLAttributes } from 'react';

export const enum DropdownType {
  single = 'single',
  multi = 'multi',
}

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Falsy = false | 0 | '' | null | undefined;

export type SpanElement = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
export type DivElement = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export type InputElement = DetailedHTMLProps<InputHTMLAttributes<Element>, Element>;
export type TextAreaElement = DetailedHTMLProps<React.TextareaHTMLAttributes<Element>, Element>;
export type VideoElement = DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;

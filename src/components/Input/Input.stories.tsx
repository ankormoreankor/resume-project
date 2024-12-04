import { IconExtended } from '../IconExtended/IconExtended';
import { CrossRoundFilledIcon, SearchSmallIcon } from '../icons';
import { InputFeedback } from '../InputFeedback/InputFeedback';
import { InputLabel } from '../InputLabel/InputLabel';

import { Input, inputType } from './Input';

import type { InputProps } from './Input';
import type { InputFeedbackProps } from '../InputFeedback/InputFeedback';
import type { InputLabelProps } from '../InputLabel/InputLabel';
import type { TooltipProps } from '../Tooltip/Tooltip';
import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, PropsWithChildren } from 'react';

const meta = {
  title: 'Input',
  component: Input,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
  parameters: {
    chromatic: { delay: 2000, pauseAnimationAtEnd: true },
    viewports: [1200, 1200],
  },
} as Meta<typeof Input>;

export default meta;

type Story = StoryObj<InputProps>;

const inputPlaceholder = 'some_email@gmail.com';
const textareaPlaceholder = 'Input text';

const wrapperProps: InputLabelProps = { style: { '--input-label-max-width': '240px' } as CSSProperties };

const InputTemplate = ({
  labelProps,
  feedbackProps,
  ...inputProps
}: InputProps & { labelProps?: InputLabelProps; feedbackProps?: InputFeedbackProps }) => (
  <>
    <InputLabel {...{ ...labelProps, ...wrapperProps }}>
      <InputFeedback {...feedbackProps} variant={inputProps.variant}>
        <Input {...inputProps} />
      </InputFeedback>
    </InputLabel>
    <InputLabel {...{ ...labelProps, ...wrapperProps }}>
      <InputFeedback {...feedbackProps} variant={inputProps.variant}>
        <Input {...inputProps} debugProps={{ state: { isHovered: true } }} />
      </InputFeedback>
    </InputLabel>
    <InputLabel {...{ ...labelProps, ...wrapperProps }}>
      <InputFeedback {...feedbackProps} variant={inputProps.variant}>
        <Input {...inputProps} debugProps={{ state: { isFocused: true } }} />
      </InputFeedback>
    </InputLabel>
    <InputLabel {...{ ...labelProps, ...wrapperProps }}>
      <InputFeedback {...feedbackProps} variant={inputProps.variant} state={{ isDisabled: true }}>
        <Input {...inputProps} state={{ isDisabled: true }} />
      </InputFeedback>
    </InputLabel>
  </>
);

const Wrapper = ({ children }: PropsWithChildren) => (
  <div style={{ display: 'grid', alignItems: 'center', gap: 16, gridTemplateColumns: 'repeat(4, max-content)' }}>
    <span>Default</span>
    <span>Hovered</span>
    <span>Focused</span>
    <span>Disabled</span>
    {children}
  </div>
);

const Divider = () => (
  <>
    <div style={{ height: 30 }} />
    <div style={{ height: 30 }} />
    <div style={{ height: 30 }} />
    <div style={{ height: 30 }} />
  </>
);

const tooltipProps: TooltipProps = {
  content: 'Label tooltip',
  controlProps: { open: true },
};

const feedback = 'This is a feedback';

const inputDefaultProps: InputProps = {
  type: inputType.input,
  placeholder: inputPlaceholder,
};

export const Inputs = {
  render: () => (
    <Wrapper>
      <InputTemplate {...inputDefaultProps} />
      <InputTemplate {...inputDefaultProps} size="large" />
      <InputTemplate {...inputDefaultProps} feedbackProps={{ text: feedback }} variant="destructive" />
      <InputTemplate {...inputDefaultProps} feedbackProps={{ text: feedback }} size="large" variant="destructive" />
      <InputTemplate {...inputDefaultProps} labelProps={{ isOptional: true }} />
      <Divider />
      <InputTemplate
        {...inputDefaultProps}
        feedbackProps={{ text: feedback }}
        labelProps={{ text: 'Label', tooltipProps }}
      />
      <InputTemplate
        {...inputDefaultProps}
        feedbackProps={{ text: feedback }}
        labelProps={{ isOptional: true, text: 'Label' }}
      />
      <InputTemplate
        {...inputDefaultProps}
        labelProps={{ isOptional: true, text: 'Very very very very long label' }}
        feedbackProps={{ text: 'Very very very very very very very very very very long feedback' }}
      />
      <InputTemplate
        {...inputDefaultProps}
        feedbackProps={{ text: feedback }}
        startContent={<IconExtended icon={SearchSmallIcon} size={20} />}
      />
      <InputTemplate
        {...inputDefaultProps}
        feedbackProps={{ text: feedback }}
        endContent={<IconExtended icon={CrossRoundFilledIcon} size={16} />}
      />
      <InputTemplate
        {...inputDefaultProps}
        feedbackProps={{ text: feedback }}
        startContent={<IconExtended icon={SearchSmallIcon} size={20} />}
        endContent={<IconExtended icon={CrossRoundFilledIcon} size={16} />}
      />
    </Wrapper>
  ),
} satisfies Story;

const textareaDefaultProps: InputProps = {
  type: inputType.textarea,
  placeholder: textareaPlaceholder,
  minRows: 4,
  maxRows: 8,
};

export const Textareas = {
  render: () => (
    <Wrapper>
      <InputTemplate {...textareaDefaultProps} />
      <InputTemplate {...textareaDefaultProps} feedbackProps={{ text: feedback }} variant="destructive" />
      <InputTemplate {...textareaDefaultProps} labelProps={{ isOptional: true }} />
      <Divider />
      <InputTemplate
        {...textareaDefaultProps}
        feedbackProps={{ text: feedback }}
        labelProps={{ text: 'Label', tooltipProps }}
      />
      <InputTemplate
        {...textareaDefaultProps}
        feedbackProps={{ text: feedback }}
        labelProps={{ isOptional: true, text: 'Label' }}
      />
      <InputTemplate
        {...textareaDefaultProps}
        labelProps={{ isOptional: true, text: 'Very very very very long label' }}
        feedbackProps={{ text: 'Very very very very very very very very very very long feedback' }}
      />
    </Wrapper>
  ),
};

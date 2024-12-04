import { IconExtended } from '../IconExtended/IconExtended';
import { LabelIndicatorIcon } from '../icons';
import { InputFeedback } from '../InputFeedback/InputFeedback';
import { InputLabel } from '../InputLabel/InputLabel';

import { TagsInput, tagsInputMode } from './TagsInput';

import type { TagsInputProps } from './TagsInput';
import type { InputFeedbackProps } from '../InputFeedback/InputFeedback';
import type { InputLabelProps } from '../InputLabel/InputLabel';
import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, PropsWithChildren } from 'react';

const meta = {
  title: 'Tags Input',
  component: TagsInput,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} as Meta<typeof TagsInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const inputPlaceholder = 'some_email@gmail.com';

const wrapperProps: InputLabelProps = { style: { '--input-label-max-width': '240px' } as CSSProperties };

const InputTemplate = ({
  labelProps,
  feedbackProps,
  ...inputProps
}: TagsInputProps & { labelProps?: InputLabelProps; feedbackProps?: InputFeedbackProps }) => (
  <>
    <InputLabel {...{ ...labelProps, ...wrapperProps }}>
      <InputFeedback {...feedbackProps} variant={inputProps.variant}>
        <TagsInput {...inputProps} />
      </InputFeedback>
    </InputLabel>
    <InputLabel {...{ ...labelProps, ...wrapperProps }}>
      <InputFeedback {...feedbackProps} variant={inputProps.variant}>
        <TagsInput {...inputProps} debugProps={{ state: { isHovered: true } }} />
      </InputFeedback>
    </InputLabel>
    <InputLabel {...{ ...labelProps, ...wrapperProps }}>
      <InputFeedback {...feedbackProps} variant={inputProps.variant}>
        <TagsInput {...inputProps} debugProps={{ state: { isFocused: true } }} />
      </InputFeedback>
    </InputLabel>
    <InputLabel {...{ ...labelProps, ...wrapperProps }}>
      <InputFeedback {...feedbackProps} variant={inputProps.variant} state={{ isDisabled: true }}>
        <TagsInput {...inputProps} state={{ isDisabled: true }} />
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

const feedback = 'This is a feedback';

const inputDefaultProps: TagsInputProps = {
  inputProps: { placeholder: inputPlaceholder, onEscapeKeydown: () => console.log('Escape keydown') },
  tags: [
    { id: '1', title: 'Tag_1', leftContent: '🔥', leftContentValue: '#add8e6' },
    { id: '2', title: 'Tag_2', leftContent: '🚀', leftContentValue: '#663399' },
    { id: '3', title: 'Tag_3', leftContent: '🌈', leftContentValue: '#8fbc8f' },
  ],
};

const inputPropsWithDifferentTags: TagsInputProps = {
  inputProps: { placeholder: inputPlaceholder },
  tags: [
    { id: '1', title: 'Tag_1' },
    { id: '2', title: 'Tag_2' },
    {
      id: '3',
      title: 'Taaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaag_3',
      leftContent: <IconExtended icon={LabelIndicatorIcon} color="#8fbc8f" />,
    },
    { id: '4', title: 'Tag_4' },
    { id: '5', title: 'Tag_4', leftContent: <IconExtended icon={LabelIndicatorIcon} color="#bcabca" /> },
  ],
};

export const Inputs = {
  render: () => (
    <Wrapper>
      <InputTemplate
        inputProps={{ placeholder: inputPlaceholder }}
        onTagsChange={(tags) => console.log('tags: ', tags.map((t) => t.title).join(', '))}
      />
      <InputTemplate tagCommonProps={{ size: 'medium' }} inputProps={{ placeholder: inputPlaceholder }} />
      <InputTemplate inputProps={{ placeholder: inputPlaceholder }} style={{ '--input-height': '96px' } as CSSProperties} />
      <InputTemplate {...inputDefaultProps} style={{ '--input-height': '96px' } as CSSProperties} />
      <InputTemplate {...inputDefaultProps} />
      <InputTemplate {...inputDefaultProps} />
      <InputTemplate {...inputDefaultProps} feedbackProps={{ text: feedback }} variant="destructive" />
      <InputTemplate
        {...inputDefaultProps}
        feedbackProps={{ text: feedback }}
        labelProps={{ isOptional: true, text: 'Label' }}
      />
      <InputTemplate {...inputPropsWithDifferentTags} />
    </Wrapper>
  ),
} satisfies Story;

export const WithButton = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <TagsInput
        {...inputDefaultProps}
        mode={tagsInputMode.buttonPressInput}
        onTagEdit={(tag) => console.log(`Tag with id ${tag.id} was edited`)}
        tagLeftContentDropdownProps={{
          triggerProps: { variant: 'transparent', icon: LabelIndicatorIcon, size: 'tiny', iconProps: { size: 24 } },
          items: [
            { value: '#add8e6', label: 'Light Blue' },
            { value: '#663399', label: 'Rebecca Purple' },
            { value: '#8fbc8f', label: 'Dark Sea Green' },
          ],
        }}
        onTagCreated={(tag) => console.log('tag: ', tag)}
      />
    </div>
  ),
};

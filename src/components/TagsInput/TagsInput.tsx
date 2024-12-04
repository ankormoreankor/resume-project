import classNames from 'classnames';
import { isEqual, omit } from 'lodash';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { keyboardKey, type KeyboardKey } from '../../enums';
import { checkIfHexColor } from '../../helpers';
import { mergeRefs } from '../../helpers/mergeUtils';
import { Button } from '../Button/Button';
import { DropdownMenu, type DropdownMenuProps } from '../DropdownMenu/DropdownMenu';
import { PlusIcon } from '../icons';
import { InputWrapper } from '../InputWrapper/InputWrapper';
import { ResizableTextarea } from '../ResizableTextarea/ResizableTextarea';
import { Tag } from '../Tag/Tag';

import scss from './TagsInput.module.scss';

import type { InputWrapperProps } from '../InputWrapper/InputWrapper';
import type { ResizableTextareaProps } from '../ResizableTextarea/ResizableTextarea';
import type { TagProps } from '../Tag/Tag';
import type { ChangeEvent, KeyboardEvent, KeyboardEventHandler, MouseEvent } from 'react';

const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const tagsInputMode = {
  textInput: 'textInput',
  buttonPressInput: 'buttonPressInput',
  noInput: 'noInput',
} as const;

export type TagsInputMode = (typeof tagsInputMode)[keyof typeof tagsInputMode];

export interface TagInputItem extends Pick<TagProps, 'leftContent'> {
  id: string;
  /**
   * Tag title
   */
  title: string;
  /**
   * Can be selected from dropdown or used to set a dropdown value
   */
  leftContentValue?: string;
  /**
   * Can be used to add or reassign some dropdown trigger props
   */
  leftContentDropdownProps?: DropdownMenuProps['triggerProps'];
  /**
   * If true tag will be displayed with line-through
   */
  isInvalid?: boolean;
}

export interface TagsInputProps extends InputWrapperProps {
  /**
   * Tags input items
   */
  tags?: TagInputItem[];
  /**
   * Tags input mode. If set to 'view' tags will be displayed as disabled and without input
   */
  mode?: TagsInputMode;
  /**
   * Tag common props
   */
  tagCommonProps?: Omit<TagProps, 'id' | 'leftContent'>;
  /**
   * Tag left content dropdown props
   */
  tagLeftContentDropdownProps?: DropdownMenuProps;
  /**
   * Input props
   */
  inputProps?: ResizableTextareaProps & {
    /**
     * Tags input value
     */
    value?: string;
    /**
     * Tags input value
     */
    defaultValue?: string;
    onEscapeKeydown?: KeyboardEventHandler<HTMLInputElement>;
  };
  /**
   * Separators are used in keydown event to split the input text into tags
   */
  separators?: KeyboardKey[];
  /**
   * Callback is called when tags change
   */
  onTagsChange?: (tags: TagInputItem[]) => void;
  /**
   * Callback is called when tag is deleted
   */
  onTagDelete?: (tag: TagInputItem) => void;
  /**
   * Callback is called when tag editing is finished, the new data will be passed
   */
  onTagEdit?: (tag: TagInputItem) => void;
  /**
   * Callback is called when new tag is created
   */
  onTagCreated?: (tag: TagInputItem) => void;
  /**
   * If true, the tag will not be deleted on delete button click, only the callback will be called
   */
  isPreventDefaultDeleting?: boolean;
}

export const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
  (
    {
      mode = tagsInputMode.textInput,
      tags: defaultTags = [],
      state,
      variant,
      className,
      debugProps,
      inputProps: {
        value: valueProp,
        defaultValue: defaultValueProp,
        onChange: onChangeProp,
        onKeyDown: onKeyDownProp,
        onKeyUp: onKeyUpProp,
        onEscapeKeydown,
        ...inputProps
      } = {},
      tagLeftContentDropdownProps,
      isPreventDefaultDeleting = false,
      separators = [
        keyboardKey.Semicolon,
        keyboardKey.NewLine,
        keyboardKey.Comma,
        keyboardKey.Space,
        keyboardKey.Enter,
        keyboardKey.Tab,
      ],
      tagCommonProps,
      onTagsChange,
      onTagCreated,
      onTagDelete,
      onTagEdit,
      ...restProps
    },
    ref,
  ) => {
    const [leftContentValue, setLeftContentValue] = useState<string>(tagLeftContentDropdownProps?.items?.[0]?.value || '');
    const [editingTagId, setEditingTagId] = useState<string | null>(null);
    const [inputText, setInputText] = useState<string>(valueProp || defaultValueProp || '');
    const [isNewTag, setIsNewTag] = useState(false);
    const [tags, setTags] = useState<TagInputItem[]>(defaultTags);

    const prevDefaultTagsRef = useRef<TagInputItem[]>(defaultTags);
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    const inputLocalRef = useRef<HTMLInputElement>(null);
    const prevTagsRef = useRef<TagInputItem[]>();
    const inputRef = mergeRefs<HTMLInputElement>(inputLocalRef, ref);

    const isEditMode = mode === tagsInputMode.textInput;
    const isButtonPressMode = mode === tagsInputMode.buttonPressInput;
    const isNoInputMode = mode === tagsInputMode.noInput;

    const seps = isButtonPressMode ? separators.filter((sep) => sep !== keyboardKey.Space) : separators;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeProp?.(e);

      const { value } = e.target;
      setInputText(value);
    };

    const handleEditTag = (id: string, data: Omit<TagInputItem, 'id' | 'title'> & { title?: string }) => {
      const updatingTag = tags.find((tag) => tag.id === id) as TagInputItem;
      setTags((prevState) => prevState.map((tag) => (tag.id === id ? { ...tag, ...data } : tag)));
      onTagEdit?.({ ...updatingTag, ...data });
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      const key = e.key as KeyboardKey;
      const trimmedInput = inputText.trim();
      const regex = new RegExp(seps.map((separator) => escapeRegExp(separator)).join('|'), 'g');
      const newTags = trimmedInput.split(regex).filter(Boolean);
      const title = newTags[0] as string;

      onKeyDownProp?.(e);

      if (seps.includes(key) && !newTags.length) {
        e.preventDefault();
        setInputText('');
        setEditingTagId(null);
      }

      if (seps.includes(key) && newTags.length) {
        if (key !== keyboardKey.Tab) {
          e.preventDefault();
        }

        if (editingTagId && !isNewTag) {
          handleEditTag(editingTagId, { title, leftContentValue });
        } else if (editingTagId && isNewTag) {
          const newTag = { id: editingTagId, title, leftContentValue };
          onTagCreated?.(newTag);
          setTags((prevState) => prevState.map((tag) => (tag.id === editingTagId ? newTag : tag)));
          setIsNewTag(false);
        } else {
          setTags((prevState) => [...prevState, ...newTags.map((tag) => ({ id: uuid(), title: tag }))]);
        }

        setInputText('');
        setEditingTagId(null);
      }

      if (key === keyboardKey.Esc && (trimmedInput.length || editingTagId)) {
        e.preventDefault();
        e.stopPropagation();
        setInputText('');
        setEditingTagId(null);

        if (isNewTag) {
          setTags((prevState) => prevState.filter((tag) => tag.id !== editingTagId));
          setIsNewTag(false);
        }
      }

      if (key === keyboardKey.Esc && trimmedInput.length === 0 && !editingTagId) {
        onEscapeKeydown?.(e);
      }

      if (key === keyboardKey.Backspace && !inputText.length && !editingTagId && tags.length && isKeyReleased) {
        e.preventDefault();
        const tagsCopy = [...tags];
        const poppedTag = tagsCopy.pop();

        setTags(tagsCopy);
        setInputText(poppedTag?.title || '');
      }

      setIsKeyReleased(false);
    };

    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyUpProp?.(e);
      setIsKeyReleased(true);
    };

    const deleteTag = (tag: TagInputItem) => {
      onTagDelete?.(tag);
      if (isPreventDefaultDeleting) return;
      setTags((prevState) => prevState.filter((item) => item.id !== tag.id));
    };

    const onWrapperClick = (e: MouseEvent<HTMLDivElement>) => {
      restProps.onClick?.(e);
      inputLocalRef.current?.focus();
    };

    useEffect(() => {
      const currentTagsString = JSON.stringify(tags.map((tag) => omit(tag, ['leftContent'])));
      const prevTagsString = JSON.stringify(prevTagsRef.current?.map((tag) => omit(tag, ['leftContent'])));

      if (prevTagsString === currentTagsString) return;

      onTagsChange?.(tags);
      prevTagsRef.current = tags;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tags]);

    useEffect(() => {
      if (!isEqual(defaultTags, prevDefaultTagsRef.current)) return;

      prevDefaultTagsRef.current = defaultTags;
      setTags(defaultTags);
    }, [defaultTags]);

    return (
      <InputWrapper
        {...restProps}
        onClick={onWrapperClick}
        className={classNames(scss.tagsInputRoot, className)}
        variant={variant}
        debugProps={debugProps}
        state={state}
        data-element="tags-input-container"
      >
        {tags.map(
          ({
            id,
            title,
            leftContent,
            leftContentDropdownProps,
            leftContentValue: itemLeftContentValue = '',
            isInvalid,
          }) => {
            const isInEditMode = editingTagId === id;
            const isHexColor = checkIfHexColor(itemLeftContentValue);

            const onDelete = () => deleteTag({ id, title, isInvalid });
            const onEdit = () => {
              setEditingTagId(id);
              setInputText(title);
              setLeftContentValue(itemLeftContentValue);
            };

            const getIconColor = () => {
              if (isInEditMode && leftContentValue) return leftContentValue;
              if (isHexColor) return itemLeftContentValue;
              return 'currentColor';
            };

            const isWithButtons = isNoInputMode || isInEditMode;

            let startContent = leftContent;

            if (tagLeftContentDropdownProps?.items?.length) {
              startContent = (
                <DropdownMenu
                  {...tagLeftContentDropdownProps}
                  popoverProps={{ align: 'start', ...tagLeftContentDropdownProps.popoverProps }}
                  items={tagLeftContentDropdownProps.items}
                  onCheckedChange={(value) => {
                    setLeftContentValue(value);

                    if (!editingTagId) {
                      handleEditTag(id, { leftContentValue: value });
                    }
                  }}
                  triggerProps={{
                    ...tagLeftContentDropdownProps.triggerProps,
                    ...leftContentDropdownProps,
                    className: classNames(
                      scss.leftContentDropdownTrigger,
                      tagLeftContentDropdownProps.triggerProps?.className,
                      leftContentDropdownProps?.className,
                    ),
                    iconProps: {
                      color: getIconColor(),
                      ...tagLeftContentDropdownProps.triggerProps?.iconProps,
                      ...leftContentDropdownProps?.iconProps,
                    },
                  }}
                />
              );
            }

            return (
              <Tag
                id={id}
                key={id}
                isFilled
                isHoverable={!isWithButtons}
                size="small"
                {...tagCommonProps}
                leftContent={startContent}
                state={{ isDeleted: isInvalid, isDisabled: state?.isDisabled }}
                onDelete={isWithButtons ? undefined : onDelete}
                onEdit={isWithButtons || isEditMode ? undefined : onEdit}
              >
                {!isInEditMode && title}

                {isInEditMode && (
                  <ResizableTextarea
                    {...inputProps}
                    placeholder={`${title ? title : 'Input tag title'}`}
                    value={inputText}
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    className={classNames(scss.input, scss[tagCommonProps?.size ?? 'small'])}
                    autoFocus
                  />
                )}
              </Tag>
            );
          },
        )}

        {isEditMode && (
          <ResizableTextarea
            {...inputProps}
            ref={inputRef}
            state={state}
            value={inputText}
            onKeyUp={onKeyUp}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={classNames(scss.input, scss[tagCommonProps?.size ?? 'small'])}
          />
        )}

        {isButtonPressMode && (
          <Button
            size="tiny"
            variant="secondary"
            className={scss.plusButton}
            icon={PlusIcon}
            iconProps={{ size: 20 }}
            onClick={() => {
              if (inputText) {
                setInputText('');
              }
              const id = uuid();

              setIsNewTag(true);
              setEditingTagId(id);
              setTags((prevState) => [...prevState, { id, title: inputText }]);
            }}
            data-element="tags-input-plus-button"
          />
        )}
      </InputWrapper>
    );
  },
);

TagsInput.displayName = 'TagsInput';

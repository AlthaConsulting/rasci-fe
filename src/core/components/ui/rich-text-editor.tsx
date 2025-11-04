"use client";

import {
  type Content,
  type Editor,
  EditorContent,
  useEditor,
} from "@tiptap/react";
import {
  CaretUpDown,
  ListBullets,
  TextB,
  TextItalic,
  TextUnderline,
} from "@phosphor-icons/react";
import { useRef, useCallback, memo, forwardRef } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import { cn } from "@altha/core/libs/utils";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Skeleton } from "./skeleton";

interface RichTextEditorProps {
  className?: string;
  editable?: boolean;
  editorClassName?: string;
  output?: "html" | "json" | "text";
  placeholder?: string;
  throttleDelay?: number;
  value?: Content;
  onBlur?: (content: Content) => void;
  onChange?: (content: Content) => void;
}

const getOutput = (
  editor: Editor,
  format: RichTextEditorProps["output"]
): object | string => {
  switch (format) {
    case "json":
      return editor.getJSON();
    case "html":
      return editor.isEmpty ? "" : editor.getHTML();
    default:
      return editor.getText();
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const lastRan = useRef(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      const handler = () => {
        if (Date.now() - lastRan.current >= delay) {
          callback(...args);
          lastRan.current = Date.now();
        } else {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            callback(...args);
            lastRan.current = Date.now();
          }, delay - (Date.now() - lastRan.current));
        }
      };

      handler();
    },
    [callback, delay]
  );
}

const EditorRef = forwardRef<HTMLDivElement, RichTextEditorProps>(
  (
    {
      className,
      editable,
      editorClassName,
      output = "html",
      placeholder = "Write something here...",
      throttleDelay = 0,
      value,
      onBlur,
      onChange,
    },
    ref
  ) => {
    const throttledSetValue = useThrottle(
      (value: Content) => onChange?.(value),
      throttleDelay
    );

    const handleUpdate = useCallback(
      (editor: Editor) => throttledSetValue(getOutput(editor, output)),
      [output, throttledSetValue]
    );

    const handleCreate = useCallback(
      (editor: Editor) => {
        if (value && editor.isEmpty) {
          editor.commands.setContent(value);
        }
      },
      [value]
    );

    const handleBlur = useCallback(
      (editor: Editor) => onBlur?.(getOutput(editor, output)),
      [output, onBlur]
    );

    const editor = useEditor(
      {
        editable,
        editorProps: {
          attributes: {
            class: cn(
              "w-full min-h-[140px] py-2 px-3 text-base md:text-sm outline-none shadow-xs",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              "prose prose-sm max-w-none selection:bg-primary selection:text-primary-foreground",
              editorClassName
            ),
          },
        },
        extensions: [
          Placeholder.configure({ placeholder: () => placeholder }),
          Underline.configure({}),
          StarterKit.configure({
            blockquote: false,
            code: false,
            codeBlock: false,
            horizontalRule: false,
            strike: false,
          }),
        ],
        immediatelyRender: false,
        onBlur: ({ editor }) => handleBlur(editor),
        onCreate: ({ editor }) => handleCreate(editor),
        onUpdate: ({ editor }) => handleUpdate(editor),
        shouldRerenderOnTransaction: false,
      },
      []
    );

    if (!editor) return <Skeleton className="w-full h-[192px] rounded-md" />;
    return (
      <div
        ref={ref}
        className={cn(
          "border rounded-md focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] transition-[color,box-shadow] peer-[[data-error=true]]:border-destructive",
          className
        )}
      >
        <EditorToolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    );
  }
);
EditorRef.displayName = "EditorRef";

function EditorToolbar({ editor }: { editor: Editor }) {
  return (
    <div className="flex items-center justify-between lg:justify-start gap-4 py-2 px-3 border-b">
      <div className="flex items-center gap-3">
        <Button
          className={cn("!size-9", editor?.isActive("bold") && "bg-muted")}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          type="button"
          variant="outline"
        >
        <TextB />
        
        </Button>
        <Button
          className={cn("!size-9", editor?.isActive("italic") && "bg-muted")}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          type="button"
          variant="outline"
        >
          <TextItalic />
        </Button>
        <Button
          className={cn("!size-9", editor?.isActive("underline") && "bg-muted")}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          type="button"
          variant="outline"
        >
          <TextUnderline />
        </Button>
        <Button
          className={cn(
            "!size-9",
            editor?.isActive("bulletList") && "bg-muted"
          )}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          type="button"
          variant="outline"
        >
          <ListBullets />
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {editor?.isActive("paragraph")
              ? "Paragraph"
              : editor?.isActive("heading", { level: 1 })
              ? "Heading 1"
              : editor?.isActive("heading", { level: 2 })
              ? "Heading 2"
              : "Heading 3"}
            <CaretUpDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => editor?.chain().focus().setParagraph().run()}
            className={cn(editor?.isActive("paragraph") && "bg-muted")}
          >
            Paragraph
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={cn(
              editor?.isActive("heading", { level: 1 }) && "bg-muted"
            )}
          >
            Heading 1
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={cn(
              editor?.isActive("heading", { level: 2 }) && "bg-muted"
            )}
          >
            Heading 2
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={cn(
              editor?.isActive("heading", { level: 3 }) && "bg-muted"
            )}
          >
            Heading 3
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const RichTextEditor = memo(EditorRef);

export { RichTextEditor };

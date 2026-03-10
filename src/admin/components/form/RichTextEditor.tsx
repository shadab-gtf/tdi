"use client";

import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, mergeAttributes, Node } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Label from "./Label";
import apiClient from "@/admin/hooks/apiClient";

interface RichTextEditorProps {
  label?: string;
  name: string;
  value?: string;
  required?: boolean;
  onChange: (html: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label,
  name,
  value,
  onChange,
  required,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [uploading, setUploading] = useState(false);


    const ContainerDiv = Node.create({
  name: "containerDiv",
  group: "block",
  content: "block+",

  parseHTML() {
    return [{ tag: "div.container" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { class: "container" }), 0];
  },
});

const ImgContainerDiv = Node.create({
  name: "imgContainerDiv",
  group: "block",
  content: "block+",

  parseHTML() {
    return [{ tag: "div.imgcontainer" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { class: "imgcontainer" }), 0];
  },
});

const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: false,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }).extend({
        inclusive: false, 
      }),
      Image,
      ContainerDiv,
    ImgContainerDiv,
    ],
    content: value ?? "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onSelectionUpdate: () => {
    forceUpdate();
    },
  });

  const uploadFile = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await apiClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data?.data?.url ?? null;
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};

  /* ---------------------- Image Upload ---------------------- */
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    const imageUrl = await uploadFile(file);

    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }

    event.target.value = ""; // reset input
  };

  /* ---------------------- PDF Upload ---------------------- */
  const handlePdfUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    const fileUrl = await uploadFile(file);

    if (fileUrl) {
  editor
  .chain()
  .focus()
  .insertContent(`<div><a href="${fileUrl}" download="${file.name}">${file.name}</a></div>`)
  .run();
    }

    event.target.value = ""; // reset input
  };

  /* ---------------------- Sync Edit Mode ---------------------- */
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value ?? "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  /* ---------------------- Link Apply ---------------------- */
  const applyLink = () => {
    if (!linkUrl) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    }

    setShowLinkInput(false);
    setLinkUrl("");
  };

 const insertContainer = () => {
  if (editor?.isActive("containerDiv")) {
    editor.chain().focus().lift("containerDiv").run();
  } else {
    editor
      ?.chain()
      .focus()
      .wrapIn("containerDiv")
      .run();
  }
};

const insertImgContainer = () => {
  if (editor?.isActive("imgContainerDiv")) {
    editor.chain().focus().lift("imgContainerDiv").run();
  } else {
    editor
      ?.chain()
      .focus()
      .wrapIn("imgContainerDiv")
      .run();
  }
};


  return (
    <div className="richtext-wrapper">

      {/* Hidden Inputs (Safe Placement) */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        hidden
        onChange={handleImageUpload}
      />

      <input
        type="file"
        accept="application/pdf"
        ref={pdfInputRef}
        hidden
        onChange={handlePdfUpload}
      />

      {label && (
        <Label name={name} label={label} required={required} />
      )}

      <div className="tiptap-container">

        {/* Toolbar */}
        <div className="tiptap-toolbar">

          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "active" : ""}
          >
            P
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "active" : ""}
          >
            Bold
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "active" : ""}
          >
            Italic
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "active" : ""
            }
          >
            H1
          </button>

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "active" : ""
            }
          >
            H2
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "active" : ""}
          >
            • List
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "active" : ""}
          >
            1. List
          </button>
         <button type="button" onClick={insertContainer} className={editor.isActive("containerDiv") ? "active" : ""}>
  Div Container
</button>
<button
  type="button"
  onClick={insertImgContainer}
  className={editor.isActive("imgContainerDiv") ? "active" : ""}
>
  Div ImgContainer
</button>
          {/* Link */}
          <div className="link-wrapper">
            <button
              type="button"
              onClick={() => setShowLinkInput((prev) => !prev)}
              className={editor.isActive("link") ? "active" : ""}
            >
              Link
            </button>

            {showLinkInput && (
              <div className="link-tooltip">
                <input
                  type="text"
                  placeholder="Enter URL"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
                <button type="button" onClick={applyLink}>
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Image */}
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? "Uploading..." : "Image"}
          </button>

          {/* PDF */}
          <button
            type="button"
            disabled={uploading}
            onClick={() => pdfInputRef.current?.click()}
          >
            {uploading ? "Uploading..." : "PDF"}
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
          >
            Undo
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
          >
            Redo
          </button>
        </div>

        {/* Editor */}
        <EditorContent editor={editor} className="tiptap-editor" />
      </div>
    </div>
  );
};

export default RichTextEditor;
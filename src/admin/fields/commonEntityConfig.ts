export interface TableRow {
  id: string;
  name?: string;
  logo?: string;
  alt?: string;
  [key: string]: any;
}
export interface TableColumn {
  key: string;
  label: string;
  render?: (row: any) => any;
}

export interface FieldConfig {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  col?: string;
  multiple?: boolean;
}
export interface ArrayFieldConfig extends FieldConfig {
  type: "array";
  fields: FieldConfig[];
  col?: string;
}

export interface EntityConfig {
  fields: (FieldConfig | ArrayFieldConfig)[];
  tableHead: TableColumn[];
}

export const COMMON_ENTITY_CONFIG: Record<string, EntityConfig> = {
  amenities: {
    fields: [
      { type: "text", name: "title", label: "Title", required: true },
      {
        type: "image",
        name: "image",
        label: "Image",
      },
      { type: "text", name: "alt", label: "Alt", col: "md:col-span-12" },
    ],

    tableHead: [
      { key: "title", label: "Title" },
      { key: "image", label: "Image" },
      { key: "alt", label: "Alt" },
    ],
  },

  platter: {
    fields: [
      { type: "text", name: "name", label: "Name", col: "md:col-span-12" },
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [{ type: "text", name: "heading", label: "Heading" }],
      },
      {
        type: "array",
        name: "description",
        label: "Description",
        col: "md:col-span-12",
        multiple: false,
        fields: [{ type: "text", name: "description", label: "Description" }],
      },
      {
        type: "image",
        name: "mobile_image",
        label: "Mobile Image",
        col: "md:col-span-12",
      },
      {
        type: "image",
        name: "desktop_image",
        label: "Desktop Image",
        col: "md:col-span-12",
      },

      {
        type: "array",
        name: "seoTags",
        label: "seoTags",
        col: "md:col-span-12",
        multiple: false,
        fields: [
          { type: "text", name: "meta_title", label: "meta_title" },
          { type: "text", name: "meta_keyword", label: "Meta Keywords" },
          { type: "text", name: "meta_description", label: "Meta Description" },
          { type: "textarea", name: "headData", label: "Head Data" },
          { type: "textarea", name: "bodyData", label: "Body Data" },
        ],
      },
    ],
    tableHead: [
      { key: "name", label: "Name" },
      { key: "seq", label: "Sequence" },
    ],
  },
  developer: {
    fields: [
      {
        type: "text",
        name: "fullName",
        label: "Full Name",
        col: "md:col-span-12",
      },
      {
        type: "array",
        name: "description",
        label: "Description",
        col: "md:col-span-12",
        multiple: false,
        fields: [
          {
            type: "text",
            name: "description",
            label: "Description",
          },
          {
            type: "text",
            name: "short_description",
            label: "Short Description",
          },
        ],
      },
    ],
    tableHead: [
      { key: "fullName", label: "Full Name" },
      {
        key: "description",
        label: "Description",
        render: (row: any) => row?.description?.description || "-",
      },
      {
        key: "short_description",
        label: "Short Description",
        render: (row: any) => row?.description?.short_description || "-",
      },
    ],
  },
  cities: {
    fields: [
      { type: "text", name: "name", label: "Name", col: "md:col-span-12" },
      { type: "image", name: "image", label: "Image", col: "md:col-span-12" },
      { type: "text", name: "alt", label: "Alt", col: "md:col-span-12" },
    ],
    tableHead: [
      { key: "name", label: "name" },
      { key: "image", label: "Image" },
      { key: "alt", label: "Alt" },
    ],
  },

  default: {
    fields: [{ type: "text", name: "name", label: "Name", required: true }],
    tableHead: [{ key: "name", label: "name" }],
  },
};

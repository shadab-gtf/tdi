export const projectFields = {
  basicDetails: [
    {
      type: "text",
      name: "projectName",
      label: "Project Name",
      required: true,
    },

    {
      type: "dropdown",
      name: "platterId",
      label: "Platter",
      fetchOptions: [],
      end_point: "/platter",
    },
    {
      type: "dropdown",
      name: "cityId",
      label: "City",
      fetchOptions: [],
      end_point: "/cities",
    },
    {
      type: "dropdown",
      name: "developerId",
      label: "Developer",
      fetchOptions: [],
      end_point: "/developer",
    },
    {
      type: "dropdown",
      name: "projectStatusId",
      label: "Project Status",
      fetchOptions: [],
      end_point: "/project-status",
    },
    {
      type: "dropdown",
      name: "typologyId",
      label: "Typology",
    },
    {
      type: "dropdown",
      name: "subTypologyId",
      label: "Sub Typology",
    },
    {
      type: "text",
      name: "location",
      label: "Location",
    },
    { type: "image", name: "logo", label: "Logo" },
    { type: "image", name: "mobile_image", label: "mobile Image" },
    { type: "image", name: "desktop_image", label: "desktop Image" },
    { type: "file", name: "brochure", label: "Brochure", isChunk: true },
    { type: "text", name: "alt", label: "Alt" },
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
    {
      type: "array",
      name: "otherDetails",
      label: "otherDetails",
      col: "md:col-span-12",
      multiple: false,
      fields: [
        { type: "text", name: "rera_no", label: "rera_no" },
        { type: "text", name: "rera_website", label: "rera_website" },
        { type: "text", name: "phone", label: "phone" },
      ],
    },
  ],
};

export const projectSectionsConfig = {
  defaultFields: [
    {
      type: "dropdown",
      name: "type",
      label: "Section Type",
      options: [],
    },
    {
      type: "array",
      name: "title",
      label: "Title",
      col: "md:col-span-12",
      multiple: false,
      fields: [{ type: "text", name: "heading", label: "Heading" }],
    },
  ],
  amenities: [
    {
      type: "dropdown",
      name: "type",
      label: "Section Type",
      options: [],
    },
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
  ],
  locationadvantage: [
    {
      type: "dropdown",
      name: "type",
      label: "Section Type",
      options: [],
    },
    {
      type: "array",
      name: "title",
      label: "Title",
      col: "md:col-span-12",
      multiple: false,
      fields: [{ type: "text", name: "heading", label: "Heading" }],
    },
    {
      type: "image",
      name: "image",
      label: " Image",
      col: "md:col-span-12",
    },
    {
      type: "text",
      name: "alt",
      label: "Alt",
      col: "md:col-span-12",
    },
    {
      type: "array",
      name: "list",
      label: "List",
      multiple: false,
      col: "md:col-span-12",
      fields: [
        { type: "text", name: "video_link", label: "video_link" },
        { type: "text", name: "iframe_link", label: "iframe_link" },
      ],
    },
  ],
};

export const projectSectionList = {
  banner: {
    endpoint: "project-banner",

    fields: [
      {
        type: "image",
        name: "mobile_image",
        label: "Mobile File",
      },
      {
        type: "image",
        name: "desktop_image",
        label: "Desktop File",
      },
      { type: "text", name: "alt", label: "Alt", col: "md:col-span-12" },
    ],
    table: {
      columns: [
        { key: "desktop_image", label: "desktop_image" },
        { key: "mobile_image", label: "mobile_image" },
        { key: "alt", label: "Alt" },
      ],
    },
  },
  highlight: {
    endpoint: "project-highlights",

    fields: [
      {
        type: "text",
        name: "title",
        label: "Title",
        required: true,
      },
      {
        type: "image",
        name: "image",
        label: "Icon",
      },
      { type: "text", name: "alt", label: "Alt", col: "md:col-span-12" },
    ],

    table: {
      columns: [{ key: "title", label: "Title" }],
    },
  },
  specification: {
    endpoint: "project-specifications",

    fields: [
      {
        type: "text",
        name: "title",
        label: "Title",
        required: true,
      },
      {
        type: "image",
        name: "image",
        label: "Icon",
      },
      { type: "text", name: "alt", label: "Alt", col: "md:col-span-12" },
    ],

    table: {
      columns: [{ key: "title", label: "Title" }],
    },
  },
  locationadvantage: {
    endpoint: "project-location",

    fields: [
      {
        type: "text",
        name: "distance",
        label: "Distance",
      },
      {
        type: "text",
        name: "designation",
        label: "Designation",
      },
    ],

    table: {
      columns: [
        { key: "distance", label: "Distance" },
        { key: "designation", label: "Designation" },
      ],
    },
  },
  amenities: {
    endpoint: "project-amenities",

    fields: [
      {
        type: "dropdown",
        name: "amenitiesId",
        label: "Amenities Logo",
        fetchOptions: [],
        end_point: "/amenities",
      },
    ],

    table: {
      columns: [
        {
          key: "amenities",
          label: "Title",
          render: (row: any) => row?.amenities?.title ?? "-",
        },
      ],
    },
  },
  gallery: {
    endpoint: "project-gallery",
    fields: [
      {
        type: "dropdown",
        name: "type",
        label: "Type",
        options: [
          { label: "Photograph", value: "photograph" },
          { label: "Renders", value: "renders" },
          { label: "Walkthrough", value: "walkthrough" },
          { label: "Construction", value: "construction" },
        ],
      },
      {
        type: "dropdown",
        name: "fileType",
        label: "file Type",
        options: [
          { label: "Image", value: "image" },
          { label: "Video", value: "video" },
          { label: "Link", value: "link" },
        ],
      },
      {
        type: "image",
        name: "mobile_image",
        label: "Mobile File",
        showIf: (fields: any) => fields.fileType === "image",
      },
      {
        type: "image",
        name: "desktop_image",
        label: "Desktop File",
        showIf: (fields: any) => fields.fileType === "image",
      },
      {
        type: "video",
        name: "video",
        label: "Video",
        showIf: (fields: any) => fields.fileType === "video",
      },
      {
        type: "image",
        name: "thumbnail",
        label: "Thumbnail",
        showIf: (fields: any) => fields.fileType !== "image",
      },
      {
        type: "text",
        name: "alt",
        label: "Alt",
        col: "md:col-span-12",
        showIf: (fields: any) => fields.fileType !== "link",
      },
      {
        type: "text",
        name: "link",
        label: "Link",
        col: "md:col-span-12",
        showIf: (fields: any) => fields.fileType === "link",
      },
    ],

    table: {
      columns: [
        { key: "type", label: "Type" },
        { key: "fileType", label: "File Type" },
        { key: "title", label: "Title" },
      ],
    },
  },
  floorPlan: {
    endpoint: "project-floorplan",

    fields: [
      {
        type: "dropdown",
        name: "type",
        label: "Type",
        options: [
          { label: "masterplan", value: "masterplan" },
          { label: "floorplan", value: "floorplan" },
          { label: "unitplan", value: "unitplan" },
        ],
      },
      {
        type: "array",
        name: "heading",
        label: "Heading",
        col: "md:col-span-12",
        multiple: false,
        fields: [
          { type: "text", name: "typology", label: "Typology" },
          { type: "text", name: "area", label: "Area" },
        ],
        showIf: (fields: any) => fields.type !== "masterplan",
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
      { type: "text", name: "alt", label: "Alt", col: "md:col-span-12" },
    ],

    table: {
      columns: [
        {
          key: "type",
          label: "Type",
        },
        {
          key: "heading",
          label: "Area",
          render: (row: any) => row?.heading?.area ?? "-",
        },
        {
          key: "heading",
          label: "Typology",
          render: (row: any) => row?.heading?.typology ?? "-",
        },
      ],
    },
  },
};

export const sectionListConfig = {
  about_cities: {
    cities: {
      fields: [
        { type: "text", name: "name", label: "Name", col: "md:col-span-12" },
        {
          type: "image",
          name: "image",
          label: "image",
          col: "md:col-span-12",
        },
        { type: "text", name: "alt", label: "Alt", col: "md:col-span-12" },
      ],
      table: {
        columns: [
          { key: "name", label: "Name" },
          { key: "image", label: "Image" },
          { key: "alt", label: "Alt" },
        ],
      },
      endpoint: "/cities",
    },
  },
  csr_community: {
    "csr-community": {
      fields: [
        {
          type: "text",
          name: "title",
          label: "Title",
          col: "md:col-span-12",
        },
        {
          type: "image",
          name: "icon",
          label: "Icon",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "alt",
          label: "alt",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "shortDescription",
          label: "Short Description",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "title", label: "Title" },
          { key: "icon", label: "Icon" },
          { key: "shortDescription", label: "Short Description" },
        ],
      },
      endpoint: "/csr-community",
    },
  },
  csr_events: {
    events: {
      fields: [
        {
          type: "text",
          name: "title",
          label: "Title",
          col: "md:col-span-12",
        },
        {
          type: "date",
          name: "dateAt",
          label: "Date",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "title", label: "Title" },
          { key: "dateAt", label: "Date" },
        ],
      },
      endpoint: "/events",
    },
  },
  csr_activities: {
    "csr-activity": {
      fields: [
        {
          type: "text",
          name: "question",
          label: "Question",
          col: "md:col-span-12",
        },
        {
          type: "textarea",
          name: "answer",
          label: "Answer",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "question", label: "Question" },
          { key: "answer", label: "Answer" },
        ],
      },
      endpoint: "/csr-activity",
    },
  },
  career_overview: {
    "career-gallery": {
      fields: [
        {
          type: "image",
          name: "desktop_image",
          label: "Desktop Image",
          col: "md:col-span-12",
        },
        {
          type: "image",
          name: "mobile_image",
          label: "Mobile Image",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "alt",
          label: "Alt",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "mobile_image", label: "Mobile Image" },
          { key: "desktop_image", label: "Desktop Image" },
          { key: "alt", label: "Alt" },
        ],
      },
      endpoint: "/career-gallery",
    },
  },
  career_jobs: {
    jobs: {
      fields: [
        {
          type: "text",
          name: "title",
          label: "Title",
          col: "md:col-span-12",
        },
        {
          type: "array",
          name: "jobApplication",
          label: "jobApplication",
          col: "md:col-span-12",
          multiple: false,
          fields: [
            { type: "text", name: "qualification", label: "Qualification" },
            { type: "text", name: "location", label: "Location" },
            { type: "text", name: "time", label: "Time" },
            { type: "text", name: "experience", label: "Experience" },
          ],
        },
        {
          type: "array",
          name: "description",
          label: "Description",
          col: "md:col-span-12",
          stringArray: true,
        },
        {
          type: "array",
          name: "skills",
          label: "Skills",
          col: "md:col-span-12",
          stringArray: true,
        },
      ],
      table: {
        columns: [
          { key: "title", label: "Title" },
          {
            key: "jobApplication",
            label: "Time",
            render: (row: any) => {
              return row.jobApplication?.time || "-";
            },
          },
          {
            key: "jobApplication",
            label: "Experience",
            render: (row: any) => {
              return row.jobApplication?.experience || "-";
            },
          },
          {
            key: "jobApplication",
            label: "Qualification",
            render: (row: any) => {
              return row.jobApplication?.qualification || "-";
            },
          },
        ],
      },
      endpoint: "/jobs",
    },
  },
  team_overview: {
    team: {
      fields: [
        {
          type: "text",
          name: "name",
          label: "Name",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "designation",
          label: "Designation",
          col: "md:col-span-12",
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
          type: "text",
          name: "alt",
          label: "Alt",
          col: "md:col-span-12",
        },
        {
          type: "image",
          name: "image",
          label: "Image",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "name", label: "Name" },
          { key: "designation", label: "Designation" },
          { key: "image", label: "Image" },
          { key: "alt", label: "Alt" },
        ],
      },
      endpoint: "/team",
    },
  },
  story_timeline: {
    timeline: {
      fields: [
        {
          type: "text",
          name: "year",
          label: "Year",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "title",
          label: "Title",
          col: "md:col-span-12",
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
      table: {
        columns: [
          { key: "year", label: "Year" },
          { key: "title", label: "Title" },
          {
            key: "description",
            label: "Description",
            render: (row: any) => {
              return row.description?.description || "-";
            },
          },
        ],
      },
      endpoint: "/timeline",
    },
  },
  ideas_meet_impact: {
    blogs: {
      fields: [
        {
          type: "text",
          name: "title",
          label: "Title",
          col: "md:col-span-12",
        },
        {
          type: "array",
          name: "description",
          label: "Description",
          col: "md:col-span-12",
          multiple: false,
          fields: [
            { type: "richtext", name: "description", label: "Description" },
          ],
        },
        {
          type: "image",
          name: "desktop_image",
          label: "Desktop Image",
          col: "md:col-span-12",
        },
        {
          type: "image",
          name: "mobile_image",
          label: "Mobile Image",
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
          name: "seoTags",
          label: "SEO Tags",
          col: "md:col-span-12",
          multiple: false,
          fields: [
            { type: "text", name: "meta_title", label: "Meta Title" },
            {
              type: "text",
              name: "meta_description",
              label: "Meta Description",
            },
            { type: "text", name: "meta_keyword", label: "Keywords" },
          ],
        },
        {
          type: "date",
          name: "dateAt",
          label: "Date At",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "title", label: "Title" },
          { key: "desktop_image", label: "desktop_image" },
          {
            key: "description",
            label: "Description",
            render: (row: any) => {
              return row.description?.description || "-";
            },
          },
        ],
      },
      endpoint: "/blogs",
    },
  },
  latest_updates: {
    news: {
      fields: [
        {
          type: "text",
          name: "title",
          label: "Title",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "newsLink",
          label: "News Link",
          col: "md:col-span-12",
        },
        {
          type: "date",
          name: "dateAt",
          label: "Date At",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "title", label: "Title" },
          { key: "newsLink", label: "News Link" },
          { key: "dateAt", label: "Date At" },
        ],
      },
      endpoint: "/news",
    },
  },
  purchase_faqs: {
    "buying-desk": {
      fields: [
        {
          type: "dropdown",
          name: "type",
          label: "Type",
          options: [
            {
              label: "per_post_purchase_faqs",
              value: "per_post_purchase_faqs",
              default: true,
            },
          ],
        },
        {
          type: "text",
          name: "question",
          label: "Question",
          col: "md:col-span-12",
        },
        {
          type: "richtext",
          name: "answer",
          label: "Answer",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "question", label: "Question" },
          { key: "answer", label: "Answer" },
        ],
      },
      endpoint: "/buying-desk",
      fetchendpoint: `/buying-desk/per_post_purchase_faqs/list`,
    },
  },
  nri_overview: {
    "buying-desk": {
      fields: [
        {
          type: "dropdown",
          name: "type",
          label: "Type",
          options: [
            {
              label: "nri_overview",
              value: "nri_overview",
              default: true,
            },
          ],
        },
        {
          type: "text",
          name: "question",
          label: "Question",
          col: "md:col-span-12",
        },
        {
          type: "richtext",
          name: "answer",
          label: "Answer",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "question", label: "Question" },
          { key: "answer", label: "Answer" },
        ],
      },
      endpoint: "/buying-desk",
      fetchendpoint: `/buying-desk/nri_overview/list`,
    },
  },
  why_eldeco: {
    "buying-desk": {
      fields: [
        {
          type: "dropdown",
          name: "type",
          label: "Type",
          options: [
            {
              label: "why_eldeco",
              value: "why_eldeco",
              default: true,
            },
          ],
        },
        {
          type: "text",
          name: "question",
          label: "Question",
          col: "md:col-span-12",
        },
        {
          type: "richtext",
          name: "answer",
          label: "Answer",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "question", label: "Question" },
          { key: "answer", label: "Answer" },
        ],
      },
      endpoint: "/buying-desk",
      fetchendpoint: `/buying-desk/why_eldeco/list`,
    },
  },
  buying_guide: {
    "buying-desk": {
      fields: [
        {
          type: "dropdown",
          name: "type",
          label: "Type",
          options: [
            {
              label: "buying_guide",
              value: "buying_guide",
              default: true,
            },
          ],
        },
        {
          type: "text",
          name: "question",
          label: "Title",
          col: "md:col-span-12",
        },
        {
          type: "richtext",
          name: "answer",
          label: "Description",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "question", label: "Title" },
          { key: "answer", label: "Description" },
        ],
      },
      endpoint: "/buying-desk",
      fetchendpoint: `/buying-desk/buying_guide/list`,
    },
  },
  general_faqs: {
    "buying-desk": {
      fields: [
        {
          type: "dropdown",
          name: "type",
          label: "Type",
          options: [
            {
              label: "general_faqs",
              value: "general_faqs",
              default: true,
            },
          ],
        },
        {
          type: "text",
          name: "question",
          label: "Question",
          col: "md:col-span-12",
        },
        {
          type: "richtext",
          name: "answer",
          label: "Answer",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "question", label: "Question" },
          { key: "answer", label: "Answer" },
        ],
      },
      endpoint: "/buying-desk",
      fetchendpoint: `/buying-desk/general_faqs/list`,
    },
  },
  events: {
    "media-event": {
      fields: [
        {
          type: "text",
          name: "title",
          label: "Title",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "shortDescription",
          label: "Short Description",
          col: "md:col-span-12",
        },
        {
          type: "image",
          name: "thumbnail",
          label: "Thumbnail",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "alt",
          label: "Alt",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "year",
          label: "Year",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "link",
          label: "Link",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "title", label: "Title" },
          { key: "shortDescription", label: "Description" },
          { key: "thumbnail", label: "Thumbnail" },
          { key: "alt", label: "Alt" },
        ],
      },
      endpoint: "/media-event",
    },
  },
  awards: {
    awards: {
      fields: [
        {
          type: "text",
          name: "title",
          label: "Title",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "year",
          label: "Year",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "projectName",
          label: "Project Name",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "eventName",
          label: "Event Name",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "title", label: "Title" },
          { key: "year", label: "Year" },
          { key: "projectName", label: "Project Name" },
          { key: "eventName", label: "Event Name" },
        ],
      },
      endpoint: "/awards",
    },
  },
  testimonial: {
    testimonial: {
      fields: [
        {
          type: "dropdown",
          name: "platterId",
          label: "Platter",
          options: [],
        },
        {
          type: "dropdown",
          name: "type",
          label: "Type",
          options: [
            {
              label: "image",
              value: "image",
            },
            {
              label: "video",
              value: "video",
            },
          ],
        },
        {
          type: "text",
          name: "name",
          label: "Name",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "project",
          label: "Project",
          col: "md:col-span-12",
        },
        {
          type: "image",
          name: "image",
          label: "Image",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "alt",
          label: "Alt",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "video_url",
          label: "video_url",
          col: "md:col-span-12",
          showIf: (fields: any) => fields.type === "video",
        },
        {
          type: "video",
          name: "Video",
          label: "video",
          col: "md:col-span-12",
          showIf: (fields: any) => fields.type === "video",
        },
        {
          type: "text",
          name: "description",
          label: "description",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "type", label: "Type" },
          { key: "name", label: "Name" },
          { key: "project", label: "Project" },
        ],
      },
      endpoint: "/testimonial",
    },
  },
  press_release: {
    "media-coverage": {
      fields: [
        {
          type: "dropdown",
          name: "mediaType",
          label: "Media Type",
          options: [
            {
              label: "online",
              value: "Online",
            },
            {
              label: "offline",
              value: "Offline",
            },
            {
              label: "magazine",
              value: "Magazine",
            },
          ],
        },
        {
          type: "dropdown",
          name: "fileType",
          label: "File Type",
          options: [
            {
              label: "image",
              value: "Image",
            },
            {
              label: "videoLink",
              value: "Video Link",
            },
            {
              label: "link",
              value: "Link",
            },
          ],
        },
        {
          type: "text",
          name: "title",
          label: "Title",
          col: "md:col-span-12",
        },
        {
          type: "date",
          name: "dateAt",
          label: "Date At",
          col: "md:col-span-12",
        },
        {
          type: "image",
          name: "logo",
          label: "Logo",
          col: "md:col-span-12",
        },
        {
          type: "image",
          name: "mediaImage",
          label: "Image",
          col: "md:col-span-12",
          showIf: (fields: any) => fields.fileType === "Image",
        },
        {
          type: "image",
          name: "thumbnail",
          label: "thumbnail",
          col: "md:col-span-12",
          showIf: (fields: any) => fields.fileType !== "Image",
        },
        {
          type: "text",
          name: "alt",
          label: "Alt",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "link",
          label: "Link",
          col: "md:col-span-12",
          showIf: (fields: any) => fields.fileType !== "Image",
        },
      ],
      table: {
        columns: [
          { key: "mediaType", label: "Media Type" },
          { key: "fileType", label: "File Type" },
          { key: "title", label: "Title" },
          { key: "is_home", label: "Is Home" },
        ],
      },
      endpoint: "/media-coverage",
    },
  },
  "media-kit": {
    "media-kit": {
      fields: [
        {
          type: "image",
          name: "logo",
          label: "Logo",
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
          name: "listKit",
          label: "List",
          col: "md:col-span-12",
          fields: [
            { type: "text", name: "key", label: "Key" },
            { type: "file", name: "file", label: "File" },
          ],
        },
      ],
      table: {
        columns: [
          { key: "logo", label: "Logo" },
          { key: "alt", label: "Alt" },
        ],
      },
      endpoint: "/media-kit",
    },
  },
  "media-file": {
    "media-file": {
      fields: [
        {
          type: "file",
          name: "file",
          label: "File",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "title",
          label: "Title",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "file", label: "File" },
          { key: "title", label: "Title" },
        ],
      },
      endpoint: "/media-file",
    },
  },
  news_letter: {
    newsletter: {
      fields: [
        {
          type: "text",
          name: "year",
          label: "Year",
          col: "md:col-span-12",
        },
        {
          type: "image",
          name: "thumbnail",
          label: "Thumbnail",
          col: "md:col-span-12",
        },
        {
          type: "file",
          name: "file",
          label: "Pdf File",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "alt",
          label: "Alt",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [
          { key: "year", label: "Year" },
          { key: "file", label: "Pdf File" },
          { key: "thumbnail", label: "Thumbnail" },
          { key: "alt", label: "Alt" },
        ],
      },
      endpoint: "/newsletter",
    },
  },
  office_locations: {
    office_locations: {
      fields: [
        {
          type: "text",
          name: "city",
          label: "City",
          col: "md:col-span-12",
        },
        {
          type: "text",
          name: "officeName",
          label: "Office Name",
          col: "md:col-span-12",
        },
        {
          type: "array",
          name: "list",
          label: "List",
          col: "md:col-span-12",
          fields: [
            { type: "text", name: "location", label: "Location" },
            { type: "text", name: "iframe", label: "Location iframe" },
            { type: "richtext", name: "tel", label: "Tel" },
            { type: "richtext", name: "email", label: "Email" },
          ],
        },
      ],
      table: {
        columns: [
          { key: "city", label: "City" },
          { key: "officeName", label: "Office Name" },
        ],
      },
      endpoint: "/office-locations",
    },
  },
  ehil_overview: {
    "investor-tabs": {
      fields: [
        {
          type: "text",
          name: "title",
          label: "Title",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [{ key: "title", label: "Title" }],
      },
      endpoint: "/investor-tabs",
    },
  },
  eipl_overview: {
    "investor-tabs": {
      fields: [
        {
          type: "text",
          name: "title",
          label: "Title",
          col: "md:col-span-12",
        },
      ],
      table: {
        columns: [{ key: "title", label: "Title" }],
      },
      endpoint: "/investor-tabs",
    },
  },
};

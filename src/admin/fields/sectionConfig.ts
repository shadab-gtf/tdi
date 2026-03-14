export const sectionsConfig = {
  defaultFields: [],
  home: {
    home_city_kundli: [
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
    home_counter: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [{ type: "number", name: "number", label: "Number" }, { type: "text", name: "number_sign", label: "Number Sign " }, { type: "text", name: "heading", label: "Title " }],
      },



      // {
      //   type: "array",
      //   name: "list",
      //   label: "List",
      //   col: "md:col-span-12",
      //   fields: [
      //     { type: "text", name: "icon", label: "Icon" },
      //     { type: "text", name: "number", label: "Number" },
      //     { type: "text", name: "heading", label: "Heading" },
      //   ],
      // },
    ],
    home_livings: [
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
    home_properties: [
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
    home_awards: [
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
    home_why_kundli: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [{ type: "text", name: "heading", label: "Heading" }],
      }
    ],
    home_brands: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [{ type: "text", name: "heading", label: "Heading" }, { type: "text", name: "sub_heading", label: "Sub Heading" }],
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
    latest_updates: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [{ type: "text", name: "heading", label: "Heading" },],
      },
    ],

    // home_press_release: [
    //   {
    //     type: "array",
    //     name: "title",
    //     label: "Title",
    //     col: "md:col-span-12",
    //     multiple: false,
    //     fields: [{ type: "text", name: "heading", label: "Heading" }],
    //   },
    //   {
    //     type: "array",
    //     name: "description",
    //     label: "Description",
    //     col: "md:col-span-12",
    //     multiple: false,
    //     fields: [{ type: "text", name: "description", label: "Description" }],
    //   },
    // ],
    // home_terra_grade: [
    //   {
    //     type: "array",
    //     name: "title",
    //     label: "Title",
    //     col: "md:col-span-12",
    //     multiple: false,
    //     fields: [{ type: "text", name: "heading", label: "Heading" }],
    //   },
    //   {
    //     type: "image",
    //     name: "desktop_file",
    //     label: "Desktop File",
    //     col: "md:col-span-12",
    //   },
    //   {
    //     type: "image",
    //     name: "mobile_file",
    //     label: "Mobile File",
    //     col: "md:col-span-12",
    //   },
    //   {
    //     type: "image",
    //     name: "logo",
    //     label: "Logo Image",
    //     col: "md:col-span-12",
    //   },
    // ],

    // home_our_projects: [
    //   {
    //     type: "array",
    //     name: "title",
    //     label: "Title",
    //     col: "md:col-span-12",
    //     multiple: false,
    //     fields: [
    //       { type: "text", name: "heading", label: "Heading" },
    //       { type: "text", name: "sub_heading", label: "Sub Heading" },
    //     ],
    //   },
    // ],
    // home_testimonial: [
    //   {
    //     type: "array",
    //     name: "title",
    //     label: "Title",
    //     col: "md:col-span-12",
    //     multiple: false,
    //     fields: [{ type: "text", name: "heading", label: "Heading" }],
    //   },
    // ],
  },
  "townships": {
    township_overview: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-6",
        multiple: false,
        fields: [{ type: "text", name: "heading", label: "Heading" }],
      },

      {
        type: "image",
        name: "desktop_image",
        label: "Desktop image",
        col: "md:col-span-6",
      },
      {
        type: "image",
        name: "mobile_image",
        label: "Mobile image",
        col: "md:col-span-6",
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
    township_trust: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [{ type: "text", name: "year", label: "Year" }, { type: "text", name: "heading", label: "Title" }],
      },
      {
        type: "array",
        name: "list",
        label: "List",
        col: "md:col-span-12",
        fields: [
          { type: "text", name: "number", label: "Number" },
          { type: "text", name: "heading", label: "Heading" },
          { type: "text", name: "icon", label: "Icon" },
        ],
      },
    ],
    township_leadership: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [
          { type: "text", name: "heading", label: "Heading" },
        ],
      },
    ],
    township_ourstory: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [
          { type: "text", name: "heading", label: "Small Heading" }, { type: "text", name: "sub_heading", label: "Heading" },
        ],
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
        name: "desktop_image",
        label: "Desktop image",
        col: "md:col-span-6",
      },
      {
        type: "image",
        name: "mobile_image",
        label: "Mobile image",
        col: "md:col-span-6",
      },

    ],
    township_city_kundli: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [
          { type: "text", name: "heading", label: "Small Heading" }, { type: "text", name: "sub_heading", label: "Heading" },
        ],
      },
    ],
    about_eldeco_group: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [{ type: "text", name: "heading", label: "Heading" }],
      },
      {
        type: "text",
        name: "external_link",
        label: "Video Link",
        col: "md:col-span-12",
      },
    ],
    about_vision: [
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
        name: "desktop_image",
        label: "Desktop image",
        col: "md:col-span-12",
      },
      {
        type: "image",
        name: "mobile_image",
        label: "Mobile image",
        col: "md:col-span-12",
      },
    ],
    about_mission: [
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
        name: "desktop_image",
        label: "Desktop image",
        col: "md:col-span-12",
      },
      {
        type: "image",
        name: "mobile_image",
        label: "Mobile image",
        col: "md:col-span-12",
      },
    ],
  },
  "media-center": {
    media_overview: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-6",
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
    media_coverage: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [{ type: "text", name: "heading", label: "Heading" },],
      },

    ]
  },
  "about-tdi": {
    tdi_infrastructure: [
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
        name: "desktop_image",
        label: "Desktop image",
        col: "md:col-span-4",
      },
      {
        type: "image",
        name: "mobile_image",
        label: "Mobile image",
        col: "md:col-span-4",
      },
      { type: "text", name: "alt", label: "Alt", col: "md:col-span-4" },
      { type: "text", name: "external_links", label: "External Link", col: "md:col-span-4" },



    ],
    tdi_infratech: [
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
        name: "desktop_image",
        label: "Desktop image",
        col: "md:col-span-4",
      },
      {
        type: "image",
        name: "mobile_image",
        label: "Mobile image",
        col: "md:col-span-4",
      },
      { type: "text", name: "alt", label: "Alt", col: "md:col-span-4" },
      { type: "text", name: "external_links", label: "External Link", col: "md:col-span-4" },



    ],
    tdi_infracorp: [
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
        name: "desktop_image",
        label: "Desktop image",
        col: "md:col-span-4",
      },
      {
        type: "image",
        name: "mobile_image",
        label: "Mobile image",
        col: "md:col-span-4",
      },
      { type: "text", name: "alt", label: "Alt", col: "md:col-span-4" },
      { type: "text", name: "external_links", label: "External Link", col: "md:col-span-4" },



    ],
  },

  "csr": {
    csr_overview: [
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
        fields: [
          {
            type: "text",
            name: "description",
            label: " Description",
          },
        ],
      }

    ],
    csr_activities: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [{ type: "text", name: "heading", label: "Heading" }],
      },
    ],

    csr_community: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [{ type: "text", name: "heading", label: "Heading" }],
      },
    ],
    csr_impact_gallery: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [{ type: "text", name: "small_title", label: "Small Title" }, { type: "text", name: "heading", label: "Heading" }],
      },

    ],

  },
  "career": {
    career_jobs: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [
          { type: "text", name: "heading", label: "Heading" },
          { type: "text", name: "sub_heading", label: "Sub Heading" },
        ],
      },
    ],
    career_overview: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [
          { type: "text", name: "heading", label: "Heading" },
          { type: "text", name: "sub_heading", label: "Sub Heading" },
        ],
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
    career_activities: [
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
        type: "array",
        name: "list",
        label: "Title",
        col: "md:col-span-12",
        stringArray: true,
      },
    ],
  },
  "our-team": {
    team_overview: [
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
  },
  "our-story": {
    story_overview: [
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
    story_timeline: [
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
  },
  "news": {
    latest_updates: [
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
  },

  "nri-overview": {
    nri_overview: [
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
  },
  "why-eldeco": {
    why_eldeco: [
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
  },
  events: {
    events: [
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
  },
  "buying-guide": {
    buying_guide: [
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
  },
  "faq": {
    faq: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [{ type: "text", name: "heading", label: "Heading" }],
      }
    ],
  },
  awards: {
    awards_overview: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-6",
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
    awards: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [{ type: "text", name: "heading", label: "Heading" }],
      },

    ],
  },
  testimonial: {
    testimonial: [
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
  },
  "press-release": {
    press_release: [
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
    "press-kit": [
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
    "media-file": [
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
    "media-contact": [
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
        name: "list",
        label: "List",
        col: "md:col-span-12",
        multiple: false,
        fields: [
          { type: "text", name: "name", label: "Name" },
          { type: "text", name: "address", label: "Address" },
          { type: "richtext", name: "contact", label: "contact" },
        ],
      },
    ],
  },
  "news-letter": {
    news_letter: [
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
  },
  blogs: {
    ideas_meet_impact: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [{ type: "text", name: "heading", label: "Heading" }],
      },
    ],
  },
  "contact-us": {
    get_in_touch: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [
          { type: "text", name: "heading", label: "Heading" },
          { type: "text", name: "sub_heading", label: "Sub Heading" },
        ],
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
        name: "desktop_image",
        label: "Desktop image",
        col: "md:col-span-12",
      },
      {
        type: "image",
        name: "mobile_image",
        label: "Mobile image",
        col: "md:col-span-12",
      },
    ],
    office_locations: [
      {
        type: "array",
        name: "title",
        label: "Title",
        col: "md:col-span-12",
        multiple: false,
        fields: [{ type: "text", name: "heading", label: "Heading" }],
      },
    ],
    contact_careers: [
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
        fields: [
          { type: "richtext", name: "description", label: "Description" },
        ],
      },
      {
        type: "image",
        name: "desktop_image",
        label: "Desktop image",
        col: "md:col-span-12",
      },
      {
        type: "image",
        name: "mobile_image",
        label: "Mobile image",
        col: "md:col-span-12",
      },
      {
        type: "array",
        name: "list",
        label: "List",
        col: "md:col-span-12",
        stringArray: true,
      },
    ],
    social_links: [
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
        name: "list",
        label: "Link List",
        col: "md:col-span-12",
        multiple: false,
        fields: [
          { type: "text", name: "instagram", label: "Instagram" },
          { type: "text", name: "fb", label: "Fb" },
          { type: "text", name: "twitter", label: "Twitter" },
          { type: "text", name: "linkedin", label: "linkedin" },
        ],
      },
    ],
  },
  "investor-relation": {
    ehil_overview: [
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
    eipl_overview: [
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
  },
  gallery: {
    gallery: [
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
  },
};

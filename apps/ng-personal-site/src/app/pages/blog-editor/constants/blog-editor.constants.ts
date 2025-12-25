// Form field names
export enum BlogFormField {
  Header = 'header',
  SubHeader = 'subHeader',
  Author = 'author',
  BodySections = 'bodySections',
  Body = 'body',
}

// Form field labels
export const BLOG_FORM_LABELS: Record<BlogFormField, string> = {
  [BlogFormField.Header]: 'Header',
  [BlogFormField.SubHeader]: 'Subheader',
  [BlogFormField.Author]: 'Author',
  [BlogFormField.BodySections]: 'Body Sections',
  [BlogFormField.Body]: 'Body',
};

// Form placeholders
export const BLOG_FORM_PLACEHOLDERS = {
  header: 'Enter header',
  subHeader: 'Enter subheader',
  author: 'Enter author',
  sectionHeader: 'Enter section header',
  sectionSubHeader: 'Enter section subheader',
} as const;

// Validation error templates
export const VALIDATION_ERRORS = {
  required: (fieldLabel: string) => `${fieldLabel} is required`,
  minLength: (fieldLabel: string, minLength: number) =>
    `${fieldLabel} must be at least ${minLength} characters`,
} as const;

// Modal titles
export const BLOG_MODAL_TITLES = {
  add: 'Add New Blog',
  edit: 'Edit Blog',
} as const;

// Button labels
export const BLOG_BUTTON_LABELS = {
  cancel: 'Cancel',
  reset: 'Reset',
  save: 'Save',
  add: 'Add',
  edit: 'Edit',
  delete: 'Delete',
  discard: 'Discard',
  remove: 'Remove',
  preview: 'Preview',
  back: 'Back',
  keepEditing: 'Keep Editing',
  addContentSection: 'Add Content Section',
} as const;

// Confirmation messages
export const BLOG_CONFIRMATION_MESSAGES = {
  discardChanges: 'Discard all changes?',
  resetForm: 'Reset all form fields?',
  deleteSection: 'Are you sure you want to remove this section?',
  deleteBlog: 'Are you sure you want to delete this blog?',
} as const;

// Section labels
export const BLOG_SECTION_LABELS = {
  contentSections: 'Content Sections',
  sectionHeader: 'Section Header',
  sectionSubHeader: 'Section Subheader',
  sectionContent: 'Section Content',
  newSection: 'New Section',
} as const;

// Table headers
export const BLOG_TABLE_HEADERS = {
  actions: 'Actions',
  title: 'Title',
  subtitle: 'Subtitle',
  author: 'Author',
  date: 'Date',
} as const;

// Empty state messages
export const BLOG_EMPTY_STATES = {
  noBlogs: 'No blogs found.',
} as const;

// Accessibility labels
export const BLOG_ARIA_LABELS = {
  previewBlog: 'Preview blog',
  editBlog: 'Edit blog',
  deleteBlog: 'Delete blog',
  returnToList: 'Return to blog list',
  addNewBlog: 'Add new blog',
} as const;

// Icon classes
export const BLOG_ICONS = {
  preview: 'fa-solid fa-eye',
  edit: 'fa-solid fa-pen-to-square',
  delete: 'fa-solid fa-trash',
  add: 'fa-solid fa-plus',
} as const;

// Page titles
export const BLOG_PAGE_TITLES = {
  editor: 'Blog Editor',
  preview: 'Blog Preview',
} as const;

// Miscellaneous
export const BLOG_MISC = {
  dateNotAvailable: 'N/A',
} as const;

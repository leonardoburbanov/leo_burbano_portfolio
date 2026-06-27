/** GDG brand palette — https://developers.google.com/community/gdsc */
export const GDG = {
  black: '#1e1e1e',
  offWhite: '#f0f0f0',
  blue: '#4285f4',
  red: '#ea4335',
  yellow: '#fbbc04',
  green: '#34a853',
  halftoneBlue: '#57caff',
  halftoneRed: '#ff7daf',
  halftoneYellow: '#ffd427',
  halftoneGreen: '#5cdb6d',
  pastelBlue: '#c3ecf6',
  pastelRed: '#f8d8d8',
  pastelYellow: '#ffe7a5',
  pastelGreen: '#ccf6c5',
  subheadGray: '#5f6368',
} as const;

/** Rotating step-badge colors (blue → red → yellow → green). */
export const GDG_STEP_COLORS = [GDG.blue, GDG.red, GDG.yellow, GDG.green] as const;

export const INTENTIONS = {
  QUERY: 'query',
  ACTION: 'action',
} as const;

export const SOURCES = {
  NOTES: 'notes',
  MEMORIES: 'memories',
  OBSIDIAN: 'obsidian',
  CALENDAR: 'calendar',
  TODOS: 'todos',
  LINKS: 'links',
  UNKNOWN: 'unknown',
} as const;

export const ACTIONS = {
  SAVE_NOTE: 'saveNote',
  SAVE_MEMORY: 'saveMemory',
  SAVE_LINK: 'saveLink',
  SAVE_CALENDAR_EVENT: 'saveCalendarEvent',
  SAVE_OBSIDIAN_NOTE: 'saveObsidianNote',
  SAVE_TODO: 'saveTodo',
  UNKNOWN: 'unknown',
} as const;

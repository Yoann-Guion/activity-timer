# Changelog - Activity Timer

## [v0.8] - 2025-04-10
### Added
- Zustand slices for activity and timer to separate concerns
- Persistence in localStorage for activities via Zustand store
- Weekly reset functionality for activity progress

### Improved
- Renamed various components for clarity
- Reorganized imports and enhanced component structure across multiple files

### Fixed
- Correctly handled `Date` objects when deserialized from localStorage

## [v0.7] - 2025-04-08
### Added
- Activity details page with session interface
- Translations for activity details page
- Accessibility labels and translations for ActivityActions
- Updated legal notices
- LICENSE file

### Improved
- Refactored ActivityActions into a separate component and updated its usage in home, details and summary pages

### Fixed
- Updated pnpm-lock.yaml
- Updated Next.js version 
- Fixed related translation issues

## [v0.6] - 2025-04-04
### Added
- Legal notice page
- Confirmation dialog for activity deletion

### Improved
- Reorganized components
- Activity editing functionality and new utility functions for time conversion
- Better pause time calculation for the stopTimer

## [v0.5] - 2025-04-02
### Added
- Color for activities in timer page
- Stop functionality
- Pause and resume functionalities for timer
- Notification to block timer start if another one is already active
- Timer management with start from home and timer page
- Add toast notifications and weekly goal validation

### Fixed
- Removed get on the store (wasn't used yet)

## [v0.4] - 2025-04-01
### Added
- NewActivity page and update addActivity to use it
- README file in French and English
- deleteActivity function to the store interface
- Delete activity in homepage
- Display activities on summary page with translation
- Display activities on timer page
- Display activity after creation in homepage
- Activity creation

## [v0.3] - 2025-03-31
### Added
- Created zustand store and interface for activity

## [v0.2] - 2025-03-22
### Added
- Analytics component from vercel
- Transition effect when changing page
- Framer motion installation

### Improved
- Synced pnpm-lock.yaml with package.json
- Animation feature

### Fixed
- Removed unused import from navbar component

## [v0.1] - 2025-03-21
### Added
- Initial layout
- Home page
- Timer page
- New activity page
- Summary page
- Theme provider from shadcn
- Navbar and theme provider to the layout
- Tailwind configuration
- Zustand, uuid, lucide and shadcn components
- Added next-international library and configuration
- Permanent redirect to /fr

### Fixed
- Hydration problem because both layout had "theme" and "body"
- Mobile adaptation: removed theme toggle from top and added icon settings in navbar
- Language switcher button in navbar for desktop and mobile
- Favicon and layout problems with font and locales
- Updated navigation
- Fixed link and CSS

### Features
- Utility functions for the date and display the start and end of the week in summary page
- Switch button for dark-light mode
- Translation for English and French

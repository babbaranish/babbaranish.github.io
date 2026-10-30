/**
 * Inline script to prevent theme flash on page load.
 * Content is a hardcoded constant string — no user input, safe from XSS.
 */

// eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
const THEME_INIT_SCRIPT = '(function(){try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t);}catch(e){}})()';

export function ThemeScript() {
  // This uses dangerouslySetInnerHTML with a static constant string (no dynamic/user input).
  // It is required to prevent a flash of wrong theme before React hydrates.
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
    />
  );
}

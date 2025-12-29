# Rev Design System

## Design Principles

1. **Trust by Design** - Every element should reinforce credibility and safety
2. **Clarity** - Information should be easy to scan and understand
3. **Accessibility** - WCAG 2.1 AA compliance minimum
4. **Speed** - Fast interactions, minimal friction

---

## Color Palette

### Primary Colors

```css
--color-primary: #ff6a00; /* Energetic Orange */
--color-primary-dark: #e55f00; /* Hover state */
--color-primary-light: #ff8533; /* Light variant */
--color-primary-pale: #fff4ed; /* Background tint */
```

### Neutral Colors

```css
--color-black: #000000; /* Primary text */
--color-gray-900: #1a1a1a; /* Headings */
--color-gray-700: #4a4a4a; /* Body text */
--color-gray-500: #808080; /* Secondary text */
--color-gray-300: #d1d1d1; /* Borders */
--color-gray-100: #f5f5f5; /* Backgrounds */
--color-white: #ffffff; /* White */
```

### Semantic Colors

```css
--color-success: #10b981; /* Success states */
--color-warning: #f59e0b; /* Warning states */
--color-error: #ef4444; /* Error states */
--color-info: #3b82f6; /* Info states */
```

### Status Colors (Job Lifecycle)

```css
--color-status-pending: #f59e0b; /* Pending */
--color-status-accepted: #3b82f6; /* Accepted */
--color-status-in-repair: #8b5cf6; /* In Repair */
--color-status-ready: #10b981; /* Ready */
--color-status-completed: #059669; /* Completed */
```

---

## Typography

### Font Family

**Primary:** Inter (Google Fonts)  
**Fallback:** -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

--font-family-base: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
  Arial, sans-serif;
```

### Font Sizes

```css
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */
--text-5xl: 3rem; /* 48px */
```

### Font Weights

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights

```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

---

## Spacing

Based on 4px grid system:

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
```

---

## Border Radius

```css
--radius-sm: 0.25rem; /* 4px */
--radius-md: 0.5rem; /* 8px */
--radius-lg: 0.75rem; /* 12px - Primary buttons */
--radius-xl: 1rem; /* 16px */
--radius-2xl: 1.5rem; /* 24px */
--radius-full: 9999px; /* Circular */
```

---

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

---

## Components

### Buttons

#### Primary Button

```css
.btn-primary {
  background: var(--color-primary);
  color: var(--color-white);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}
```

#### Secondary Button

```css
.btn-secondary {
  background: var(--color-white);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--color-primary-pale);
}
```

#### Button Sizes

```css
.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
}

.btn-md {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
}
```

### Input Fields

```css
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-pale);
}

.input:error {
  border-color: var(--color-error);
}
```

### Cards

```css
.card {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
}

.badge-success {
  background: #d1fae5;
  color: #065f46;
}

.badge-warning {
  background: #fef3c7;
  color: #92400e;
}

.badge-error {
  background: #fee2e2;
  color: #991b1b;
}
```

### Status Indicators

```css
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
}

.status-pending .status-dot {
  background: var(--color-status-pending);
}

.status-accepted .status-dot {
  background: var(--color-status-accepted);
}

.status-in-repair .status-dot {
  background: var(--color-status-in-repair);
}

.status-ready .status-dot {
  background: var(--color-status-ready);
}

.status-completed .status-dot {
  background: var(--color-status-completed);
}
```

---

## Icons

**Icon Library:** Heroicons or Lucide React  
**Size:** 20px (default), 16px (small), 24px (large)

```tsx
import { WrenchIcon, UserIcon, MapPinIcon } from "@heroicons/react/24/outline";
```

---

## Responsive Breakpoints

```css
--breakpoint-sm: 640px; /* Mobile */
--breakpoint-md: 768px; /* Tablet */
--breakpoint-lg: 1024px; /* Desktop */
--breakpoint-xl: 1280px; /* Large Desktop */
--breakpoint-2xl: 1536px; /* Extra Large */
```

---

## Animation & Transitions

### Timing Functions

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Durations

```css
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
```

### Common Transitions

```css
.transition-all {
  transition: all var(--duration-normal) var(--ease-in-out);
}

.transition-colors {
  transition: color, background-color,
    border-color var(--duration-normal) var(--ease-in-out);
}

.transition-transform {
  transition: transform var(--duration-normal) var(--ease-in-out);
}
```

---

## Accessibility

### Focus States

```css
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Color Contrast

All text must meet WCAG 2.1 AA standards:

- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum

### Screen Reader Only

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## Usage Guidelines

### Do's ✅

- Use primary orange for main CTAs only
- Maintain 4px spacing grid
- Use Inter font family consistently
- Provide clear focus states
- Use semantic color for status indicators

### Don'ts ❌

- Don't use primary orange for backgrounds
- Don't mix spacing values outside the grid
- Don't use more than 3 font weights per page
- Don't rely on color alone for information
- Don't use custom shadows outside the system

# Project Instructions & Agent Rules

This file stores custom instructions and guidelines for AI coding operations.

## Rules & Guidelines

### Locked Logo Design & Animation Rule (STRICT - DO NOT MODIFY)
- **Asset**: Always use `@/src/assets/images/logo_square.jpg` for the header logo.
- **Logo Sizing**: Header logo container size is strictly `w-14 h-14 sm:w-[60px] sm:h-[60px]`.
- **Dual-Layer Rotation Structure**:
  - **Outer Rotating Layer**: Animate the logo's built-in green dashed ring using `animate-[spin_14s_linear_infinite]` on the `logo_square.jpg` image.
  - **Inner Stationary Layer**: Overlay a stationary centered copy of `logo_square.jpg` clipped with `clipPath: 'circle(39.5% at 50% 50%)'` to keep the central green dome and calligraphy upright and crisp.
- **NO External Rings**: Do NOT create secondary SVG circles, borders, or artificial ring layers. Only the logo image's own original dashed green ring must rotate.


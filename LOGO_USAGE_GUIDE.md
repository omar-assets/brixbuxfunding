# BRIXBUX Funding Logo Usage Guide

## Logo Assets

We have three primary logo assets located in `client/public/logos/`:

1. **`fundingfavicon_transparentbg.png`** - For favicon/browser tab icon
2. **`fundinglogodark_transparentbg.png`** - For light backgrounds
3. **`fundinglogowhite_darkbg.png`** - For dark backgrounds
4. **`fundinglogowhite_transparentbg.png`** - For dark backgrounds with transparent background

## Logo Component

The main logo component is located at `client/src/components/ui/Logo.tsx`. It automatically switches between light and dark variants based on the `variant` prop.

### Usage Examples

```jsx
// Basic usage (dark variant, medium size)
<Logo />

// Light variant for dark backgrounds
<Logo variant="light" size="lg" />

// Dark variant for light backgrounds
<Logo variant="dark" size="sm" />

// Light transparent variant for dark backgrounds with transparent logo
<Logo variant="light-transparent" size="md" />

// Logo only (no text) - great for navigation
<Logo showText={false} size="xl" />
```

### Props

- `variant`: `'light' | 'dark' | 'light-transparent'` - Choose logo color variant
- `size`: `'sm' | 'md' | 'lg' | 'xl'` - Logo size
- `className`: `string` - Additional CSS classes
- `showText`: `boolean` - Whether to show "BRIXBUX Funding" text

## Implementation Details

### Current Usage Locations

1. **Navigation.tsx** - Main navigation bar
2. **MinimalNav.tsx** - Minimal navigation variant
3. **App.tsx** - Footer
4. **index.html** - Favicon

### Responsive Design

- Small screens: 24px × 24px (h-6 w-6)
- Medium screens: 32px × 32px (h-8 w-8) 
- Large screens: 40px × 40px (h-10 w-10)
- Extra large: 48px × 48px (h-12 w-12) - Used for navigation branding

### Accessibility Features

- Proper alt text: "BRIXBUX Funding Logo"
- Focus states with purple outline
- High contrast support
- Reduced motion support
- Lazy loading for performance

## Best Practices

### When to Use Each Variant

- **Dark logo** (`fundinglogodark_transparentbg.png`): Use on light backgrounds (white, light gray)
- **Light logo** (`fundinglogowhite_darkbg.png`): Use on dark backgrounds (footer, dark sections)
- **Light transparent logo** (`fundinglogowhite_transparentbg.png`): Use on dark backgrounds when you need transparency

### Logo Placement

- Always maintain adequate spacing around the logo
- Use consistent sizing within the same context
- Ensure good contrast with background

### Animation

The logo includes subtle hover effects:
- 5% scale increase on hover
- Drop shadow enhancement
- Smooth transitions (0.3s ease)

## Maintenance

### Adding New Logo Variants

1. Add new logo files to `client/public/logos/`
2. Update the `Logo.tsx` component to handle new variants
3. Add appropriate CSS classes to `client/src/index.css`
4. Update this documentation

### Updating Logo Files

1. Replace files in `client/public/logos/`
2. Clear browser cache for testing
3. Check all usage locations for consistency

### Performance Considerations

- All logos use `loading="lazy"` for performance
- PNG format provides good quality with transparency
- File sizes should be optimized for web

## SEO & Schema

The logo is referenced in:
- Favicon meta tags
- Schema.org structured data
- Open Graph images

Update these locations when changing logo assets.

## Troubleshooting

### Logo Not Displaying

1. Check file paths are correct
2. Verify files exist in `client/public/logos/`
3. Clear browser cache
4. Check console for 404 errors

### Styling Issues

1. Verify CSS classes are applied correctly
2. Check for conflicting styles
3. Ensure proper variant is selected for background

### Performance Issues

1. Optimize image file sizes
2. Consider WebP format for better compression
3. Implement proper caching headers

## Future Enhancements

Potential improvements to consider:

1. **WebP Support**: Add WebP variants for better compression
2. **SVG Logos**: Consider SVG versions for better scalability
3. **Dark Mode**: Automatic switching based on user preference
4. **Icon Variants**: Logo-only versions for tight spaces
5. **Animated Logos**: Subtle animations for special occasions

## Important Note: Transparent Footer Logo

The footer currently uses a `light-transparent` variant that looks for `fundinglogowhite_transparentbg.png`. This file is currently a placeholder copy of the dark background version. 

**To properly implement the transparent footer logo:**

1. Create a version of your white logo with a transparent background
2. Save it as `client/public/logos/fundinglogowhite_transparentbg.png`
3. Replace the current placeholder file

The logo should have:
- White logo elements/text
- Transparent background
- Same dimensions as other logo files
- Optimized for web use

## Version History

- **v1.0**: Initial logo implementation with PNG files
- **v1.1**: Added responsive sizing and accessibility features
- **v1.2**: Enhanced animations and hover effects
- **v1.3**: Added extra large size for navigation, transparent variant for footer 
# Page Images

Place page-specific website images in the matching folder:

- `home/`
- `operations/`
- `careers/`
- `technology/`
- `pricing/`
- `login/`

Use lowercase, descriptive filenames with hyphens:

```text
hero.webp
warehouse-operations.webp
team-collaboration.webp
technology-dashboard.webp
```

Reference an image from React using its public URL:

```tsx
<img src="/images/pages/careers/hero.webp" alt="SMS Logistics careers" />
```

Prefer WebP for photographs and PNG or SVG for graphics that require transparency.

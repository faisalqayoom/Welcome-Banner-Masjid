# Background artwork

The `/ijtima` page expects the supplied Islamic banner artwork here:

```
public/backgrounds/ijtima-bg.jpg
```

Save the empty (text-free) background image — the one with the gold arch,
hanging lanterns, mosque skyline, Qur'an stand and mihrab — under exactly that
name. Nothing else needs to change; the page picks it up automatically.

Notes:

- **Aspect ratio** — the page stage is locked to 16:9. The artwork is applied
  with `background-size: cover`, so anything close to 16:9 fills edge to edge.
  A source around 3840×2160 keeps it sharp on a 4K panel.
- **Format** — `.jpg` is expected. To use `.png` or `.webp` instead, change the
  `url(...)` in `app/ijtima/ijtima.css` (`.ij-stage`).
- **Until the file is added**, the page renders on a cream gradient stand-in
  that approximates the artwork, so the layout is still reviewable.
- The text is positioned to sit clear of the artwork's decorated corners: the
  lanterns at the top, the Qur'an stand at the bottom left, and the mihrab at
  the bottom right.

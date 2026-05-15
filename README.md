# uivibe-toaster-landing

Marketing + onboarding site for [`uivibe-pro-toaster`](../uivibe-pro-toaster).

- **Next.js** App Router · **Tailwind CSS** · **TypeScript** · fully responsive
- 16 sections walking through install, usage, API, theming, accessibility, FAQ
- Uses the sibling library via a local `file:` dependency so changes to the library flow through after `npm run build` in `../uivibe-pro-toaster`

## Develop

```bash
# Build the library first (the landing depends on its dist/ output)
cd ../uivibe-pro-toaster && npm install && npm run build

cd ../uivibe-toaster-landing
npm install      # .npmrc forces install-links=true so the file: dep is copied, not symlinked
npm run dev      # http://localhost:3000
```

> If you change the library source, rerun `npm run build` in the library directory **and** `npm install` here so the updated `dist/` is copied into `node_modules/uivibe-pro-toaster`.

## Build

```bash
npm run build
npm run start
```

## Structure

```
app/
├── layout.tsx        # root, fonts, theme provider
├── page.tsx          # composes the 16 sections
├── providers.tsx     # client-side theme + toast.configure()
└── globals.css       # tailwind layers + design tokens

components/
├── Nav.tsx, Footer.tsx, CodeBlock.tsx, Tabs.tsx
└── sections/
    ├── Hero.tsx ............ #1
    ├── Stats.tsx ........... #2
    ├── Playground.tsx ...... #3
    ├── Features.tsx ........ #4
    ├── Installation.tsx .... #5
    ├── QuickStart.tsx ...... #6
    ├── VanillaUsage.tsx .... #7
    ├── ReactUsage.tsx ...... #8
    ├── VueUsage.tsx ........ #9
    ├── PromiseDemo.tsx ..... #10
    ├── ApiReference.tsx .... #11
    ├── ConfigOptions.tsx ... #12
    ├── ThemingShowcase.tsx . #13
    ├── PositionsGrid.tsx ... #14
    ├── Accessibility.tsx ... #15
    └── FaqCta.tsx .......... #16

lib/snippets.ts             # all displayed code blocks
```

After publishing the library to npm, swap the `file:` dependency in `package.json` for a real version range.

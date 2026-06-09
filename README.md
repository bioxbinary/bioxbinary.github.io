# Bioxbinary

**Think binary. Build bio.**

Bioxbinary is an independent lab exploring where AI meets biotechnology — built in
public and shared freely. It's a place to pair the logic of binary with the complexity
of biology, and to share what gets learned along the way.

This repository holds the source for the website at **[bioxbinary.github.io](https://bioxbinary.github.io)**.

## What's here

A small static site — plain HTML, CSS, and a little JavaScript. No build step, no framework.

```
bioxbinary.github.io/
├── index.html        Home — the lab and what it's about
├── about.html        Why this exists
├── products.html     The work — experiments, concepts, and open builds
├── contact.html      Get in touch
├── thankyou.html     Post-contact confirmation
└── assets/
    ├── css/          style.css (design system) + products.css
    ├── js/           script.js (nav, scroll reveal, modal)
    └── images/       favicons and imagery
```

## Run it locally

No tooling required — open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## The work

The site documents experiments at the intersection of AI and biology. Most are
**concepts** shared in case they're useful to someone; a few are real, open builds:

- **DoseXTrack** — a medication-monitoring system: an ESP32 dispenser talking to a
  browser dashboard over MQTT. Built, working, and open-source.

The rest (neural interfaces, edge AI, agritech ideas, and more) are honest concepts —
explorations and reading, not products. Nothing here is sold; the intent is to share
knowledge and build things that might genuinely help.

## Get involved

This is built in the open, and contributions and ideas are welcome:

- **Read the code** and open an issue or pull request.
- **Share what would be useful** — feedback shapes what gets built next.
- **Follow along** as experiments grow, succeed, or fail out loud.

## License

Shared freely in the spirit of open knowledge. A formal licence is on the way — until
then, please reach out before reusing substantial parts.

## Contact

- Web: [bioxbinary.github.io](https://bioxbinary.github.io)
- YouTube · Instagram · X: **@bioxbinary**

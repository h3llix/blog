---
title: Obsidian Quartz
draft: false
tags:
  - obsidian
  - quartz
---

Install Quartz

```
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm i
npx quartz create
```

I already had an vault now I created a new folder called public and created a symlink to content folder inside as following:

`ln -s /home/h3llix/Desktop/vault/Public/ ./content/`


`git remote add origin git@github.com:h3llix/quartz.git`
`npx quartz build --serve`

Installed Plugins:
- LongForm
- Templater

```
---
title: "<% tp.file.title %>"
draft: false
tags:
  - example-tag
---

```
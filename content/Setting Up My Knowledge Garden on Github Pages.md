---
title: Setting Up My Knowledge Garden on Github Pages
draft: false
tags:
  - obsidian
  - quartz
---
I have started to use Obsidian as my primary notes taking tool and to maintain my knowledge base. I use Quartz with Obsidian to publish this website on [[Github Pages]]
Here's a quick quide on how do I set it up.

### Install Quartz 

```
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm i
npx quartz create
```

+ Choose the default options and create an empty site. 
+ Since I already had an Obsidian vault, I created a `Public` folder inside it to store all the notes that should be published.
 
Inside the Quartz folder, I created a symbolic link to my `Public` folder in the existing vault:

```
rm -r content/
ln -s /home/h3llix/Desktop/vault/Public/ ./content/
``````

Now I can continue working in my existing vault and any note that is placed inside `Public`folder will be published. I use the `Templater` plugin with the following template to publish notes, but you can also use Obsidian's core Template plugin. Quartz requires this template in each note, where setting `draft: true` will prevent it from being published.
```
---
title: "<% tp.file.title %>"
draft: false
tags:
  - example-tag
---

```

### Test locally
To preview your published notes locally, run:
`npx quartz build --serve`
### Publish to Github
Once you've added notes to the `Public` folder, create a new repository on GitHub. I created a new repo called `blog`. Inside your quartz repo you can run:

```
git remote add origin git@github.com:h3llix/blog.git
npx quartz sync
```

### Hosting it On Github Pages

-  To publish the site on GitHub Pages, add the `deploy.yml` file from [here](https://quartz.jzhao.xyz/hosting) to your GitHub Actions workflow.
- I hosted mine at `blog.h3llix.com`. To do this.
	- Create 4 A records with following IPs:
		- 185.199.108.153
		- 185.199.109.153
		- 185.199.110.153
		- 185.199.111.153
- Then, create a CNAME record for your subdomain pointing to `<username>.github.io`.



![[images/Pasted image 20250218202255.png]]
![[images/Pasted image 20250218202241.png]]
![[images/Pasted image 20250218202417.png]]
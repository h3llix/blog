---
title: Obsidian Quartz
draft: false
tags:
  - obsidian
  - quartz
---
I have started to use Obsidian as my primary notes taking tool and to maintain my knowledge base. I use Quartz with Obsidian to publish this website over [[Github Pages]]
I'll just quickly go through the steps to create this website. 

### Install Quartz 

```
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm i
npx quartz create
```

Just go with the default options and create empty content, I already had a vault, so I created a `Public` folder inside my existing vault which will contain all the notes that needs to be published. 
 
 Inside the quartz folder I am creating a symbolic link to my `Public` folder in the existing vault.

```
rm -r content/
ln -s /home/h3llix/Desktop/vault/Public/ ./content/
``````

Now you can continue working on your existing vault and any note that is placed inside public can be published. I use `Templater` with the following template to publish notes but you can go with core Template plugin. `Quartz` require following template to be present at each note where you can set value of draft as true if you don't want to publish.

```
---
title: "<% tp.file.title %>"
draft: false
tags:
  - example-tag
---

```

### Test locally
You can run following command to test published notes locally using:
`npx quartz build --serve`
### Publish to Github
Once done with adding notes to the public folder in your vault. You can create a new repo on github. I created a new repo called `blog`. Inside your quartz repo you can run:

```
git remote add origin git@github.com:h3llix/blog.git
npx quartz sync
```

### Hosting it On Github Pages

- You can add `deploy.yml` from [here](https://quartz.jzhao.xyz/hosting) to you github ci to publish it to you github pages. 
- I hosted this to `blog.h3llix.com` and to do so.
	- You need to create 4 A records with following IPs
		- 185.199.108.153
		- 185.199.109.153
		- 185.199.110.153
		- 185.199.111.153
- I created a CNAME record from subdomain to point to `<username.github.io>`
![[Public/images/Pasted image 20250218202417.png]]

![[Public/images/Pasted image 20250218202241.png]]

![[Public/images/Pasted image 20250218202255.png]]
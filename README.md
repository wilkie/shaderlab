# Protolab

## Starting a protolab

1. `yarn dev`

## Building a Protolab

Lets say you'd like to prototype a new protolab called `newlab`:

1. **Fork Protolab** to your GitHub account
   1. Open: https://github.com/code-dot-org/protolab, click the Fork button
   1. Select yourself as the owner, repository name: `newlab`, click Create Fork
   1. After the fork completes, you'll be taken to your new GitHub repo: https://github.com/username/newlab

1. **Enable GitHub actions**, to automatically build your repo on push
  ![Enable Github Actions](./docs/img/enable-github-actions.png)

1. **Create a codespace** or clone locally
  ![Create Codespace](./docs/img/create-codespace.png)

1. **Make a source change**
   1. Edit `src/Lab.tsx` and change `LAB_NAME` to `newlab`
   1. Commit the change and push it
   1. GitHub Actions will build on push and about 1 minute later, you can **view your changes** on: https://username.github.io/newlab
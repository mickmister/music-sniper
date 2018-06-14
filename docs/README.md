# Get started

This is (hopefully) a complete guide to set up a programming environment for the project, with no prior environment setup on your machine.

First we will download two things, [node.js](https://nodejs.org/en/download/) and a text editor. You can proceed to the next steps while these are downloading, up until the "Configure the project" step.

## Download node.js

Download node.js [here](https://pages.github.com/).
This allows you to javascript on your computer, without using a browser. This is useful for tooling, among other things like server-side javascript.

## Download a text editor

This is where we will write code for the application. I prefer using [Atom](https://atom.io/).

Some different options to choose from:
* [Atom](https://atom.io/) - [example picture](https://www.fosslinux.com/wp-content/uploads/2017/07/Atom-Text-Editor.jpg)
* [VS Code](https://code.visualstudio.com/) - [example picture](https://www.penta-code.com/wp-content/uploads/2016/11/VSC-Theme.png)
* [Sublime Text](https://www.sublimetext.com/3) - [example picture](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAOCCE1bX4RimarZeAefZYpESqc1nTfVEgDUMCjBCN1n9amaQE)

## Setup a GitHub account

Go to [github.com](https://github.com/) and make an account.

## Choose a terminal
For macOS and Linux, you can use the default terminal provided on your OS.

For Windows, you can use the default terminal (cmd), but I find [git bash](https://git-scm.com/downloads) to be a more appropriate choice.

## Make an ssh key

This allows you to identify yourself to the code repository.  

#### Create and navigate to .ssh folder

We are going to store our key in the folder `/Users/<username>/.ssh`

Open your terminal. Type these commands into the terminal, pressing enter after each line to run each command:

```
mkdir -p ~/.ssh
cd ~/.ssh
```

We are now in the folder we want to save the key in.

`mkdir` means `make directory`. It creates a folder called `.ssh` in your `/Users/<username>` folder. The `-p` flag makes it so an error does not occur if the folder already exists.

`cd` means `change directory`. It navigates us to the `.ssh` folder.

`~` is a shortcut to your user folder.

`ls` allows you to view files and folders in your current directory. It's not used above, but it is useful to know. The first letter in the command is an L.

#### Create ssh key

Run this command in your terminal:

```
ssh-keygen
```

The terminal will ask you to name the key. Type
`github_<username>_id_rsa`, where `<username>` is your GitHub username, and press enter. It doesn't matter what you name it, it's just best to be descriptive.

Afterwards, press enter twice if you don't want a password on your key. It's better to have a password for security, but it is a hassle to have to enter the password every time you want to use the key.

#### Make it so your key is registered whenever your terminal opens

Run these commands in your terminal:

```
touch ~/.bash_profile
echo "ssh-add ~/.ssh/<your ssh key file name>" >> ~/.bash_profile
```

`touch` creates the file if it doesn't already exist.

`echo` prints out what you give to it.

`>>` allows us to redirect the echo'd value and append it to a file.

This is the simplest way to make your terminal use your ssh key every time it opens. Now we are ready to download the project.

## Get the project on your computer

#### Create a folder for storing your projects

We're going to name the folder `Code` and put it in our user directory. It doesn't matter what you name the folder, or where you put the folder.

```
cd ~
mkdir Code
cd Code
```

#### Download the project

Using the software called `git`, we are going to download the project from GitHub.

Run these commands in your terminal:

```
git clone git@github.com:mickmister/midi-jam-helper.git
cd midi-jam-helper
```
> Hint: You can have your terminal auto-complete things. If you type `cd m` into your terminal and then press the tab key, it will auto-complete to folder name here.

Here, `git clone` creates a folder called `midi-jam-helper` and puts the project contents in the folder.

## Configure the project

You need to have node.js installed at this point.

Download [yarn](https://yarnpkg.com/lang/en/docs/install/#windows-stable). It is used to install packages of code needed to develop/run our application. These packages are called the project's dependencies.

Now we are going to download and install the dependencies. Run this command in your terminal:

```
yarn
```

We can now run the application using the command `yarn start`, and then pasting the url the terminal gives us into our web browser's address bar. To exit the program, go to the terminal and press `ctrl`+`c`

## Open the project in a text editor

If you are using atom you can just run the following command:

```
atom .
```

`.` a shortcut for the current directory of the terminal session.

If you're using VS Code instead of Atom, you can use the command `code .` to open the folder.

If you want to use your computer's regular folder browser to open the project, open up your text editor, then go to the top left corner of the screen and click `File > Open` or `File > Open Folder`, depending on the text editor. Open the folder where your project was created.

The `src` folder contains our application's code. This is where we make edits and add new code.

## Wrap up

Your computer is now set up to develop and run javascript projects. Now you can start your own javascript projects with minimal setup involved. More importantly, you can contribute to the project!

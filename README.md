Installing frol.pw development environment
==============

First step
--------------
Clone this repository to you PC or laptop with command: 
<br><code>git clone git@github.com:frolmr/loftshool_frolpw.git</code><br>

Step two
--------------
After cloning the repo, do the following
- Install necessary node modules and their dependencies:
<br><code>npm i</code><br>
**This command will create 'node_modules' directory and install all modules there**

- Install all necessary bower components: 
<br><code>bower i</code> <br>
**This command will create 'bower_comoonents' directory and install all modules there**

Step three
--------------
Build the project:
<br><code>gulp production</code><br>
**This command creates 'dist' directory that can be sent to production**
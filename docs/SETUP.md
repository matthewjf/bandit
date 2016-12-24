# RPI setup

### set up raspbian jessie
https://www.raspberrypi.org/downloads/raspbian/

### expand root partition
```
$
sudo raspi-config
reboot
```

### update OS
```
$
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
```

### update firmware
```
$
sudo apt-get install git-core
sudo wget http://goo.gl/1BOfJ -O /usr/bin/rpi-update && sudo chmod +x /usr/bin/rpi-update
sudo rpi-update
```

### lighten up OS
```
$
sudo apt-get purge libreoffice wolfram-engine sonic-pi scratch
sudo apt-get autoremove
```

### install node
```
$
sudo apt-get remove nodered -y
sudo apt-get remove nodejs nodejs-legacy -y
sudo apt-get remove npm  -y
sudo apt-get autoremove
sudo curl -sL https://deb.nodesource.com/setup_6.x | sudo bash -
sudo apt-get install -y nodejs
```

### install lirc
```
$
sudo apt-get install lirc
```

### config
add to `/etc/modules`:
```
lirc_dev
lirc_rpi gpio_in_pin=23 gpio_out_pin=22
```

replace `/etc/lirc/hardware.conf` with:
```
########################################################
# /etc/lirc/hardware.conf
#
# Arguments which will be used when launching lircd
LIRCD_ARGS="--uinput"

# Don't start lircmd even if there seems to be a good config file
# START_LIRCMD=false

# Don't start irexec, even if a good config file seems to exist.
# START_IREXEC=false

# Try to load appropriate kernel modules
LOAD_MODULES=true

# Run "lircd --driver=help" for a list of supported drivers.
DRIVER="default"
# usually /dev/lirc0 is the correct setting for systems using udev
DEVICE="/dev/lirc0"
MODULES="lirc_rpi"

# Default configuration files for your hardware if any
LIRCD_CONF=""
LIRCMD_CONF=""
########################################################
```

add to `/boot/config.txt`:
`dtoverlay=lirc-rpi,gpio_in_pin=23,gpio_out_pin=22,gpio_in_pull=up`

### configure hostname
```
$
sudo apt-get install avahi-daemon
```

change last line of `/etc/hosts`:
`127.0.1.1 remote`

change hostname of `/etc/hostname`:
`remote`

reboot

### setup nginx
```
$
sudo apt-get install nginx
```

remote `/usr/share/nginx/html/index.html`

setup `/etc/nginx/sites-enabled/default`
or `/etc/nginx/con.d/remote.conf`

run on boot `sudo systemctl enable nginx.service`
check `sudo systemctl status nginx.service`

### learn remote codes
```
$
sudo /etc/init.d/lirc stop
sudo irrecord -d /dev/lirc0 /etc/lirc/lircd_<remote_name>.conf
```
rename remote name for each file generated
```
$
sudo /etc/init.d/lirc start
```

add file `/etc/lirc/lircd.conf`:
```
# add this line for each remote file
include "lircd_<remote_name>.conf"
```

### run node on boot
add file `/etc/styemd/system/remote.service`:
```
[Service]
WorkingDirectory=/home/pi/bandit
ExecStart=/usr/bin/node /home/pi/bandit/server.js
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=remote
User=root
Group=root
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

run `sudo systemctl enable remote.service`
check `sudo systemctl status remote.service`

### wakeonlan
`sudo apt-get install wakeonlan`

add file `/etc/ethers`:
```
MAC hostname
```

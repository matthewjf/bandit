# expand root partition
sudo raspi-config
reboot

# update OS
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade

# update firmware
sudo apt-get install git-core
sudo wget http://goo.gl/1BOfJ -O /usr/bin/rpi-update && sudo chmod +x /usr/bin/rpi-update
sudo rpi-update

# lighten up OS
sudo apt-get purge libreoffice wolfram-engine sonic-pi scratch
sudo apt-get autoremove

# install node
sudo apt-get remove nodered -y
sudo apt-get remove nodejs nodejs-legacy -y
sudo apt-get remove npm  -y
sudo apt-get autoremove
sudo curl -sL https://deb.nodesource.com/setup_6.x | sudo bash -
sudo apt-get install -y nodejs

# install lirc
sudo apt-get install lirc

# config
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
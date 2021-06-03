# 配置Cloud Studio云开发环境
apt update
apt install software-properties-common -y
add-apt-repository ppa:git-core/ppa
apt install git nodejs npm -y
git --version
npm install -g n
n lts
PATH="$PATH"
node --version
npm install npm@latest -g
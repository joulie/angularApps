
# Création du contenu du README en Markdown
markdown_content = """# 🐧 Installation de WSL (Windows Subsystem for Linux)
## ⚙️ Étapes d'installation
### 1. Ouvrir PowerShell en mode administrateur
### 2. Lancer la commande d'installation
wsl --install
wsl --list --online
wsl --install -d ubuntu
### Mettre à jour le système
sudo apt update && sudo apt upgrade -y
### Installer nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash
### Charger nvm
export NVM_DIR="$([ -z "{XDG_CONFIG_HOME-}" ] && printf %s "{HOME}/.nvm" || printf %s "{XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
### Installer Node.js LTS
nvm install --lts
### Vérifier Node.js et npm
node -v
npm -v
### Installer Angular CLI
npm install -g @angular/cli
### Vérifier Angular CLI
ng version

### Si on voulait faire un nouveau projet on ferait
ng new mon-projet
cd mon-projet
ng serve
### mais on va récup ce projet et le lancer plutôt

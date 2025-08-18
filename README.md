
## ⚙️ Étapes d'installation
### 1. Ouvrir PowerShell en mode administrateur
### 2. 🐧 Installation de WSL (Windows Subsystem for Linux)
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
### On va récup ce projet
sudo apt install git -y
git config --global user.name "TonNom"
git config --global user.email "tonemail@example.com"
#### Générer une clé SSH
ssh-keygen -t ed25519 -C "tonemail@example.com"
cat ~/.ssh/id_ed25519.pub  # Copier cette clé dans GitHub/GitLab
#### Tester la connexion SSH
ssh -T git@github.com
git clone https://github.com/joulie/angularApps.git
#### installer la BDD
-- Table structure for table `assignments`  
DROP TABLE IF EXISTS `assignments`;  
/*!40101 SET @saved_cs_client     = @@character_set_client */;  
/*!50503 SET character_set_client = utf8mb4 */;  
CREATE TABLE `assignments` (  
  `id` int NOT NULL AUTO_INCREMENT,  
  `nom` varchar(255) DEFAULT NULL,  
  `prenom` varchar(255) DEFAULT NULL,  
  `site` varchar(255) DEFAULT NULL,  
  `code_projet` varchar(255) DEFAULT NULL,  
  `nom_projet` varchar(255) DEFAULT NULL,  
  `type_materiel` varchar(255) DEFAULT NULL,  
  `detail_materiel` varchar(255) DEFAULT NULL,  
  `num_serie` varchar(255) DEFAULT NULL,  
  PRIMARY KEY (`id`)  
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4   COLLATE=utf8mb4_0900_ai_ci;  

-- Table structure for table `products`  
DROP TABLE IF EXISTS `products`;  
/*!40101 SET @saved_cs_client     = @@character_set_client */;  
/*!50503 SET character_set_client = utf8mb4 */;  
CREATE TABLE `products` (  
  `id` int NOT NULL AUTO_INCREMENT,  
  `productName` varchar(255) DEFAULT NULL,  
  `code` varchar(100) DEFAULT NULL,  
  `available` varchar(100) DEFAULT NULL,  
  `price` decimal(10,2) DEFAULT NULL,  
  `rating` decimal(3,1) DEFAULT NULL,  
  `image` varchar(255) DEFAULT NULL,  
  PRIMARY KEY (`id`)  
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4   COLLATE=utf8mb4_0900_ai_ci;  
/*!40101 SET character_set_client = @saved_cs_client */;  
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;  
#### démarrer les serveurs node et angular
#### démarrer les serveurs node et angular
```bash
node server.js
```
```bash
npm start
```
#### pour les tests
```bash
ng test
```
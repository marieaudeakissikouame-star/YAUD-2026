<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no">
    <meta name="description" content="Site compagnon de mariage - Yoane & Marie-Aude">
    <meta name="theme-color" content="#d9826b">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <title>Yoane & Marie-Aude - 08 Août 2026</title>
    <link rel="manifest" href="manifest.json">
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
<!-- Hero Section -->
<section class="hero" role="banner" aria-label="Page d'accueil - Yoane et Marie-Aude">
  <div class="hero-content">
    <div class="hero-carousel">
      <img src="Couple1.jpg" alt="Photo du couple - Yoane et Marie-Aude 1" class="carousel-img active" loading="lazy">
      <img src="Couple2.jpg" alt="Photo du couple - Yoane et Marie-Aude 2" class="carousel-img" loading="lazy">
      <img src="Couple3.jpg" alt="Photo du couple - Yoane et Marie-Aude 3" class="carousel-img" loading="lazy">
      <div class="carousel-dots">
        <button class="dot active" aria-label="Photo 1" onclick="goToSlide(0)"></button>
        <button class="dot" aria-label="Photo 2" onclick="goToSlide(1)"></button>
        <button class="dot" aria-label="Photo 3" onclick="goToSlide(2)"></button>
      </div>
    </div>

    <div class="hero-text">
      <h1>Yoane & Marie-Aude</h1>
      <p class="date">Samedi 08 Août 2026</p>
      <p class="location">Menara Garden – Yopougon</p>
      <p class="theme">🌸 Tropical Sunset 🌸</p>
      <div class="bible-verse">
        <p>« Par-dessus tout, revêtez-vous de l'amour, qui est le lien de la perfection. »</p>
        <p class="source">Colossiens 3:14</p>
      </div>
      <button class="btn-primary" onclick="enterUniverse()">Entrer dans notre univers</button>
    </div>
  </div>
</section>

<!-- Main App Navigation -->
<nav class="app-nav hidden" id="appNav" aria-label="Navigation principale" role="navigation">
  <button class="nav-item" onclick="showSection('find-place')" aria-label="Trouver ma place">
    <span class="icon">🪑</span>
    <span>Ma place</span>
  </button>
  <button class="nav-item" onclick="showSection('flavors')" aria-label="Découvrir les saveurs">
    <span class="icon">🍽️</span>
    <span>Saveurs</span>
  </button>
  <button class="nav-item" onclick="showSection('info')" aria-label="Informations utiles">
    <span class="icon">📍</span>
    <span>Infos</span>
  </button>
</nav>

<!-- Sections -->
<main class="app-container hidden" id="appContainer">
  <!-- Find Place Section -->
  <section id="find-place" class="content-section" aria-labelledby="find-place-heading">
    <div class="section-header">
      <button class="btn-back" onclick="goHome()" aria-label="Retour à l'accueil">← Accueil</button>
      <h2 id="find-place-heading">Trouver ma place</h2>
    </div>
    <div class="section-content">
      <input 
        type="text" 
        id="searchGuest" 
        class="search-input" 
        placeholder="Entrez votre nom..." 
        aria-label="Rechercher votre nom dans la liste des invités"
        autocomplete="off"
        oninput="searchTable(this.value)"
      >
      <div id="result" class="result-box" role="status" aria-live="polite" aria-atomic="true"></div>
    </div>
  </section>

  <!-- Flavors Section -->
  <section id="flavors" class="content-section" aria-labelledby="flavors-heading">
    <div class="section-header">
      <button class="btn-back" onclick="goHome()" aria-label="Retour à l'accueil">← Accueil</button>
      <h2 id="flavors-heading">Saveurs de notre réception</h2>
    </div>
    <div class="section-content">
      <div class="intro-text">
        <h3>🌸 Quelques saveurs 🌸</h3>
        <p>Une réception aux couleurs de nos traditions, avec une sélection de mets ivoiriens et de saveurs appréciées de tous.</p>
      </div>

      <div class="menu-category">
        <h4>🥗 Entrées</h4>
        <ul>
          <li>Salade composée fraîche</li>
        </ul>
      </div>

      <div class="menu-category">
        <h4>🍽️ Plats traditionnels</h4>
        <ul>
          <li>Tchep au poisson et au bœuf</li>
          <li>Placali + sauce kopè</li>
          <li>Foutou banane + sauce graine</li>
          <li>Kplé + foutou manioc</li>
          <li>Foutou igname + sauce gouagouassou</li>
          <li>Poisson frit & poulet frit + alloco & frites</li>
          <li>Igname bouillie + sauce tomate</li>
        </ul>
      </div>

      <div class="menu-category">
        <h4>🍰 Douceur</h4>
        <ul>
          <li>Wedding cake</li>
        </ul>
      </div>

      <div class="menu-category">
        <h4>🥤 Boissons</h4>
        <ul>
          <li>Eau minérale</li>
          <li>Jus naturels</li>
          <li>Boissons gazeuses</li>
          <li>Bières & Vins</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Info Section -->
  <section id="info" class="content-section" aria-labelledby="info-heading">
    <div class="section-header">
      <button class="btn-back" onclick="goHome()" aria-label="Retour à l'accueil">← Accueil</button>
      <h2 id="info-heading">Informations</h2>
    </div>
    <div class="section-content">

      <div class="info-card">
        <h3>🗺️ Itinéraire</h3>
        <p>Menara Garden – Yopougon</p>
        <iframe 
          src="https://www.google.com/maps?q=5.338956,-4.009892&hl=fr&z=15&output=embed"
          width="100%" 
          height="250" 
          style="border:0;border-radius:12px;margin:12px 0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          class="map-embed"
        ></iframe>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
          <a href="https://maps.app.goo.gl/PRT33PHSLhgVpBhR9" target="_blank" class="btn-secondary" aria-label="Ouvrir la localisation dans Google Maps">📱 Ouvrir la localisation</a>
          <a href="https://www.google.com/maps/dir/?api=1&origin=Station+Lubrafrique&destination=5.338956,-4.009892&travelmode=driving" target="_blank" class="btn-primary" aria-label="Itinéraire recommandé">🗺️ Itinéraire recommandé</a>
        </div>
        <p class="note" style="margin-top:10px;"><strong>Itinéraire conseillé :</strong> En raison de travaux et de voies ponctuellement fermées, privilégiez la voie qui rejoint la Côte Verte après la station Lubrafrique. Ouvrez l’itinéraire recommandé pour lancer la navigation.</p>
      </div>
    </div>
  </section>
</main>

<script src="script.js" defer></script>
</body>
</html>

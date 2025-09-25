// Edge Function GTM pour GALRIVIERA VTC
// Fichier: netlify/edge-functions/gtm-inject.js

export default async (request, context) => {
  // Récupérer la réponse originale
  const response = await context.next();
  
  // Vérifier que c'est du HTML
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }
  
  // Récupérer le contenu HTML
  let html = await response.text();
  
  // Vérifier si GTM est déjà présent (éviter duplication)
  if (html.includes('GTM-MVQ8QKS7')) {
    return new Response(html, {
      headers: response.headers
    });
  }
  
  // Code GTM Head
  const gtmHeadScript = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MVQ8QKS7');</script>
<!-- End Google Tag Manager -->`;
  
  // Code GTM Body (NoScript)
  const gtmBodyScript = `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MVQ8QKS7"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;
  
  // Injection dans HEAD (avant </head>)
  html = html.replace('</head>', `${gtmHeadScript}\n</head>`);
  
  // Injection dans BODY (après <body>)
  html = html.replace(/<body([^>]*)>/i, `<body$1>\n${gtmBodyScript}`);
  
  // Ajouter headers pour tracking
  const newHeaders = new Headers(response.headers);
  newHeaders.set('X-GTM-Injected', 'true');
  newHeaders.set('X-GTM-ID', 'GTM-MVQ8QKS7');
  
  // Retourner la réponse modifiée
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
};

// Configuration de l'Edge Function
export const config = {
  path: "/*", // S'applique à toutes les pages
  excludedPath: [
    "/api/*", 
    "/*.js", 
    "/*.css", 
    "/*.png", 
    "/*.jpg", 
    "/*.ico",
    "/*.xml",
    "/*.json"
  ]
};
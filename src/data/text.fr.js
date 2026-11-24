// Texte français (tutoiement, vocabulaire de la VF : Pilier, Souffle, Lune supérieure, côté démon).
// Clés : voir core/localize.js textKeys(). Sans spoiler au-delà de l'arc du Village des forgerons.
// On écrit « es-tu ? » avec une espace normale : typo() la remplace par une espace fine insécable.
const typo = (s) => s.replace(/ ([?!:;»])/g, ' $1').replace(/« /g, '« ');

const Q = {
  q1: ['Minuit. Ton corbeau se pose sur le rebord de la fenêtre en hurlant : mission urgente, deux villages plus loin. Tu…', [
    'Es déjà habillé·e. Tu as dormi en uniforme, de toute façon.',
    'Supplies pour cinq minutes de plus, puis cours tout le trajet pour te rattraper.',
    'Réveilles les autres. Personne ne part seul dans le noir.',
    'Y vas, mais demandes d’abord au corbeau ce que tu y gagnes.']],
  q2: ['Une nouvelle recrue se fige face à un démon. Tu…', [
    'Te places devant elle sans un mot.',
    'Lui cries de se ressaisir. La peur tue.',
    'La guides calmement : respire, garde, frappe.',
    'La laisses affronter ça. C’est comme ça qu’on voit qui mérite d’être formé.']],
  q3: ['Ton maître te montre un rocher : « Tranche-le. » Une semaine plus tard, il n’a pas bougé. Tu…', [
    'Continues. Du lever au coucher du soleil. Une semaine de plus, un mois de plus.',
    'Cherches une astuce. Il y a toujours un moyen plus malin.',
    'Te plains bruyamment à qui veut l’entendre, puis continues quand même.',
    'Décides que ce rocher est indigne de toi. Tu es fait·e pour de plus grandes choses.']],
  q4: ['Après une mission éprouvante, ton escouade a enfin une soirée libre. Tu…', [
    'Organises un festin et veilles à ce que tout le monde mange avant toi.',
    'Vas t’entraîner seul·e au bord de la rivière.',
    'Lances un défi bruyant et flamboyant… et le gagnes.',
    'Restes assis·e tranquillement à écouter les autres parler.']],
  q5: ['Un démon te propose un vrai pouvoir, en échange d’une petite trahison. Tu…', [
    'Refuses aussitôt. Certaines limites ne bougent pas.',
    'Lui éclates de rire au nez et attaques.',
    'Hésites. Juste une seconde, tu te poses la question.',
    'Fais semblant d’accepter, t’approches, puis frappes.']],
  q6: ['Quelqu’un se moque de ton ami en pleine rue. Tu…', [
    'L’attrapes par le col. Tout de suite.',
    'Lâches une phrase glaciale qui clôt la discussion.',
    'Fais une blague qui retourne toute la foule contre lui.',
    'Continues ton chemin. Ce ne sont pas tes affaires.']],
  q7: ['Le plan de mission qu’on t’a donné est clairement mauvais. Tu…', [
    'Le suis quand même. Les ordres existent pour une raison.',
    'L’ignores et règles ça à ta façon, seul·e.',
    'Le réécris pendant la nuit et le présentes à l’équipe à l’aube.',
    'Fonces et improvises. Les plans, c’est pour les prudents.']],
  q8: ['Quel compliment te toucherait le plus ?', [
    '« Tu es le plus fort. »',
    '« Tu ne laisses jamais personne tomber. »',
    '« Avec toi, tout devient plus lumineux. »',
    '« Rien ne semble jamais t’ébranler. »']],
  q9: ['Tu perds un duel devant tout le monde. Tu…', [
    'Salues, remercies et demandes une revanche pour demain.',
    'Bouillonnes. Tu t’entraîneras jusqu’à l’écraser.',
    'En ris. Le dîner t’attend.',
    'Décides en silence qu’il n’y aura pas de revanche… ni de lui.']],
  q10: ['Une vieille villageoise adorable te sert un plat que tu ne supportes vraiment pas. Tu…', [
    'Manges jusqu’à la dernière bouchée et la remercies sincèrement.',
    'Refuses poliment. L’honnêteté d’abord.',
    'En fais une grande tragédie théâtrale.',
    'Repousses le bol. Tu ne manges pas ce que tu n’aimes pas.']],
  q11: ['En combat, ton approche préférée, c’est…', [
    'Une force écrasante dès la première seconde.',
    'La patience. Lire l’adversaire, attendre l’ouverture.',
    'La vitesse et le chaos. Personne ne te voit venir.',
    'Protéger ceux qui sont derrière toi passe avant la victoire.']],
  q12: ['Un démon acculé implore ta pitié, en pleurant l’humain qu’il était. Tu…', [
    'Lui accordes une fin paisible et dis une prière pour lui.',
    'L’abats. Ses larmes ne rendront pas la vie à ses victimes.',
    'Te figes. Tu n’arrives pas à le faire.',
    'Poses d’abord des questions. Ce qu’il sait pourrait sauver des vies.']],
  q13: ['La guerre est finie. Où vis-tu maintenant ?', [
    'Dans une ville animée où tout le monde connaît ton nom.',
    'Dans une cabane en montagne, loin de tout le monde.',
    'Dans un grand domaine. Tu l’as bien mérité.',
    'Dans un dojo, pour former la génération suivante.']],
  q14: ['Un coéquipier s’attribue le démon que tu as tué. Tu…', [
    'Laisses couler. Le démon n’est plus là, c’est tout ce qui compte.',
    'Rétablis la vérité, haut et fort, devant tout le monde.',
    'Es blessé·e en silence et ne dis rien.',
    'Le retiens. Tu feras en sorte que ça n’arrive plus jamais.']],
  q15: ['Qu’est-ce qui te fait le plus peur ?', [
    'Perdre les gens que tu aimes.',
    'Être oublié·e.',
    'Mourir. Tu ferais n’importe quoi pour continuer à vivre.',
    'Être faible au moment où ça compte enfin.']],
  q16: ['Tu arrives en retard : trois pourfendeurs blessés, un démon encore debout. Tu…', [
    'Mets d’abord les blessés à l’abri, puis reviens pour lui.',
    'L’affrontes de face, seul·e, immédiatement.',
    'Envoies chercher des renforts et tiens une ligne de défense.',
    'Attends dans l’ombre qu’il baisse sa garde.']],
  q17: ['Tes amis te décriraient en un mot comme…', [
    'Bruyant·e.',
    'Gentil·le.',
    'Mystérieux·se.',
    'Déterminé·e.']],
  q18: ['Un festival arrive en ville pendant ton seul jour de repos. Tu…', [
    'Es premier·ère dans la file de chaque jeu et de chaque stand.',
    'Y vas, surtout pour garder un œil sur les plus jeunes.',
    'N’y vas pas. L’entraînement ne prend pas de vacances.',
    'Y vas seul·e et regardes les lanternes depuis un toit.']],
  q19: ['Quelqu’un de bien plus fort que toi propose de t’entraîner, mais il est cruel. Tu…', [
    'Acceptes. La force, c’est la force.',
    'Refuses. Tu trouveras ta propre voie.',
    'Acceptes, et essaies de l’adoucir en chemin.',
    'Acceptes, gardes la tête baissée et tiens bon.']],
  q20: ['Le soleil se lève enfin après la plus longue nuit de ta vie. Tu ressens…', [
    'Une gratitude tranquille.',
    'La faim. Une faim immense.',
    'Tu penses déjà au prochain combat.',
    'De l’agacement. C’est la nuit que tu te sentais le plus fort·e.']],
};

// [titre, blurb, { trait: phrase }]
const C = {
  tanjiro: ['Bretteur au cœur d’eau et de soleil', 'Gentil jusqu’à l’os et têtu comme une montagne, tu continues bien après que tout le monde aurait abandonné.', {
    compassion: 'Comme Tanjiro, tu ressens la douleur des autres comme la tienne, même celle de ton ennemi.',
    discipline: 'Comme Tanjiro, tu crois que le travail bat le talent, et tu le prouves chaque jour.',
    composure: 'Comme Tanjiro, tu gardes la tête claire quand il le faut et tu flaires ce que les autres ratent.',
    intensity: 'Comme Tanjiro, un feu couve sous ta gentillesse, et il se voit quand on menace ceux que tu aimes.' }],
  nezuko: ['Le démon qui protège les humains', 'Douce, féroce et loyale au-delà des mots : tu protèges les tiens d’abord, et tu ne poses jamais de questions.', {
    compassion: 'Comme Nezuko, tu te placerais entre ta famille et n’importe quoi, sans explication.',
    intensity: 'Comme Nezuko, on te sous-estime… jusqu’à ce que tu enfonces la porte.',
    composure: 'Comme Nezuko, tu restes étonnamment calme, même quand tout part en vrille autour de toi.',
    playfulness: 'Comme Nezuko, tu as un côté doux et joueur qui détend tout le monde.' }],
  zenitsu: ['Souffle de la Foudre, Première Forme uniquement', 'Bruyant, peureux et secrètement brillant, tu te plains tout le trajet… puis tu sauves la situation quand même.', {
    compassion: 'Comme Zenitsu, ton cœur est immense, surtout pour ceux qui ont été gentils avec toi.',
    playfulness: 'Comme Zenitsu, tu transformes chaque crise en tragédie théâtrale, et on t’adore pour ça.',
    composure: 'Comme Zenitsu, la panique est ta langue maternelle… mais quand ça compte vraiment, quelque chose en toi devient silencieux et redoutable.',
    independence: 'Comme Zenitsu, tu donnes le meilleur de toi quand personne ne regarde.' }],
  inosuke: ['Souffle de la Bête, roi de la montagne', 'Sauvage, compétitif et impossible à ignorer, tu fonces tête baissée sur chaque défi, et sur chaque adversaire.', {
    intensity: 'Comme Inosuke, tu réponds à chaque problème en chargeant à pleine puissance. La subtilité, c’est pour les autres.',
    independence: 'Comme Inosuke, personne ne t’a appris les règles, et ça se voit.',
    ambition: 'Comme Inosuke, tu dois être le plus fort, et tu l’annonces à qui veut l’entendre.',
    playfulness: 'Comme Inosuke, tu es chaotique, drôle et totalement sincère.' }],
  kanao: ['Souffle de la Fleur, l’épéiste à la pièce', 'Discrète, précise et trouvant peu à peu ta propre voix, tu vois bien plus que tu ne le dis.', {
    composure: 'Comme Kanao, ton visage reste calme et ton regard affûté, quoi qu’il se passe en toi.',
    discipline: 'Comme Kanao, tu t’entraînes avec une précision qui laisse les autres derrière, sans bruit.',
    independence: 'Comme Kanao, tu gardes tes pensées pour toi, même entourée de monde.',
    compassion: 'Comme Kanao, ton cœur s’ouvre, un petit choix courageux à la fois.' }],
  genya: ['Le pourfendeur qui se bat à sa façon', 'Des angles durs, un cœur tendre caché et un besoin brûlant de faire tes preuves : tu ne prends jamais le chemin facile.', {
    intensity: 'Comme Genya, tu y vas à fond, à chaque fois, quitte à inquiéter ceux qui t’entourent.',
    ambition: 'Comme Genya, tu veux désespérément faire tes preuves auprès d’une personne qui compte.',
    independence: 'Comme Genya, tu as trouvé ta propre voie quand la voie habituelle t’était fermée.',
    compassion: 'Comme Genya, derrière ton air renfrogné se cache quelqu’un qui tient profondément aux autres.' }],
  aoi: ['Le pilier du Domaine des Papillons', 'Organisée, franche et secrètement adorable, tu fais tourner les choses (et les gens).', {
    discipline: 'Comme Aoi, tu tiens tout d’une main ferme : horaires, règles, chaque chose à sa place.',
    compassion: 'Comme Aoi, tu montres que tu tiens aux gens en t’assurant qu’ils prennent vraiment leurs médicaments.',
    independence: 'Comme Aoi, tu es plus heureuse dans une équipe qui compte sur toi.',
    intensity: 'Comme Aoi, tu n’as aucune patience pour les bêtises, et tu le dis.' }],
  murata: ['Le pourfendeur le plus normal du monde', 'Fiable, attachant et toujours là, tu es la personne qu’on oublie de remercier.', {
    compassion: 'Comme Murata, tu es gentil de mille petites façons qu’on ne remarque qu’après coup.',
    playfulness: 'Comme Murata, tu sais rire de toi-même, ce qui est plus rare que n’importe quel souffle.',
    discipline: 'Comme Murata, tu es toujours au rendez-vous. C’est ton super-pouvoir.',
    independence: 'Comme Murata, tu donnes le meilleur de toi aux côtés des autres, jamais sous les projecteurs.' }],
  sabito: ['L’élève d’Urokodaki au masque de renard', 'Exigeant parce que tu tiens aux autres, tu les pousses fort pour qu’ils rentrent vivants.', {
    discipline: 'Comme Sabito, tu crois à l’entraînement jusqu’à la douleur, et tu attends la même chose des autres.',
    compassion: 'Comme Sabito, ta dureté est en fait une promesse : je veux que tu survives.',
    composure: 'Comme Sabito, tu parles franchement et restes calme quand les autres s’affolent.',
    intensity: 'Comme Sabito, tu ne laisses personne se contenter de moins que son meilleur.' }],
  makomo: ['La douce élève d’Urokodaki au masque de renard', 'Posée et sage, tu enseignes par l’exemple calme et un sourire au bon moment.', {
    compassion: 'Comme Makomo, tu encourages les gens avec douceur jusqu’à ce qu’ils croient en eux.',
    composure: 'Comme Makomo, ton calme est contagieux : on respire mieux près de toi.',
    discipline: 'Comme Makomo, tu sais que la technique compte plus que la force brute.',
    playfulness: 'Comme Makomo, une étincelle espiègle brille derrière ta patience.' }],
  urokodaki: ['Ancien Pilier de l’Eau, mentor au masque de tengu', 'Strict, sage et discrètement affectueux, tu es le mentor qui croit en les gens avant eux.', {
    discipline: 'Comme Urokodaki, tes exigences sont brutales, et elles forgent des légendes.',
    composure: 'Comme Urokodaki, ton visage ne laisse rien paraître (autant porter un masque).',
    compassion: 'Comme Urokodaki, chaque leçon difficile que tu donnes est un acte d’amour.',
    independence: 'Comme Urokodaki, tu es heureux sur ta montagne, loin du bruit.' }],
  jigoro: ['Ancien Pilier de la Foudre, le grand-père sévère', 'Bruyant, strict et infiniment patient au fond, tu n’abandonnes jamais personne.', {
    compassion: 'Comme Jigoro, tu refuses d’abandonner les gens, même quand ils ont abandonné eux-mêmes.',
    discipline: 'Comme Jigoro, tu répètes les bases jusqu’à ce qu’elles deviennent la foudre.',
    intensity: 'Comme Jigoro, tu cries parce que tu tiens aux autres.',
    playfulness: 'Comme Jigoro, tu as l’humour d’un grand-parent, canne comprise.' }],
  kanae: ['Ancien Pilier de la Fleur', 'Chaleureuse, sereine et bienveillante même envers ceux qui le méritent le moins, tu crois que chacun peut devenir meilleur.', {
    compassion: 'Comme Kanae, tu crois que même les pires d’entre nous méritent une chance.',
    composure: 'Comme Kanae, ta douceur est une force qui ne se brise jamais.',
    playfulness: 'Comme Kanae, tu souris facilement, et sincèrement.',
    discipline: 'Comme Kanae, tu maintiens des exigences élevées avec délicatesse.' }],
  senjuro: ['Le cadet des Rengoku', 'Doux, sincère et plus courageux que tu ne le crois, tu continues d’essayer même quand le talent ne vient pas facilement.', {
    compassion: 'Comme Senjuro, tu es doux avec tout le monde, surtout avec ceux qui souffrent.',
    discipline: 'Comme Senjuro, tu continues de t’entraîner, même quand tu as l’impression que ça ne marche pas.',
    independence: 'Comme Senjuro, tu puises ta force dans ta famille et ceux qui sont à tes côtés.',
    composure: 'Comme Senjuro, tu es plus discret que ton entourage, et c’est très bien ainsi.' }],
  yoriichi: ['L’épéiste de légende', 'Humble, serein et incroyablement doué, tu accomplis des choses extraordinaires sans jamais t’en vanter.', {
    composure: 'Comme Yoriichi, tu es calme jusqu’à l’immobilité, comme un lac sans vent.',
    compassion: 'Comme Yoriichi, tu prends soin des choses simples : une fleur, un repas, un ami.',
    discipline: 'Comme Yoriichi, ta maîtrise paraît sans effort parce qu’elle est totale.',
    independence: 'Comme Yoriichi, tu suis ton propre chemin tranquille, sans besoin de public.' }],
  giyu: ['Pilier de l’Eau', 'Calme, compétent et incapable d’expliquer quoi que ce soit, tu protèges les gens sans le dire à personne.', {
    independence: 'Comme Giyu, tu restes tellement dans ton coin qu’on croit que tu n’aimes personne. C’est faux.',
    composure: 'Comme Giyu, tu restes parfaitement immobile pendant que tout le monde panique.',
    discipline: 'Comme Giyu, ta technique est précise, efficace, sans geste inutile.',
    compassion: 'Comme Giyu, tu enfreins discrètement les règles pour protéger quelqu’un qui mérite une chance.' }],
  rengoku: ['Pilier de la Flamme', 'Ardent, généreux et bruyant dans le bon sens, tu illumines chaque pièce et veilles sur tous ceux qui s’y trouvent.', {
    intensity: 'Comme Rengoku, tu brûles fort. Ton cœur est toujours en pleine flamme.',
    compassion: 'Comme Rengoku, tu crois que les forts sont nés pour protéger les faibles.',
    discipline: 'Comme Rengoku, tu t’imposes les plus hautes exigences et tu élèves les autres à ce niveau.',
    playfulness: 'Comme Rengoku, ton enthousiasme est contagieux. Délicieux !' }],
  shinobu: ['Pilier de l’Insecte', 'Souriante, vive et bien plus en colère que tu ne le montres, tu gagnes avec la tête là où d’autres utilisent les muscles.', {
    discipline: 'Comme Shinobu, tu es méticuleuse : recherche, préparation, dose parfaite.',
    composure: 'Comme Shinobu, tu gardes un sourire poli, quoi qu’il bouille en dessous.',
    playfulness: 'Comme Shinobu, tes taquineries sont douces… et aussi un avertissement.',
    ruthlessness: 'Comme Shinobu, tu peux être d’une efficacité terrifiante quand quelqu’un franchit la limite.' }],
  tengen: ['Pilier du Son, dieu de l’extravagance', 'Tape-à-l’œil, sûr de toi et farouchement protecteur des tiens, tu ne fais rien à moitié, surtout pas le style.', {
    playfulness: 'Comme Tengen, tout ce que tu fais doit être flamboyant. La sobriété n’est pas une option.',
    intensity: 'Comme Tengen, tu fais les choses en grand, fort et à fond.',
    ambition: 'Comme Tengen, tu sais que tu es quelqu’un d’important et tu ne t’en caches pas.',
    compassion: 'Comme Tengen, sous les paillettes, ta première règle est : tout le monde rentre vivant.' }],
  mitsuri: ['Pilier de l’Amour', 'Grand cœur, joyeuse et plus forte que quiconque ne l’imagine, tu aimes ouvertement et tu te bats avec férocité.', {
    compassion: 'Comme Mitsuri, ton cœur est immense, et tu n’as pas peur de le montrer.',
    playfulness: 'Comme Mitsuri, tu trouves de la joie partout : la nourriture, les amis, les petits moments doux.',
    independence: 'Comme Mitsuri, tu es au meilleur de toi-même entourée des gens que tu adores.',
    intensity: 'Comme Mitsuri, derrière la douceur se cache une force qui surprend tout le monde.' }],
  muichiro: ['Pilier de la Brume', 'Rêveur, détaché et d’un talent effrayant, tu flottes dans la vie jusqu’à ce que quelque chose compte vraiment.', {
    independence: 'Comme Muichiro, tu vis dans ta tête, et tu t’y plais.',
    composure: 'Comme Muichiro, rien ne semble t’atteindre. Tu regardes juste les nuages.',
    discipline: 'Comme Muichiro, tu as maîtrisé en quelques mois ce qui prend des années aux autres.',
    ruthlessness: 'Comme Muichiro, tu peux être d’une franchise glaciale sans même t’en rendre compte.' }],
  obanai: ['Pilier du Serpent', 'Langue acérée, méfiant et férocement loyal envers les rares que tu laisses entrer, tu fais confiance lentement et protèges entièrement.', {
    discipline: 'Comme Obanai, tu es strict, exigeant et tu attends que les règles soient respectées.',
    independence: 'Comme Obanai, tu gardes le monde à distance.',
    ruthlessness: 'Comme Obanai, tes mots peuvent couper plus profond qu’une lame.',
    composure: 'Comme Obanai, tu observes tout attentivement avant de frapper.' }],
  sanemi: ['Pilier du Vent', 'Explosif, couvert de cicatrices et impossible à intimider, tu caches un cœur protecteur derrière un ouragan.', {
    intensity: 'Comme Sanemi, tu es une tempête. Personne ne te rate quand tu entres.',
    independence: 'Comme Sanemi, tu ne fais pas facilement confiance et tu repousses les gens pour les protéger.',
    ruthlessness: 'Comme Sanemi, tu détestes la cruauté, et tu n’as aucune pitié pour ceux qui la causent.',
    discipline: 'Comme Sanemi, ta force a été gagnée de la manière la plus dure qui soit.' }],
  // TODO(owner) : remplace par ta propre lecture de Gyomei (avec les lignes anglaises). Brouillon du développeur.
  gyomei: ['Pilier de la Pierre', 'Inébranlable, doux et la personne la plus forte de la pièce, tu portes tout le monde sans jamais que ça paraisse lourd.', {
    composure: 'Comme Gyomei, tu restes calme sous n’importe quelle pression : une pierre contre laquelle la tempête se brise.',
    compassion: 'Comme Gyomei, ton premier réflexe est d’aider, et on vient te voir avec des problèmes que personne d’autre ne sait résoudre.',
    discipline: 'Comme Gyomei, ton expertise vient d’années de pratique discrète et acharnée.',
    independence: 'Comme Gyomei, tu travailles avec constance aux côtés des autres tout en gardant ton propre jugement.' }],
  tamayo: ['La médecin qui défie Muzan', 'Brillante, posée et discrètement déterminée, tu soignes, cherches et prépares le long terme.', {
    composure: 'Comme Tamayo, tu restes gracieuse et posée en travaillant sur quelque chose qui peut changer le monde.',
    compassion: 'Comme Tamayo, tu utilises ton savoir pour soigner les autres.',
    discipline: 'Comme Tamayo, ta patience se compte en années, pas en jours.',
    independence: 'Comme Tamayo, tu travailles dans l’ombre, selon tes propres règles.' }],
  yushiro: ['L’assistant dévoué de Tamayo', 'Piquant, loyal et dévoué au-delà de toute raison, tu traverserais le feu pour ta personne.', {
    intensity: 'Comme Yushiro, tes émotions sortent fort et sans filtre.',
    independence: 'Comme Yushiro, tu n’as aucun intérêt pour qui que ce soit en dehors de ton tout petit cercle.',
    ruthlessness: 'Comme Yushiro, tu es grossier avec tout le monde sauf avec la personne qui compte.',
    discipline: 'Comme Yushiro, tu es étonnamment doué quand ça compte.' }],
  kagaya: ['Chef du Corps des pourfendeurs de démons', 'Serein, persuasif et toujours trois coups d’avance, les gens te suivent sans savoir pourquoi.', {
    composure: 'Comme Kagaya, ta voix apaise une salle pleine des personnes les plus dangereuses au monde.',
    compassion: 'Comme Kagaya, tu te souviens de chaque nom et de chaque sacrifice.',
    discipline: 'Comme Kagaya, tu vois tout l’échiquier et tu planifies en conséquence.',
    ruthlessness: 'Comme Kagaya, derrière la douceur se cache une volonté de fer.' }],
  haganezuka: ['Forgeron à la passion terrifiante', 'Obsédé par ton art et terrifiant quand on le manque de respect, tu es un génie au caractère volcanique.', {
    intensity: 'Comme Haganezuka, tu n’as qu’un seul volume : le maximum.',
    discipline: 'Comme Haganezuka, ta dévotion à ton art frôle l’effrayant.',
    independence: 'Comme Haganezuka, tu fais les choses à ta façon, et seulement à ta façon.',
    playfulness: 'Comme Haganezuka, tu es involontairement hilarant (pose ce couteau, s’il te plaît).' }],
  // ——— Démons : « ton côté démon », joueur, jamais insultant ———
  muzan: ['Le Roi des démons', 'Ton côté démon veut le contrôle, la perfection et le dernier mot, pour toujours.', {
    ambition: 'Ton côté démon, comme Muzan, veut être parfait et intouchable, et attend que le monde s’adapte.',
    independence: 'Ton côté démon, comme Muzan, ne fait confiance à personne et ne délègue qu’à ceux qu’il peut remplacer.',
    ruthlessness: 'Ton côté démon, comme Muzan, n’a aucune patience pour qui le déçoit.',
    intensity: 'Ton côté démon, comme Muzan, passe d’un visage calme à la tempête en une demi-seconde.' }],
  kokushibo: ['Lune supérieure Un', 'Ton côté démon est un perfectionniste prêt à tout échanger pour devenir le meilleur.', {
    discipline: 'Ton côté démon, comme Kokushibo, s’entraîne sans relâche si c’est le prix de la perfection.',
    ambition: 'Ton côté démon, comme Kokushibo, ne supporte pas d’être second, derrière qui que ce soit.',
    composure: 'Ton côté démon, comme Kokushibo, est froid, maîtrisé et très difficile à déstabiliser.',
    independence: 'Ton côté démon, comme Kokushibo, marche seul et préfère ça.' }],
  doma: ['Lune supérieure Deux', 'Ton côté démon n’est que sourires et charme, avec absolument rien derrière les yeux.', {
    playfulness: 'Ton côté démon, comme Doma, est joyeux, bavard et charmant aux pires moments.',
    ruthlessness: 'Ton côté démon, comme Doma, peut sourire tendrement en faisant quelque chose de terrible.',
    composure: 'Ton côté démon, comme Doma, ne perd jamais son calme, parce qu’il ne ressent jamais vraiment rien.',
    independence: 'Ton côté démon, comme Doma, flotte au-dessus des drames de tout le monde.' }],
  akaza: ['Lune supérieure Trois', 'Ton côté démon vit pour le combat et ne respecte que la force.', {
    intensity: 'Ton côté démon, comme Akaza, vit pour un bon combat, plus il est dur, mieux c’est.',
    ambition: 'Ton côté démon, comme Akaza, veut toujours être plus fort, et veut que tu le sois aussi.',
    discipline: 'Ton côté démon, comme Akaza, s’entraîne sans relâche et méprise la faiblesse.',
    independence: 'Ton côté démon, comme Akaza, ne répond qu’à son propre code.' }],
  hantengu: ['Lune supérieure Quatre', 'Ton côté démon est un maître du « c’est pas ma faute », qui se divise en excuses sur commande.', {
    ruthlessness: 'Ton côté démon, comme Hantengu, trouve toujours quelqu’un d’autre à blâmer.',
    independence: 'Ton côté démon, comme Hantengu, préfère se cacher plutôt qu’assumer.',
    intensity: 'Ton côté démon, comme Hantengu, peut se diviser en une douzaine d’humeurs en quelques secondes.',
    ambition: 'Ton côté démon, comme Hantengu, veut surtout survivre à la journée.' }],
  gyokko: ['Lune supérieure Cinq', 'Ton côté démon est un génie artistique autoproclamé qui ne supporte pas la critique.', {
    ambition: 'Ton côté démon, comme Gyokko, pense que son œuvre est un chef-d’œuvre, et exige des applaudissements.',
    independence: 'Ton côté démon, comme Gyokko, crée seul, pour un public d’une seule personne.',
    playfulness: 'Ton côté démon, comme Gyokko, est théâtral, dramatique et très fier de ses vases.',
    ruthlessness: 'Ton côté démon, comme Gyokko, prend la moindre critique très, très personnellement.' }],
  daki: ['Lune supérieure Six', 'Ton côté démon est une diva : magnifique, vaniteuse et furieuse quand on l’ignore.', {
    ruthlessness: 'Ton côté démon, comme Daki, n’a aucune patience pour ceux qu’il juge inférieurs.',
    intensity: 'Ton côté démon, comme Daki, pique des crises spectaculaires.',
    ambition: 'Ton côté démon, comme Daki, doit être le plus beau, le plus admiré, toujours.',
    playfulness: 'Ton côté démon, comme Daki, adore être le centre de l’attention.' }],
  gyutaro: ['Lune supérieure Six', 'Ton côté démon en veut au monde entier, mais le brûlerait pour la seule personne qu’il aime.', {
    ruthlessness: 'Ton côté démon, comme Gyutaro, tient les comptes, et récupère chaque dette.',
    intensity: 'Ton côté démon, comme Gyutaro, a une jalousie brûlante.',
    compassion: 'Ton côté démon, comme Gyutaro, est tordu, mais loyal envers sa famille jusqu’au bout.',
    ambition: 'Ton côté démon, comme Gyutaro, veut ce que tout le monde a reçu gratuitement.' }],
  kaigaku: ['L’autre élève de Jigoro', 'Ton côté démon est fier, rancunier et convaincu de mériter plus de reconnaissance.', {
    ambition: 'Ton côté démon, comme Kaigaku, pense mériter la première place, et en veut à quiconque l’obtient.',
    independence: 'Ton côté démon, comme Kaigaku, ne fait confiance qu’à lui-même.',
    ruthlessness: 'Ton côté démon, comme Kaigaku, méprise quiconque il juge plus faible.',
    intensity: 'Ton côté démon, comme Kaigaku, crépite d’une colère à peine contenue.' }],
  nakime: ['La démone au biwa', 'Ton côté démon est silencieux, précis, et fait tourner toute l’opération sans bruit.', {
    composure: 'Ton côté démon, comme Nakime, ne dit jamais un mot de trop.',
    discipline: 'Ton côté démon, comme Nakime, fait tout tourner d’une seule note parfaite.',
    independence: 'Ton côté démon, comme Nakime, fait son travail seul et ne veut aucune compagnie.',
    ruthlessness: 'Ton côté démon, comme Nakime, est efficace, et pas du tout sentimental.' }],
  rui: ['Lune inférieure Cinq, la « famille » araignée', 'Ton côté démon veut une famille parfaite, selon ses propres règles très strictes.', {
    ruthlessness: 'Ton côté démon, comme Rui, a des règles, et ne pardonne à personne de les enfreindre.',
    discipline: 'Ton côté démon, comme Rui, veut que chacun reste à sa place.',
    intensity: 'Ton côté démon, comme Rui, a une fureur froide et silencieuse.',
    ambition: 'Ton côté démon, comme Rui, veut des liens si forts que rien ne peut les briser.' }],
  enmu: ['Lune inférieure Un, maître des rêves', 'Ton côté démon adore les jeux d’esprit et regarder les gens se tortiller, très poliment.', {
    ruthlessness: 'Ton côté démon, comme Enmu, savoure un peu trop le moment où quelqu’un comprend qu’il s’est fait avoir.',
    playfulness: 'Ton côté démon, comme Enmu, traite tout comme un jeu, surtout les autres.',
    independence: 'Ton côté démon, comme Enmu, préfère agir en coulisses.',
    ambition: 'Ton côté démon, comme Enmu, cherche toujours une promotion.' }],
  kyogai: ['Le démon au tambour', 'Ton côté démon est un artiste méconnu, avec une rancune et un tambour.', {
    ambition: 'Ton côté démon, comme Kyogai, veut désespérément que son œuvre soit prise au sérieux.',
    independence: 'Ton côté démon, comme Kyogai, s’enferme pour ruminer.',
    intensity: 'Ton côté démon, comme Kyogai, retourne toute la pièce quand on le provoque.',
    discipline: 'Ton côté démon, comme Kyogai, ne laissera personne marcher sur ses manuscrits.' }],
  susamaru: ['La démone au temari', 'Ton côté démon veut juste jouer, et exige bruyamment qu’on joue avec lui.', {
    playfulness: 'Ton côté démon, comme Susamaru, transforme tout en partie de balle, une partie dangereuse.',
    intensity: 'Ton côté démon, comme Susamaru, a toute l’énergie d’un enfant au festival.',
    ambition: 'Ton côté démon, comme Susamaru, adore montrer ce qu’il sait faire.',
    ruthlessness: 'Ton côté démon, comme Susamaru, ne sait pas quand le jeu est allé trop loin.' }],
};

const B = {
  water: ['Souffle de l’Eau', 'Adaptable et calme : tu contournes les obstacles au lieu de foncer dedans.'],
  flame: ['Souffle de la Flamme', 'Tout cœur, toute chaleur : tu avances à pleins poumons.'],
  thunder: ['Souffle de la Foudre', 'Un seul geste parfait, plus rapide qu’un battement de cils.'],
  wind: ['Souffle du Vent', 'Brut, tranchant et implacable : tu ne ralentis pour personne.'],
  stone: ['Souffle de la Pierre', 'Inébranlable et stable : tu es le sol sur lequel les autres se tiennent.'],
  mist: ['Souffle de la Brume', 'Difficile à cerner, plus difficile encore à attraper : tu dérives, puis tu frappes.'],
  serpent: ['Souffle du Serpent', 'Sinueux et précis : tu trouves l’angle que personne ne voit.'],
  love: ['Souffle de l’Amour', 'Souple, joyeux, et plus fort qu’il n’y paraît.'],
  sound: ['Souffle du Son', 'Fort, rythmé, explosif : tu sais faire une entrée.'],
  insect: ['Souffle de l’Insecte', 'Léger, malin, et mortel exactement à la bonne dose.'],
  beast: ['Souffle de la Bête', 'Pas de règles, pas de forme : de l’instinct pur, et des crocs.'],
  flower: ['Souffle de la Fleur', 'Gracieux et précis : une beauté qui cache un tranchant.'],
  sun: ['Souffle du Soleil', 'Le plus rare de tous. Calme, bon et discipliné à la fois : le souffle originel.'],
};

const R = {
  mizunoto: 'Le rang le plus bas, mais le plus grand cœur. Murata croit en toi.',
  mizunoe: 'Tu as survécu à la Sélection finale. C’est déjà beaucoup.',
  kanoto: 'Ton corbeau commence à te respecter. Un peu.',
  kanoe: 'Des mains sûres, un courage qui grandit.',
  tsuchinoto: 'Au milieu du Corps, et en pleine ascension.',
  tsuchinoe: 'Quand les choses tournent mal, c’est toi qu’on regarde.',
  hinoto: 'Aguerri·e. Les Kakushi sont soulagés quand tu arrives.',
  hinoe: 'Tes décisions sont rapides et tes mains, sûres.',
  kinoto: 'À un pas du sommet. Les Piliers connaissent ton nom.',
  kinoe: 'Le plus haut rang ordinaire. Presque l’étoffe d’un Pilier.',
  hashira: 'Tu es un Pilier. Le Corps repose sur des gens comme toi.',
};
const RANK_NAMES = { hashira: 'Pilier' };

const text = {};
for (const [id, [qt, answers]] of Object.entries(Q)) {
  text[`q:${id}`] = qt;
  answers.forEach((a, i) => { text[`a:${id}${'abcd'[i]}`] = a; });
}
for (const [id, [title, blurb, phrases]] of Object.entries(C)) {
  text[`c:${id}:title`] = title;
  text[`c:${id}:blurb`] = blurb;
  for (const [t, p] of Object.entries(phrases)) text[`c:${id}:phrase:${t}`] = p;
}
for (const [id, [name, line]] of Object.entries(B)) { text[`b:${id}:name`] = name; text[`b:${id}:line`] = line; }
for (const [id, line] of Object.entries(R)) {
  text[`r:${id}:line`] = line;
  text[`r:${id}:name`] = RANK_NAMES[id] ?? id[0].toUpperCase() + id.slice(1);
}

export const TEXT_FR = Object.fromEntries(Object.entries(text).map(([k, v]) => [k, typo(v)]));

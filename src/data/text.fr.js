// Texte français (tutoiement, vocabulaire de la VF : Pilier, Souffle, Lune supérieure, côté démon).
// Clés : voir core/localize.js textKeys(). Sans spoiler au-delà de l'arc du Village des forgerons.
// On écrit « es-tu ? » avec une espace normale : typo() la remplace par une espace fine insécable.
const typo = (s) => s.replace(/ ([?!:;»])/g, ' $1').replace(/« /g, '« ');

const Q = {
  q1: ['Tard le soir, un ami t’appelle : il a besoin de ton aide tout de suite, à l’autre bout de la ville. Tu…', [
    'Es dehors en deux minutes. Tu es toujours prêt·e.',
    'Râles, demandes dix minutes de plus, puis te dépêches pour rattraper ton retard.',
    'Appelles une ou deux autres personnes, pour que personne ne gère ça seul.',
    'Demandes ce que tu y gagnes avant de bouger.']],
  q2: ['Quelqu’un de plus jeune que toi se fige devant la foule à qui il doit parler. Tu…', [
    'Te places à côté de lui sans un mot.',
    'Lui dis fermement de se ressaisir. Tout le monde regarde.',
    'Le guides calmement : respire, regarde un seul visage, commence.',
    'Le laisses se débrouiller. C’est comme ça qu’on apprend.']],
  q3: ['Ça fait des semaines que tu essaies d’apprendre quelque chose de difficile, et ça ne marche toujours pas. Tu…', [
    'Continues à t’entraîner, chaque jour, aussi longtemps qu’il le faudra.',
    'Cherches un raccourci. Il y a toujours un moyen plus malin.',
    'Te plains bruyamment à qui veut l’entendre, puis continues quand même.',
    'Décides que ce n’est pas digne de toi. Tu es fait·e pour de plus grandes choses.']],
  q4: ['Pour une fois, tous tes amis sont libres le même soir. Tu…', [
    'Cuisines pour tout le monde et veilles à ce que chacun mange avant toi.',
    'T’éclipses pour te consacrer à tes propres affaires, seul·e.',
    'Lances un jeu ou un défi bruyant… et le gagnes.',
    'Restes en retrait à écouter les autres parler.']],
  q5: ['On te propose une belle opportunité, mais seulement si tu trahis un ami dans son dos. Tu…', [
    'Refuses aussitôt. Certaines limites ne bougent pas.',
    'Leur ris au nez et racontes tout à ton ami.',
    'Hésites. Juste une seconde, tu es tenté·e.',
    'Fais semblant d’accepter, puis retournes la situation contre eux.']],
  q6: ['Quelqu’un se moque de ton ami devant un groupe. Tu…', [
    'Te plantes devant lui. Tout de suite.',
    'Lâches une phrase glaciale qui clôt la discussion.',
    'Fais une blague qui retourne tout le monde contre lui.',
    'Restes en dehors. Ce ne sont pas tes affaires.']],
  q7: ['La personne qui décide (un aîné, un parent, un entraîneur, peu importe) te demande de faire quelque chose d’une façon que tu sais mauvaise. Tu…', [
    'Le fais à sa façon quand même. Si c’est elle qui décide, il y a une raison.',
    'L’ignores et le fais à ta façon, seul·e.',
    'Prépares un meilleur plan et le lui montres avant de commencer.',
    'Te lances et improvises. Les plans, c’est pour les prudents.']],
  q8: ['Quel compliment te toucherait le plus ?', [
    '« Personne n’est plus fort que toi. »',
    '« Tu ne laisses jamais personne tomber. »',
    '« Tout est plus lumineux quand tu es là. »',
    '« Rien ne semble jamais t’ébranler. »']],
  q9: ['Tu perds devant tout le monde : un jeu, un match, une dispute. Tu…', [
    'Félicites l’autre et demandes une revanche.',
    'Bouillonnes. Tu t’entraîneras jusqu’à l’écraser.',
    'En ris. Le repas t’attend.',
    'Décides en silence qu’il le paiera un jour.']],
  q10: ['Une voisine âgée te sert fièrement un plat que tu ne supportes vraiment pas. Tu…', [
    'Manges jusqu’à la dernière bouchée et la remercies chaleureusement.',
    'Lui dis poliment que ce n’est pas pour toi. L’honnêteté d’abord.',
    'En fais tout un drame en te forçant à finir.',
    'Repousses l’assiette. Tu ne manges pas ce que tu n’aimes pas.']],
  q11: ['Quand un désaccord tourne au vrai conflit, ta façon de faire, c’est…', [
    'Frapper fort et vite, et régler ça tout de suite.',
    'Rester patient·e : écouter, et attendre le bon moment.',
    'Déstabiliser l’autre. Tu ne fais jamais ce qu’on attend.',
    'Protéger d’abord ceux qui t’entourent. Gagner passe après.']],
  q12: ['Quelqu’un qui a fait du mal à des gens que tu aimes s’effondre en larmes et te supplie de lui pardonner. Tu…', [
    'Lui pardonnes, sincèrement.',
    'T’en vas. Ses larmes n’effacent pas ce qu’il a fait.',
    'Te figes. Tu ne sais plus quoi ressentir.',
    'Poses d’abord des questions. Tu veux comprendre ce qui s’est passé.']],
  q13: ['Si tu pouvais vivre n’importe où, pour de bon, tu choisirais…', [
    'Un quartier animé où tout le monde connaît ton nom.',
    'Un endroit calme, loin de tout le monde.',
    'Une grande et belle maison. Tu l’aurais bien méritée.',
    'Un endroit où tu peux enseigner et transmettre ce que tu sais.']],
  q14: ['Quelqu’un s’attribue, devant tout le monde, quelque chose que tu as fait. Tu…', [
    'Laisses couler. C’est fait, et c’est tout ce qui compte.',
    'Rétablis la vérité, haut et fort, sur-le-champ.',
    'Es blessé·e et ne dis rien.',
    'Le retiens. Ça n’arrivera pas deux fois.']],
  q15: ['Qu’est-ce qui te fait le plus peur ?', [
    'Perdre les gens que tu aimes.',
    'Être oublié·e.',
    'Mourir. Tu ferais presque n’importe quoi pour rester en vie.',
    'Être faible au moment où ça compte vraiment.']],
  q16: ['Tout part en vrille autour de toi : des gens sont blessés, ça crie, ça panique. Tu…', [
    'T’occupes d’abord des blessés, puis du reste.',
    'Fonces droit sur le problème, seul·e, tout de suite.',
    'Appelles à l’aide et organises tout le monde pour tenir le coup.',
    'Restes en retrait et observes jusqu’à voir exactement où frapper.']],
  q17: ['Pour tes amis, en un mot, tu es…', [
    'Bruyant·e.',
    'Gentil·le.',
    'Mystérieux·se.',
    'Déterminé·e.']],
  q18: ['Une grande fête a lieu dans ton quartier pendant ton seul jour de repos. Tu…', [
    'Es premier·ère dans la file de chaque jeu et de chaque stand.',
    'Y vas, surtout pour garder un œil sur les plus jeunes.',
    'N’y vas pas. Tu as des choses à faire avancer.',
    'Y vas seul·e et regardes tout depuis un coin tranquille.']],
  q19: ['Quelqu’un de brillant dans ce que tu veux apprendre propose de t’enseigner, mais il est dur et cruel. Tu…', [
    'Acceptes. Les résultats, c’est les résultats.',
    'Refuses. Tu trouveras ta propre voie.',
    'Acceptes, et essaies de l’adoucir en chemin.',
    'Acceptes, gardes la tête baissée et tiens bon.']],
  q20: ['Après la journée la plus longue et la plus dure depuis longtemps, tu te couches enfin. Tu ressens…', [
    'Une gratitude tranquille.',
    'La faim. Une faim immense.',
    'L’envie d’en découdre dès demain.',
    'Un peu de regret que ce soit fini. C’est dans le chaos que tu te sens le plus vivant·e.']],
};

// [titre, blurb, { trait: phrase }]
const C = {
  tanjiro: ['Bretteur au cœur d’eau et de soleil', 'Bonté à toute épreuve et tête dure comme une montagne : tu continues longtemps après que les autres ont abandonné.', {
    compassion: 'Comme Tanjiro, tu ressens la douleur des autres comme la tienne, même celle de ton ennemi.',
    discipline: 'Comme Tanjiro, tu crois que le travail bat le talent, et tu le prouves chaque jour.',
    composure: 'Comme Tanjiro, tu gardes la tête claire quand il le faut et tu flaires ce que les autres ratent.',
    intensity: 'Comme Tanjiro, un feu couve sous ta gentillesse, et il se voit quand on menace ceux que tu aimes.' }],
  nezuko: ['Le démon qui protège les humains', 'Douceur, férocité et une loyauté sans mots : tu protèges les tiens d’abord, et tu ne poses jamais de questions.', {
    compassion: 'Comme Nezuko, tu te placerais entre ta famille et n’importe quoi, sans explication.',
    intensity: 'Comme Nezuko, on te sous-estime… jusqu’à ce que tu enfonces la porte.',
    composure: 'Comme Nezuko, tu restes étonnamment calme, même quand tout part en vrille autour de toi.',
    playfulness: 'Comme Nezuko, tu as un côté doux et joueur qui détend tout le monde.' }],
  zenitsu: ['Souffle de la Foudre, Première Forme uniquement', 'Du bruit, de la peur et un talent caché : tu te plains tout le trajet… puis tu sauves la situation quand même.', {
    compassion: 'Comme Zenitsu, ton cœur est immense, surtout pour ceux qui ont été gentils avec toi.',
    playfulness: 'Comme Zenitsu, tu transformes chaque crise en tragédie théâtrale, et on t’adore pour ça.',
    composure: 'Comme Zenitsu, la panique est ta langue maternelle… mais quand ça compte vraiment, quelque chose en toi devient silencieux et redoutable.',
    independence: 'Comme Zenitsu, tu donnes le meilleur de toi quand personne ne regarde.' }],
  inosuke: ['Souffle de la Bête, roi de la montagne', 'Sauvage et impossible à ignorer, tu fonces tête baissée sur chaque défi, et sur chaque adversaire.', {
    intensity: 'Comme Inosuke, tu réponds à chaque problème en chargeant à pleine puissance. La subtilité, c’est pour les autres.',
    independence: 'Comme Inosuke, personne ne t’a appris les règles, et ça se voit.',
    ambition: 'Comme Inosuke, il te faut être au sommet, et tu l’annonces à qui veut l’entendre.',
    playfulness: 'Comme Inosuke, tu es chaotique, drôle et totalement sincère.' }],
  kanao: ['Souffle de la Fleur, l’épéiste qui s’en remet à pile ou face', 'Discrétion, précision et une voix qui se trouve peu à peu : tu vois bien plus que tu ne le dis.', {
    composure: 'Comme Kanao, ton visage reste calme et ton regard affûté, quoi qu’il se passe en toi.',
    discipline: 'Comme Kanao, tu t’entraînes avec une précision qui laisse les autres derrière, sans bruit.',
    independence: 'Comme Kanao, tu gardes tes pensées pour toi, même au milieu des autres.',
    compassion: 'Comme Kanao, ton cœur s’ouvre, un petit choix courageux à la fois.' }],
  genya: ['Le pourfendeur qui se bat à sa façon', 'Des angles durs, un cœur tendre caché et un besoin brûlant de faire tes preuves : tu ne prends jamais le chemin facile.', {
    intensity: 'Comme Genya, tu y vas à fond, à chaque fois, quitte à inquiéter ceux qui t’entourent.',
    ambition: 'Comme Genya, tu veux désespérément faire tes preuves auprès d’une personne qui compte.',
    independence: 'Comme Genya, tu as trouvé ta propre voie quand la voie habituelle t’était fermée.',
    compassion: 'Comme Genya, derrière ton air renfrogné se cache quelqu’un qui tient profondément aux autres.' }],
  aoi: ['La cheville ouvrière du Domaine des Papillons', 'Organisation, franchise et un cœur tendre bien caché : tu fais tourner les choses (et les gens).', {
    discipline: 'Comme Aoi, tu tiens tout d’une main ferme : horaires, règles, chaque chose à sa place.',
    compassion: 'Comme Aoi, tu montres que tu tiens aux gens en t’assurant qu’ils prennent vraiment leurs médicaments.',
    independence: 'Comme Aoi, tu donnes le meilleur de toi dans une équipe qui compte sur toi.',
    intensity: 'Comme Aoi, tu n’as aucune patience pour les bêtises, et tu le dis.' }],
  murata: ['Le pourfendeur le plus normal du monde', 'Fiable et toujours là, tu es la personne qu’on oublie de remercier.', {
    compassion: 'Comme Murata, ta gentillesse passe par mille petits gestes qu’on ne remarque qu’après coup.',
    playfulness: 'Comme Murata, tu sais rire de toi-même, ce qui est plus rare que n’importe quel souffle.',
    discipline: 'Comme Murata, tu es toujours au rendez-vous. C’est ton super-pouvoir.',
    independence: 'Comme Murata, tu donnes le meilleur de toi aux côtés des autres, jamais sous les projecteurs.' }],
  sabito: ['L’élève d’Urokodaki au masque de renard', 'Tu exiges beaucoup parce que tu tiens aux autres : tu les pousses fort pour qu’ils rentrent vivants.', {
    discipline: 'Comme Sabito, tu crois à l’entraînement jusqu’à la douleur, et tu attends la même chose des autres.',
    compassion: 'Comme Sabito, ta dureté est en fait une promesse : je veux que tu survives.',
    composure: 'Comme Sabito, tu parles franchement et restes calme quand les autres s’affolent.',
    intensity: 'Comme Sabito, tu ne laisses personne se contenter de moins que son meilleur.' }],
  makomo: ['La douce élève d’Urokodaki au masque de renard', 'Calme et sage, tu enseignes par l’exemple et un sourire au bon moment.', {
    compassion: 'Comme Makomo, tu encourages les gens avec douceur jusqu’à ce qu’ils croient en eux.',
    composure: 'Comme Makomo, ton calme est contagieux : on respire mieux près de toi.',
    discipline: 'Comme Makomo, tu sais que la technique compte plus que la force brute.',
    playfulness: 'Comme Makomo, une étincelle espiègle brille derrière ta patience.' }],
  urokodaki: ['Ancien Pilier de l’Eau, mentor au masque de tengu', 'Sévérité, sagesse et tendresse discrète : tu es le mentor qui croit aux gens avant qu’ils ne croient en eux-mêmes.', {
    discipline: 'Comme Urokodaki, tes exigences sont brutales, et elles forgent des légendes.',
    composure: 'Comme Urokodaki, ton visage ne laisse rien paraître (autant porter un masque).',
    compassion: 'Comme Urokodaki, chaque leçon difficile que tu donnes est un acte d’amour.',
    independence: 'Comme Urokodaki, tu te sens bien sur ta montagne, loin du bruit.' }],
  jigoro: ['Ancien Pilier de la Foudre, le grand-père sévère', 'Du bruit, de la rigueur et une patience infinie au fond : tu n’abandonnes jamais personne.', {
    compassion: 'Comme Jigoro, tu refuses d’abandonner les gens, même quand ils ont baissé les bras.',
    discipline: 'Comme Jigoro, tu répètes les bases jusqu’à ce qu’elles deviennent la foudre.',
    intensity: 'Comme Jigoro, tu cries parce que tu tiens aux autres.',
    playfulness: 'Comme Jigoro, tu as l’humour d’un grand-parent, canne comprise.' }],
  kanae: ['Ancien Pilier de la Fleur', 'Chaleur, sérénité et bienveillance, même envers ceux qui la méritent le moins : tu crois que chacun peut devenir meilleur.', {
    compassion: 'Comme Kanae, tu crois que même les pires d’entre nous méritent une chance.',
    composure: 'Comme Kanae, ta douceur est une force qui ne se brise jamais.',
    playfulness: 'Comme Kanae, tu souris facilement, et sincèrement.',
    discipline: 'Comme Kanae, tu maintiens des exigences élevées avec délicatesse.' }],
  senjuro: ['Le cadet des Rengoku', 'Douceur, sincérité et plus de courage que tu ne le crois : tu continues d’essayer même quand le talent ne vient pas facilement.', {
    compassion: 'Comme Senjuro, tu fais preuve de douceur avec tout le monde, surtout avec ceux qui souffrent.',
    discipline: 'Comme Senjuro, tu continues de t’entraîner, même quand tu as l’impression que ça ne marche pas.',
    independence: 'Comme Senjuro, tu puises ta force dans ta famille et ceux qui sont à tes côtés.',
    composure: 'Comme Senjuro, tu fais moins de bruit que ton entourage, et c’est très bien ainsi.' }],
  yoriichi: ['L’épéiste de légende', 'Humilité, sérénité et un talent inouï : tu accomplis des choses extraordinaires sans jamais t’en vanter.', {
    composure: 'Comme Yoriichi, tu es calme jusqu’à l’immobilité, comme un lac sans vent.',
    compassion: 'Comme Yoriichi, tu prends soin des choses simples : une fleur, un repas, un ami.',
    discipline: 'Comme Yoriichi, ta maîtrise paraît sans effort parce qu’elle est totale.',
    independence: 'Comme Yoriichi, tu suis ton propre chemin tranquille, sans besoin de public.' }],
  giyu: ['Pilier de l’Eau', 'Calme, capable et incapable d’expliquer quoi que ce soit : tu protèges les gens sans le dire à personne.', {
    independence: 'Comme Giyu, tu restes tellement dans ton coin qu’on croit que tu n’aimes personne. C’est faux.',
    composure: 'Comme Giyu, tu restes parfaitement immobile pendant que tout le monde panique.',
    discipline: 'Comme Giyu, ta technique est précise, efficace, sans geste inutile.',
    compassion: 'Comme Giyu, tu enfreins discrètement les règles pour protéger quelqu’un qui mérite une chance.' }],
  rengoku: ['Pilier de la Flamme', 'Ardeur, générosité et du bruit dans le bon sens : tu illumines chaque pièce et veilles sur tous ceux qui s’y trouvent.', {
    intensity: 'Comme Rengoku, tu brûles fort. Ton cœur est toujours en pleine flamme.',
    compassion: 'Comme Rengoku, tu crois que les forts sont nés pour protéger les faibles.',
    discipline: 'Comme Rengoku, tu t’imposes les plus hautes exigences et tu élèves les autres à ce niveau.',
    playfulness: 'Comme Rengoku, ton enthousiasme est contagieux. Délicieux !' }],
  shinobu: ['Pilier de l’Insecte', 'Un sourire, un esprit vif et bien plus de colère que tu ne le montres : tu gagnes avec la tête là où d’autres utilisent les muscles.', {
    discipline: 'Comme Shinobu, tu ne laisses rien au hasard : recherche, préparation, dose parfaite.',
    composure: 'Comme Shinobu, tu gardes un sourire poli, quoi qu’il bouille en dessous.',
    playfulness: 'Comme Shinobu, tes taquineries sont douces… et aussi un avertissement.',
    ruthlessness: 'Comme Shinobu, tu peux être d’une efficacité terrifiante quand quelqu’un franchit la limite.' }],
  tengen: ['Pilier du Son, dieu de l’extravagance', 'Du panache, de l’assurance et une loyauté féroce envers les tiens : tu ne fais rien à moitié, surtout pas le style.', {
    playfulness: 'Comme Tengen, tout ce que tu fais doit être flamboyant. La sobriété n’est pas une option.',
    intensity: 'Comme Tengen, tu fais les choses en grand, fort et à fond.',
    ambition: 'Comme Tengen, tu sais que tu es quelqu’un d’important et tu ne t’en caches pas.',
    compassion: 'Comme Tengen, sous les paillettes, ta première règle est : tout le monde rentre vivant.' }],
  mitsuri: ['Pilier de l’Amour', 'Un grand cœur, de la joie et plus de force que quiconque ne l’imagine : tu aimes ouvertement et tu te bats avec férocité.', {
    compassion: 'Comme Mitsuri, ton cœur est immense, et tu n’as pas peur de le montrer.',
    playfulness: 'Comme Mitsuri, tu trouves de la joie partout : la nourriture, les amis, les petits moments doux.',
    independence: 'Comme Mitsuri, tu t’épanouis au milieu des gens que tu adores.',
    intensity: 'Comme Mitsuri, derrière la douceur se cache une force qui surprend tout le monde.' }],
  muichiro: ['Pilier de la Brume', 'La tête dans les nuages et un talent effrayant : tu flottes dans la vie jusqu’à ce que quelque chose compte vraiment.', {
    independence: 'Comme Muichiro, tu vis dans ta tête, et tu t’y plais.',
    composure: 'Comme Muichiro, rien ne semble t’atteindre. Tu regardes juste les nuages.',
    discipline: 'Comme Muichiro, tu as maîtrisé en quelques mois ce qui prend des années aux autres.',
    ruthlessness: 'Comme Muichiro, tu peux être d’une franchise glaciale sans même t’en rendre compte.' }],
  obanai: ['Pilier du Serpent', 'Une langue acérée, de la méfiance et une loyauté féroce envers les rares que tu laisses entrer : tu fais confiance lentement et protèges entièrement.', {
    discipline: 'Comme Obanai, tu as des exigences strictes et tu attends que les règles soient respectées.',
    independence: 'Comme Obanai, tu gardes le monde à distance.',
    ruthlessness: 'Comme Obanai, tes mots peuvent couper plus profond qu’une lame.',
    composure: 'Comme Obanai, tu observes tout attentivement avant de frapper.' }],
  sanemi: ['Pilier du Vent', 'Des cicatrices, un tempérament explosif et rien ne t’intimide : tu caches un cœur protecteur derrière un ouragan.', {
    intensity: 'Comme Sanemi, tu es une tempête. Personne ne te rate quand tu entres.',
    independence: 'Comme Sanemi, tu ne fais pas facilement confiance et tu repousses les gens pour les protéger.',
    ruthlessness: 'Comme Sanemi, tu détestes la cruauté, et tu n’as aucune pitié pour ceux qui la causent.',
    discipline: 'Comme Sanemi, ta force a été gagnée de la manière la plus dure qui soit.' }],
  // TODO(owner) : remplace par ta propre lecture de Gyomei (avec les lignes anglaises). Brouillon du développeur.
  gyomei: ['Pilier de la Pierre', 'Inébranlable, d’une grande douceur et la personne la plus forte de la pièce : tu portes tout le monde sans jamais que ça paraisse lourd.', {
    composure: 'Comme Gyomei, tu restes calme sous n’importe quelle pression : une pierre contre laquelle la tempête se brise.',
    compassion: 'Comme Gyomei, ton premier réflexe est d’aider, et on vient te voir avec des problèmes que personne d’autre ne sait résoudre.',
    discipline: 'Comme Gyomei, ton expertise vient d’années de pratique discrète et acharnée.',
    independence: 'Comme Gyomei, tu travailles avec constance aux côtés des autres tout en gardant ton propre jugement.' }],
  tamayo: ['La médecin qui défie Muzan', 'Intelligence, calme et détermination discrète : tu soignes, cherches et prépares le long terme.', {
    composure: 'Comme Tamayo, tu gardes ta grâce et ton calme en travaillant sur quelque chose qui peut changer le monde.',
    compassion: 'Comme Tamayo, tu utilises ton savoir pour soigner les autres.',
    discipline: 'Comme Tamayo, ta patience se compte en années, pas en jours.',
    independence: 'Comme Tamayo, tu travailles dans l’ombre, selon tes propres règles.' }],
  yushiro: ['L’assistant dévoué de Tamayo', 'Du piquant, de la loyauté et un dévouement au-delà de toute raison : tu traverserais le feu pour la personne qui compte pour toi.', {
    intensity: 'Comme Yushiro, tes émotions sortent fort et sans filtre.',
    independence: 'Comme Yushiro, tu n’as aucun intérêt pour qui que ce soit en dehors de ton tout petit cercle.',
    ruthlessness: 'Comme Yushiro, tu manques de tact avec tout le monde sauf avec la personne qui compte.',
    discipline: 'Comme Yushiro, tu as un talent étonnant quand ça compte.' }],
  kagaya: ['Chef du Corps des pourfendeurs de démons', 'Sérénité, persuasion et toujours trois coups d’avance : on te suit sans trop savoir pourquoi.', {
    composure: 'Comme Kagaya, ta voix apaise une salle pleine des personnes les plus dangereuses au monde.',
    compassion: 'Comme Kagaya, tu te souviens de chaque nom et de chaque sacrifice.',
    discipline: 'Comme Kagaya, tu vois tout l’échiquier et tu planifies en conséquence.',
    ruthlessness: 'Comme Kagaya, derrière la douceur se cache une volonté de fer.' }],
  haganezuka: ['Forgeron à la passion terrifiante', 'Une obsession pour ton art et une colère terrifiante quand on lui manque de respect : tu es un génie au caractère volcanique.', {
    intensity: 'Comme Haganezuka, tu n’as qu’un seul volume : le maximum.',
    discipline: 'Comme Haganezuka, ta dévotion à ton art frôle l’effrayant.',
    independence: 'Comme Haganezuka, tu fais les choses à ta façon, et seulement à ta façon.',
    playfulness: 'Comme Haganezuka, tu fais rire sans le vouloir (pose ce couteau, s’il te plaît).' }],
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
  doma: ['Lune supérieure Deux', 'Ton côté démon n’est que sourires et charme, et rien du tout derrière les yeux.', {
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

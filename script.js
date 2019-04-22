// JavaScript
var allaKort; //Variabel på bilder .
var blandadeValdaKort; // Kort som är redan dubbla,blandas om för spelet så att dom inte ligger bredvid varandra.
var spelStorlek; // vald spelstorlek.
var startGameBtn; // referens till startgame knappen(button).
var nextBtn; // referens till knappen next.
var picsElems; // Referens till DIV där spelkorten finns,används vid ändring av spelplanens storlek.
var picsLinks; // Referens till img-brickorna.
var antalKlick; //Räknare för hur många kort du gissat på under en vända
var antalVandor; //Antal gånger som man vänt 2 st kort.
var antalVandorText; //Referens till span där man skriver ut hur många vändor som gjorts.
var antalSpel; //Räknare för hur många gånger du spelat färdigt spelet.
var antalSpelText; //Reverens till stället i menyn till höger där antalSpel skrivs ut.
var idOne; //Variabel som fångar upp ID från det första kortet som vänds varje runda. Jämförs med idTwo när två kort har vänts.
var idTwo; //Variabel som fångar upp ID från det andra kortet som vänds varje runda. Jämförs med idOne när två kort har vänts.
var hittade; //Räknare för antalet par som spelaren har hittat, jämförs med ID i drop-down menyn och avslutar spelet om t.ex. 8 av 8 möjliga har hittats.
var antalPoang; //Variabel för antal poäng som spelaren får under ett spel.
var antalPoangTotal; //Variabel för antal poäng som spelaren samlat totalt under alla sina spelomgångar.
var antalPoangTotalText; //Referens till stället i menyn till höger där totala antalet poäng skrivs ut.
var snittPoang; // Variabel som räknas ut genom att dela totala antalet poäng med antalet spel.
var snittPoangText; //Referens till stället i menyn till höger där genomsnittliga poängen skrivs ut.
var visadolj; //Referens till a-elementet (länk-knappen) som visar/döljer extra info i menyn till höger.
var meddelande; //Referens till DIV där man skriver ut meddelanden till spelaren.

function init() {
  startGameBtn = document.getElementById("startGameBtn"); //Definiering av startknappen
  addListener(startGameBtn, "click", startGame); //Koppling av klickfunktionen
  startGameBtn.disabled = false; //Aktivering av startknappen ifall spelaren uppdaterat sidan mitt i en runda och knappen därför är avaktiverad.

  nextBtn = document.getElementById("nextBtn"); //Definiering av nextknappen
  addListener(nextBtn, "click", nextStep); // Koppling av klickfunktionen

  antalVandorText = document.getElementById("turnNr"); //definiering span-elementet där antalet vändor skrivs ut.

  picsElems = document.getElementById("bricks"); //Definiering DIV där korten finns. Används för att ändra storlek på spelplanen.
  picsLinks = picsElems.getElementsByTagName("img"); //Definiering av spelkorten, varje spelkort (IMG) matas till variabeln som är en array.

  spelStorlek = document.getElementById("nrOfBricksMenu"); //Definiering av drop-down menyn där spelaren väljer spelstorlek.
  addListener(spelStorlek, "change", spelBord); //Koppling av funktion som sker vid ändring av drop-down menyns värde.

  meddelande = document.getElementById("message"); //Definering av området där meddelanden till spelaren skrivs ut.
  antalPoangTotalText = document.getElementById("userTotPoints"); //Definering av området där totala antalet poäng skrivs ut.
  antalSpelText = document.getElementById("userCountGames"); // Definiering av området där antalet spel skrivs ut.
  snittPoangText = document.getElementById("userMeanPoints"); //Definiering av orådet där genomsnittliga poängen skrivs ut.

  visadolj = document.getElementsByTagName("a"); // Deiniering av visa/dolj knappen.
  addListener(visadolj[0], "click", merMindre); //Koppling av klickfunktionen till visa/döljknappen.
  antalPoangTotal = 0; //Nollställning av totala poängen.
  antalSpel = 0; //Nollställning av antalet spel.
  snittPoang = 0; //Nollställning av genomsnittliga poängen,
  hamtaCookie(); //Kontroll om spelaren varit inne på sidan tidigare, om han/hon har det ersätts totalpoäng och antal spel med värdet som hämtas ur cookien.
  if (antalSpel != 0) {
    //Om antalet spel inte är noll räknas den genomsnittliga poängen ut genom de nya värdena för totala poängen samt antalet spel från cookien.
    snittPoang = Math.round(antalPoangTotal / antalSpel); //Beräkning av genomsnittliga poängen samt avrundning till närmsta heltal med hjälp av math.round.
  }
  antalPoangTotalText.innerHTML = antalPoangTotal; //Utskrift av totala poängen på sidan.
  antalSpelText.innerHTML = antalSpel; //utskrift av antalet spel på sidan.
  snittPoangText.innerHTML = snittPoang; //utskrift av genomsnittliga poängen på sidan.
  spelStorlek.disabled = false; //Aktivering av dropdownmenyn ifall spelaren uppdaterat sidan mitt i en runda och knappen därför är avaktiverad.
}

addListener(window, "load", init); // Aktivering av init sidan laddas in.
addListener(window, "unload", sparaCookie); //Sparande av cookie då sidan stängs ned.

// function för att ta fram alla kort till spelet
function startGame() {
  allaKort = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ];
  blandadeValdaKort = [];
  var i = 0; //Nollställning av räknaren till while loop då denna inte nollställs i while-loopen.
  var j = 0; //Samma som i, j används då den bara skulle fortsätta räkna vidare i while loop nr 2 då i inte nollställs i while-loopen.
  var r; //slumpmässig position
  var tempList = allaKort; //kopia på alla kort array
  var tempLista = []; //kopia på alla valdakort

  // loopen väljer alla bilder som behövs för vald spelstorlek, spelkortens värden kommer efter varandra två och två.
  while (i < spelStorlek.value) {
    r = Math.floor(tempList.length * Math.random()); //slumpmässig position, templistans längd gånger ett tal mellan 0 och 1.
    tempLista.push(tempList[r]); // slänger in nummer r från templist till templista två gånger då varje tal just ska förekomma två gånger i spelet.
    tempLista.push(tempList[r]);
    tempList.splice(r, 1); // tar bort nummer r från tempList(numret bakom r är hur många ska den ta bort efter r), på detta vis blir templist 1 längd kortare för varje gång som loopen körs.
    i++;
  }

  // loopen blandar
  while (j < tempLista.length) {
    var x = Math.floor(tempLista.length * Math.random()); //Ny slumpmässig variabel, precis samma princip som r fast beräknas nu på tempLista som har samtliga karortp efter varandra
    blandadeValdaKort.push(tempLista[x]); // slänger in nummer r från templista till bladadevaldakort som resulterar i att korten blandas.
    tempLista.splice(x, 1); // tar bort nummer r från tempLista(nummer bakom r är hur många ska den ta bort efter r) vilket gör att arrayen hela tiden blir kortare.
    i++;
  }

  //funktionen som skapar spelplanen körs för att säkerställa att nya kort tas fram om spelaren redan spelat en runda och inte ändrat spelplanens storlek.
  spelBord();

  //Loop som kopplar ID från blandadevaldakort till de nya spelkorten samt kopplar klickfunktionen (bildklick) till dem.
  for (i = 0; i < blandadeValdaKort.length; i++) {
    picsLinks[i].setAttribute("id", blandadeValdaKort[i]);
    addListener(picsLinks[i], "click", bildKlick);
  }
  antalKlick = 0; //Nollställer räknaren som håller koll på hur många kort som vänts.
  antalVandor = 0; //Nollstället vändor/omgångar i just detta spel.
  antalVandorText.innerHTML = antalVandor; //skriver ut antal vändor i detta spel (0).
  hittade = 0; //nollställer hur många pat man hittat.
  spelStorlek.disabled = true; //avaktiverar drop-down meny.
  startGameBtn.disabled = true; //avaktiverar startknapp.
  nextBtn.disabled = true; //avaktiverar nästaknapp som kommer aktiveras när två kort har vänts.
}

//Funktion för vad som sker om spelaren klickar på ett kort.
function bildKlick() {
  if (antalKlick == 0 && this.src.indexOf("backside.png") > -1) {
    //kontroll om antalet kort som är vänta är 0 samt om kortet som spelaren klickat på har "backside.png" i sin img src. Om båda stämmer körs koden medan.
    this.src = "pics/" + this.id + ".png"; // Ändrar bildens src till id.png.
    this.className = "brickFront"; // Ändrar klass till klassen för framsida.
    antalKlick += 1; //Räknar upp att ett kort har vänts.
    idOne = this.id; // sätter kortets id till idOne variabel som kommer att jämföras med idTwo när man klickar på next-knappen.
  } else if (antalKlick == 1 && this.src.indexOf("backside") > -1) {
    //Kontroll om spelaren redan klickat på ett kort (om if satsen precis ovanför har körts) och om kortet som spelaren klickat på har backside.png i sin img src. Om båda stämmer körs koden nedan.
    this.src = "pics/" + this.id + ".png"; //samma som ovan.
    this.className = "brickFront"; //samma som ovan.
    antalKlick += 1; //Räknar upp så att 2 kort nu har vänts.
    idTwo = this.id; //sätter kortets id till variabeln idTwo som sen ska jämföras med idOne när man trycker på nästa-knappen.
    antalVandor += 1; //Två kort har vänts, spelaren har alltså spelat igenom en vända.
    antalVandorText.innerHTML = antalVandor; //Skriver ut antalet vändor.
    nextBtn.disabled = false; //Aktivering av nästa knappen.
    if (hittade == spelStorlek.value - 1) {
      //kontroll om antalet hittade par är samma som spelstorlek minus ett (innebär att spelaren senast han klickade på nästa knappen endast hade ett par kvar och därför inte ska spela vidare). Om kravet uppfylls körs koden nedan.
      antalPoang = Math.round(20 - (antalVandor - spelStorlek.value) * 1.2); //Beräkning av poäng som intjänats under rudan och avrundning till närmsta heltal.
      if (antalPoang < 0) {
        //om rundans poäng hamnade på minus ska spelaren få 0 poäng.
        antalPoang = 0;
      }
      antalSpel += 1; //Spelaren har avslutat ett helt spel.
      antalPoangTotal += antalPoang; //Räknar ihop poängen under detta spel med tidigare totala poängen.
      snittPoang = Math.round(antalPoangTotal / antalSpel); //Räknar ut snittpoäng baserat på totala poängen delat med antalet spel och avrundar till närmsta heltal.
      meddelande.innerHTML =
        "Du löste det på " +
        antalVandor +
        " vändor, så det blir " +
        antalPoang +
        " poäng."; //Skriver ut antalet vändor som krävdes för att lösa spelet och hur många poäng spelaren fick.
      antalPoangTotalText.innerHTML = antalPoangTotal; //skriver ut total poäng till högra menyn.
      antalSpelText.innerHTML = antalSpel; //skriver ut nya antalet spel till högra menyn.
      snittPoangText.innerHTML = snittPoang; //skriver ut nya snittpoängen till högra menyn.
      nextBtn.disabled = true; //avaktivering av nästa-knappen.
      startGameBtn.disabled = false; //aktivering av startknapp.
      spelStorlek.disabled = false; //aktivering av dropdown-meny.
    }
  } else {
  }
}

//Funktionen för knappen nästa
function nextStep() {
  if (idOne === idTwo) {
    //Kontroll om idOne motsvarar idTwo, om de är samma innebär att man har hittat ett par. idOne och idTwo definieras då man klickar på bilderna
    for (i = 0; i < 2; i++) {
      // Loop som räknar upp till två (då endast 2 kort kan vändas)
      document.getElementById(idOne).src = "pics/empty.png"; //Ändring av kortens src till empty.png så att de försvinner från spelplanen.
      document.getElementById(idOne).className = "brickEmpty"; //Ändring av klassen så att de muspekarens symbol inte ändras.
      document.getElementById(idOne).id = ""; //Nollställning av brickornas id (krävs därför att loopen är byggd på getElementByID(idOne). Om man ej tar bort skulle den köra loopen två gånger på första brickan eftersom den har idOne).
    }
    antalKlick = 0; //Nollställning av antal kort som vänts så att spelaren kan köra funktionen bildKlick igen (vända två nya kort).
    hittade += 1; //Räknar upp att ett/ett till par har hittats.
  } else if (idOne !== idTwo) {
    //Kontroll om idOne inte är samma som idTwo, spelaren har alltså vänt två olika kort.
    var i;
    var m = document.getElementsByClassName("brickFront"); //Referens till alla kort som har klassen brickFront, skapar en array med två värden.
    for (i = m.length - 1; i >= 0; --i) {
      //for-loop baklänges,Först sätts variabel "i" till arrayens längd minus ett. Detta då en array med 2 värden i sig har värden som har positionen [0] samt positionen [1]. array.length ger värdet 2. Därefter körs loopen så länge värdet är större eller lika med noll och minskar med en (i--) varje gång den gör en loop. I detta fall är värdet 1 när den startar och blir 0 efter första rundan, detta gör att den körs igen, och blir sen -1 vilder som gör att den stannar
      m[i].src = "pics/backside.png"; //Ändring av src till backside.png.
      m[i].setAttribute("class", "brickBack"); // Ändring av klassen till brickBack vilket medför att kortet faller ur variabel m som samlar kort med klassen brickfront. Därmed krävs en for loop som går baklänges!
    }
    antalKlick = 0; //Nollställning av antal kort som vänts så att spelaren kan köra funktionen bildKlick igen (vända två nya kort).
    nextBtn.disabled = true; //avaktivering av knappen next, aktiveras igen när två nya kort har vänts.
  } else {
  }
}

//Funktion för att generera rätt kortmängd på spelbordet.
//If och else if delarna kollar vilka values valen i drop-down menyn har och ställer in bredden på DIV där korten genereras så att det blir korrekt antal i en rad.
function spelBord() {
  if (spelStorlek.value == 10) {
    picsElems.style.width = "350px";
  } else if (spelStorlek.value > 10) {
    picsElems.style.width = "420px";
  } else {
    picsElems.style.width = "280px";
  }
  picsElems.innerHTML = ""; //Tömmer allt i DIV där korten ska genereras
  for (i = 0; i < spelStorlek.value * 2; i++) {
    //Loop som genererar korten, kortens clickfunktion läggs på i startGame och lika så kortens id.
    picsElems.innerHTML +=
      '<img src="pics/backside.png" alt="spelbricka" class="brickBack">'; // += för att innerHTML inte tömmer DIV varje gång, om man skulle sätta bara = skulle man bara få ett kort oavsett hur många gånger loopen körs.
  }
}

//Funktion som skapar visa mer/visa mindre knappens funktion
function merMindre() {
  var x = document.getElementById("userMoreInfo"); //Reverens till DIV som från början är dold.
  if (x.style.display == "none") {
    preventDefault(x);
    x.style.display = "block"; //ändrar DIVs style.display till block som gör att den kommer att visas.
    visadolj[0].innerHTML = "Visa mindre"; //Ändrar texten på länken när menyn har öppnats.
  } else {
    //Om den DIVs style.display inte är dold körs koden nedan.
    preventDefault(x);
    x.style.display = "none"; //Ändra till "none" som döljer DIV.
    visadolj[0].innerHTML = "Visa mer"; //Ändra tillbaka texten till det den var från själva början.
  }
}
function sparaCookie() {
  var a = antalPoangTotal.toString(); //Ändrar Totala poängen som räknas ihop när spelaren spelar till samma nummer fast i en sträng och sparar den till variabel A. 3 blir "3".
  var b = antalSpel.toString(); //samma som ovan fast för antalspel och sparar till variabel B. 2 blir till "2".
  var sparas = a + "#" + b; //Skapar en ny större sträng. Totalpoäng 3 och spel 1 blir till "3#1".
  setCookie("SPELINFO", sparas); //anropar funktionen setCookie i cookie.js och sätter in namnet "SPELINFO" och därefter värdet från sparas, t.ex. "3#1".
}

//Funktion som körs via init och kollar om cookie finns, omd en finns avläses den.
function hamtaCookie() {
  var sparadString;
  var sparadArray;
  sparadString = getCookie("SPELINFO"); //Kollar efter cookie med namnet "SPELINFO" och om den finns säggs strängen in i variabeln sparadString.
  if (sparadString != null) {
    //Om sparadString har tilldelats ett värde på raden ovan körs koden nedan
    sparadArray = sparadString.split("#"); //Klipper strängen i två bitar varje gång den stöder på ett "#" tecken och gör en array av den. Exemplet ovan med "3#1" skulle bli ["3"],["1"].
    antalPoangTotal = parseInt(sparadArray[0]); //parseInt gör en interger (typ nummervärde om jag fattat rätt) av strängen som är sparad i position [0]. Detta nummervärde sparas till variabel antalPoangTotal eftersom cookien kodades i denna följd.
    antalSpel = parseInt(sparadArray[1]); //Samma som raden ovan fast värdet för antalSpel som var nerkodat efter # tecknet i saveCookie och därför fick värdet [1] efter vår härliga split.
  } else {
    //Om sparadString inte tilldelats något värde finns ingen cookie med namnet "SPELINFO" och ingenting ska hända. I praktiken skulle man kunnat sätta antalPoangTotal samt antalSpel till 0 här men jag valde att göra det i init istället.
  }
}

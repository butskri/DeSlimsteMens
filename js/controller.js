var deSlimsteMensApp = angular.module('deSlimsteMensApp', []);

var slimsteQuizen = {};
slimsteQuizen['voorbeeldQuiz.txt'] = voorbeeldQuiz;
slimsteQuizen['deSlimsteMensVan2014.txt'] = dataDeSlimsteMensVan2014Data;
slimsteQuizen['hetSlimsteKindVan2014.txt'] = dataHetSlimsteKindVan2014;

deSlimsteMensApp.controller('DeSlimsteMensCtrl', function ($scope,$timeout,$http) {
  $scope.openWindowCommandFor = function(url) {
	return 'window.open(\'' + url +'\')';
  }
  $scope.mogelijkeQuizzen = [
	{naam: 'Voorbeeld quiz' , url:'voorbeeldQuiz.txt'},
	{naam: 'De slimste mens van 2014' , url:'deSlimsteMensVan2014.txt'},
	{naam: 'Het slimste kind van 2014', url:'hetSlimsteKindVan2014.txt'}
  ];
  $scope.geselecteerdeQuiz = null;
  $scope.deSlimsteData = null;
  $scope.spelers;
  
  $scope.spelersTonen = function() {
	if ($scope.huidigeRonde.spelersTonen == null) {
		return true;
	}
	return $scope.huidigeRonde.spelersTonen();
  }
  
  $scope.titelTonen = function() {
	if (!$scope.huidigeRonde.titelTonen) {
		return true;
	}
	return $scope.huidigeRonde.titelTonen();
  }
  
  $scope.deSlimsteMensBegin = {
	id: 'begin',
	'title': 'De SLIMSTE MENS ter wereld',
	vorigeRonde: function() {
		return $scope.deSlimsteMensBegin;
	},
	volgendeRonde: function() {
		return $scope.drieZesNegenRonde;
	},
	spelersTonen: function() {
		return false;
	}
  }
  $scope.drieZesNegenRonde = {
	id: 'drieZesNegen',
	title: '3 - 6 - 9',
	aantalSecondenVoorJuisteVraag: 0,
	huidigeVraag: 1,
	isStartTimerEnabled: function() {
		return false;
	},
	vorigeRonde: function() {
		return $scope.deSlimsteMensBegin;
	},
	volgendeRonde: function() {
		return $scope.openDeurRonde;
	},
	isVorigeEnabled: function() {
		return this.huidigeVraag > 1;
	},
	isVolgendeEnabled: function() {
		return this.huidigeVraag < 15;
	},
	vorige: function() {
		if (this.isVorigeEnabled()) {
			this.huidigeVraag--;
		}
		this.recalculateAantalSecondenVoorVraag();
	},
	volgende: function() {
		if (this.isVolgendeEnabled()) {
			this.huidigeVraag++;
		}
		this.recalculateAantalSecondenVoorVraag();
	},
	recalculateAantalSecondenVoorVraag: function() {
		if (this.huidigeVraag%3 == 0) {
			this.aantalSecondenVoorJuisteVraag = 10;
		} else {
			this.aantalSecondenVoorJuisteVraag = 0;
		}
	},
	styleClassVoorVraag: function(vraagNr) {
		var nr = vraagNr % 3;
		if (nr == 0) {
			nr = 3;
		}
		var result = 'drieZesNegen' + nr;
		if (vraagNr == this.huidigeVraag) {
			result += " selected";
		}
		return  result;
	},
	getLink: function() {
		if ($scope.deSlimsteData == null) {
			return null;
		}
		if ($scope.deSlimsteData.drieZesNegen == null) {
			return null;
		}
		if ($scope.deSlimsteData.drieZesNegen.links == null) {
			return null;
		}
		return $scope.deSlimsteData.drieZesNegen.links['vraag' + this.huidigeVraag];
	}
  }
  $scope.openDeurRonde = {
	id: 'openDeur',
	title: 'Open deur',
	huidigeVraag: null,
	antwoorden: null,
	isStartTimerEnabled: function() {
		return this.isInModusAntwoord();
	},
	vorigeRonde: function() {
		return $scope.drieZesNegenRonde;
	},
	volgendeRonde: function() {
		return $scope.puzzelRonde;
	},
	toonAntwoorden: function(vraag) {
		if (!$scope.spelers.isSpelerGeselecteerd()) {
			return;
		}
		this.huidigeVraag = vraag;
		this.antwoorden = $scope.toAntwoorden(vraag.antwoorden);
		$scope.startTimer();
	},
	toonAntwoord: function(antwoord) {
		antwoord.gevonden = !antwoord.gevonden;
		var aantalPunten = $scope.bepaalPuntenVoor(antwoord, 20);
		$scope.addSeconds(aantalPunten);
		if (this.alleAntwoordenGevonden()) {
			$scope.stopTimer();
		}
	},
	isInModusOverzicht: function() {
		return this.huidigeVraag == null;
	},
	isInModusAntwoord: function() {
		return this.huidigeVraag != null;
	},
	terugNaarOverzicht: function() {
		this.huidigeVraag = null;
		this.antwoorden = null;
	},
	alleAntwoordenGevonden: function() {
		for (i=0;i < this.antwoorden.length;i++) {
			if (!this.antwoorden[i].gevonden) {
				return false;
			}
		}
		return true;
	},
	getLink: function() {
		if (this.huidigeVraag == null) {
			return null;
		}
		return this.huidigeVraag.link;
	}
  }
  $scope.puzzelRonde = {
	id: 'puzzel',
	title: 'Puzzelronde',
	puzzels: [],
	huidigePuzzel: null,
	startRonde: function() {
		this.puzzels = $scope.deSlimsteData.puzzels;
		for (i=0;i < this.puzzels.length;i++) {
			if (this.puzzels[i].naam == null) {
				this.puzzels[i].naam = 'Puzzel ' + (i+1);
			}
		}
	},
	isStartTimerEnabled: function() {
		return this.isInModusPuzzel();
	},
	vorigeRonde: function() {
		return $scope.openDeurRonde;
	},
	volgendeRonde: function() {
		return $scope.deGalerij;
	},
	isInModusOverzicht: function() {
		return this.huidigePuzzel == null;
	},
	isInModusPuzzel: function() {
		return this.huidigePuzzel != null;
	},
	terugNaarOverzicht: function() {
		this.huidigePuzzel = null;
	},
	startPuzzel: function(puzzel) {
		if (!$scope.spelers.isSpelerGeselecteerd()) {
			return;
		}
		var alleHints = [];
		var result = [];
		for (i=0;i < puzzel.antwoorden.length;i++) {
			antwoord = {omschrijving: puzzel.antwoorden[i].antwoord, gevonden: false, index: i+1, styleClass: 'puzzelAntwoord' + (i+1)};
			for (j=0;j < puzzel.antwoorden[i].hints.length;j++) {
				hint = {
					omschrijving: puzzel.antwoorden[i].hints[j],
					antwoord: antwoord,
					styleClass: function() {
						if (!this.antwoord.gevonden) {
							return '';
						}
						return this.antwoord.styleClass;
					}
				};
				alleHints.push(hint);
			}
			result.push(antwoord);
		}
		this.huidigePuzzel = {
			naam: puzzel.naam,
			antwoorden: result,
			alleHints: this.shuffle(this.shuffle(alleHints))
		};
		$scope.startTimer();
	},
	toonAntwoord: function(antwoord) {
		antwoord.gevonden = !antwoord.gevonden;
		var aantalPunten = $scope.bepaalPuntenVoor(antwoord, 30);
		$scope.addSeconds(aantalPunten);
		if (this.alleAntwoordenGevonden()) {
			$scope.stopTimer();
		}
	},
	alleAntwoordenGevonden: function() {
		for (i=0;i < this.huidigePuzzel.antwoorden.length;i++) {
			if (!this.huidigePuzzel.antwoorden[i].gevonden) {
				return false;
			}
		}
		return true;
	},
	shuffle: function(array) {
		var counter = array.length, temp, index;

		// While there are elements in the array
		while (counter > 0) {
			// Pick a random index
			index = Math.floor(Math.random() * counter);
	
			// Decrease counter by 1
			counter--;

			// And swap the last element with it
			temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}

		return array;
	}
  }
  $scope.deGalerij  = {
	id: 'deGalerij',
	title: 'De galerij',
	indexHuidigeFoto: 0,
	aantalSecondenVoorJuisteVraag: null,
	huidigeGalerij: null,
	overzichtAntwoordenScherm: false,
	antwoorden: [],
	startRonde: function() {
		var galerijen = this.getGalerijen();
		for (i=0;i < galerijen.length;i++) {
			if (!galerijen[i].naam) {
				galerijen[i].naam = 'Galerij ' + (i+1);
			}
		}
	},
	isStartTimerEnabled: function() {
		return this.isGalerijModus() || (this.isOverzichtAntwoordenModus() && !this.alleAntwoordenGevonden());
	},
	vorigeRonde: function() {
		return $scope.puzzelRonde;
	},
	volgendeRonde: function() {
		return $scope.collectiefGeheugen;
	},
	getGalerijen: function() {
		if ($scope.deSlimsteData == null) {
			return [];
		}
		return $scope.deSlimsteData.galerijen;
	},
	startGalerij: function(galerij) {
		if (!$scope.spelers.isSpelerGeselecteerd()) {
			return;
		}
		this.huidigeGalerij = galerij;
		this.indexHuidigeFoto = 1;
		this.antwoorden = [];
		this.aantalSecondenVoorJuisteVraag = 15;
		for (i=0;i < galerij.fotos.length;i++) {
			this.antwoorden[i] = {omschrijving: 'Foto ' + (i+1), gevonden: false};
		}
		$scope.startTimer();
	},
	toonAntwoord: function(antwoord) {
		antwoord.gevonden = !antwoord.gevonden;
		if (antwoord.gevonden) {
			$scope.addSeconds(15);
			if (this.alleAntwoordenGevonden()) {
				$scope.stopTimer();
			}
		} else {
			$scope.addSeconds(-15);
		}
	},
	alleAntwoordenGevonden: function() {
		for (i=0;i < this.antwoorden.length;i++) {
			if (!this.antwoorden[i].gevonden) {
				return false;
			}
		}
		return true;
	},
	overloopGalerij: function(galerij) {
		this.huidigeGalerij = galerij;
		this.indexHuidigeFoto = 1;
	},
	isButtonModus: function() {
		return !this.isGalerijModus() && !this.isOverzichtAntwoordenModus();
	},
	isGalerijModus: function() {
		return this.huidigeGalerij != null && !this.isOverzichtAntwoordenModus();
	},
	isOverzichtAntwoordenModus: function() {
		return this.overzichtAntwoordenScherm;
	},
	isVorigeEnabled: function() {
		return this.isGalerijModus() || this.isOverzichtAntwoordenModus();
	},
	isVolgendeEnabled: function() {
		return this.isGalerijModus() || this.isOverzichtAntwoordenModus();
	},
	juisteAntwoordGegeven: function() {
		this.antwoorden[this.indexHuidigeFoto-1].gevonden = true;
	},
	volgende: function() {
		if (this.isOverzichtAntwoordenModus()) {
			this.stopHuidigeGalerij();
		} else if (this.indexHuidigeFoto == this.huidigeGalerij.fotos.length) {
			this.naarOverzichtAntwoorden();
		} else {
			this.indexHuidigeFoto++;
		}
	},
	vorige: function() {
		if (this.isOverzichtAntwoordenModus()) {
			this.overzichtAntwoordenScherm = false;
		} else if (this.indexHuidigeFoto == 1) {
			this.stopHuidigeGalerij();
		} else {
			this.indexHuidigeFoto--;
		}
	},
	naarOverzichtAntwoorden: function() {
		$scope.stopTimer();
		this.overzichtAntwoordenScherm = true;
	},
	stopHuidigeGalerij: function() {
		$scope.stopTimer();
		this.huidigeGalerij = null;
		this.aantalSecondenVoorJuisteVraag = null;
		this.overzichtAntwoordenScherm = false;
		this.indexHuidigeFoto = 0;
	},
	urlHuidigeFoto: function() {
		if (!this.huidigeGalerij) {
			return '#';
		}
		var baseUrl = this.huidigeGalerij.baseUrl;
		return baseUrl + this.huidigeFoto().url;
	},
	styleClassHuidigeFoto: function() {
		if (this.huidigeFoto() == null) {
			return '';
		}
		if (this.huidigeFoto().verticaleFoto) {
			return 'galerijFoto verticaleFoto';
		}
		return 'galerijFoto horizontaleFoto';
	},
	huidigeFoto: function() {
		if (this.huidigeGalerij == null) {
			return null;
		}
		return this.huidigeGalerij.fotos[this.indexHuidigeFoto-1];
	},
	titelTonen: function() {
		return !this.isGalerijModus();
	}
  }
  $scope.collectiefGeheugen  = {
	id: 'collectiefGeheugen',
	title: 'Collectief Geheugen',
	huidigeVideo: null,
	startRonde: function() {
		var videos = this.getVideos();
		for (i=0;i < videos.length;i++) {
			if (!videos[i].naam) {
				videos[i].naam = 'Video ' + (i+1);
			}
		}
		
	},
	isStartTimerEnabled: function() {
		return this.isAntwoordModus();
	},
	vorigeRonde: function() {
		return $scope.deGalerij;
	},
	volgendeRonde: function() {
		return $scope.deFinale;
	},
	getVideos: function() {
		if ($scope.deSlimsteData == null) {
			return [];
		}
		return $scope.deSlimsteData.collectiefGeheugen.videos;
	},
	startVideo: function(video) {
		window.open(video.urlVideo);
	},
	toonAntwoorden: function(video) {
		if (!$scope.spelers.isSpelerGeselecteerd()) {
			return;
		}
		this.huidigeVideo = {
			antwoorden: $scope.toAntwoorden(video.antwoorden)
		};
		$scope.startTimer();
	},
	isOverzichtModus: function() {
		return this.huidigeVideo == null;
	},
	isAntwoordModus: function() {
		return this.huidigeVideo != null;
	},
	toonAntwoord: function(antwoord) {
		antwoord.gevonden = !antwoord.gevonden;
		var aantalPunten = this.bepaalPuntenVoorAntwoord(antwoord);
		$scope.addSeconds(aantalPunten);
		if (this.alleAntwoordenGevonden()) {
			$scope.stopTimer();
		}
	},
	bepaalPuntenVoorAntwoord: function(antwoord) {
		var aantalJuisteAntwoorden = this.telAantalJuisteAntwoorden();
		if (antwoord.gevonden) {
			return aantalJuisteAntwoorden * 10;
		} else {
			return - (aantalJuisteAntwoorden + 1) * 10;
		}
	},
	telAantalJuisteAntwoorden: function() {
		var aantal = 0;
		for (i=0;i < this.huidigeVideo.antwoorden.length;i++) {
			if (this.huidigeVideo.antwoorden[i].gevonden) {
				aantal++;
			}
		}
		return aantal;
	},
	alleAntwoordenGevonden: function() {
		for (i=0;i < this.huidigeVideo.antwoorden.length;i++) {
			if (!this.huidigeVideo.antwoorden[i].gevonden) {
				return false;
			}
		}
		return true;
	},
	terugNaarOverzicht: function() {
		this.huidigeVideo = null;
	}
  }
  $scope.deFinale  = {
	id: 'deFinale',
	title: 'De Finale',
	indexHuidigeVraag: 0,
	huidigeVraag: null,
	spelersTonen: function() {
		return !this.isSelecteerFinaleSpelersModus();
	},
	teVeelSpelers: function() {
		return $scope.spelers.aantalSpelers() > 2;
	},
	startFinale: function() {
		this.volgende();
	},
	getVragen: function() {
		if ($scope.deSlimsteData == null) {
			return [];
		}
		return $scope.deSlimsteData.finale;
	},
	isStartTimerEnabled: function() {
		return this.huidigeVraag != null && this.huidigeVraag.vraagTonen;
	},
	vorigeRonde: function() {
		return $scope.collectiefGeheugen;
	},
	volgendeRonde: function() {
		if (!$scope.spelers.istGebeurd()) {
			return $scope.deFinale;
		}
		return $scope.oorkonde;
	},
	initHuidigeVraag: function() {
		if (this.indexHuidigeVraag == 0) {
			this.huidigeVraag = null;
			return ;
		}
		var vraag = this.getVragen()[this.indexHuidigeVraag -1];
		this.huidigeVraag = {
			nummer: this.indexHuidigeVraag,
			vraag: vraag.vraag,
			antwoorden: $scope.toAntwoorden(vraag.antwoorden),
			vraagTonen: false
		};
	},
	toonHuidigeVraag: function() {
		if (!$scope.spelers.isSpelerGeselecteerd()) {
			return;
		}
		this.huidigeVraag.vraagTonen = true;
		$scope.startTimer();
	},
	isVorigeEnabled: function() {
		return this.isVragenModus() && this.indexHuidigeVraag != 0;
	},
	isVolgendeEnabled: function() {
		return this.isVragenModus() && (this.indexHuidigeVraag < this.getVragen().length);
	},
	volgende: function() {
		if (this.teVeelSpelers()) {
			return;
		}
		this.indexHuidigeVraag++;
		this.initHuidigeVraag();
	},
	vorige: function() {
		if (this.indexHuidigeVraag != 0) {
			this.indexHuidigeVraag--;
			this.initHuidigeVraag();
		}
	},
	isVragenModus: function() {
		return !this.istGebeurd() && !this.isSelecteerFinaleSpelersModus();
	},
	isSelecteerFinaleSpelersModus: function() {
		return !this.istGebeurd() && (this.indexHuidigeVraag == 0 || this.teVeelSpelers());
	},
	istGebeurd: function() {
		return $scope.spelers.istGebeurd();
	},
	toonAntwoord: function(antwoord) {
		antwoord.gevonden = !antwoord.gevonden;
		var aantalPunten = $scope.bepaalPuntenVoor(antwoord, -20);
		$scope.spelers.voegPuntenToeVoorNietGeselecteerdeSpelers(aantalPunten);
		if (this.alleAntwoordenGevonden()) {
			$scope.stopTimer();
		}
	},
	alleAntwoordenGevonden: function() {
		for (i=0;i < this.huidigeVraag.antwoorden.length;i++) {
			if (!this.huidigeVraag.antwoorden[i].gevonden) {
				return false;
			}
		}
		return true;
	}
  }
  $scope.oorkonde  = {
	id: 'oorkonde',
	title: 'Oorkonde',
	naamWinnaar: 'Volledige naam winnaar',
	oorkondeModus: false,
	spelersTonen: function() {
		return true;
	},
	vorigeRonde: function() {
		return $scope.deFinale;
	},
	volgendeRonde: function() {
		return $scope.oorkonde;
	},
	naarOorkonde: function() {
		this.oorkondeModus = true;
	},
	isNaamModus: function() {
		return !this.oorkondeModus;
	},
	isOorkondeModus: function() {
		return this.oorkondeModus;
	}
  }
  
  $scope.startSpel = function() {
	$scope.setHuidigeRonde($scope.deSlimsteMensBegin);
	$scope.spelers = new Spelers()
	$scope.spelers.add(new Speler('Speler 1'));
	$scope.spelers.add(new Speler('Speler 2'));
	$scope.spelers.add(new Speler('Speler 3'));
  }
  $scope.startQuiz = function() {
	if ($scope.geselecteerdeQuiz == null) {
		return ;
	}
	$scope.deSlimsteData = slimsteQuizen[$scope.geselecteerdeQuiz.url];
	$scope.volgendeRonde();
  }
  $scope.volgendeRonde = function() {
	$scope.setHuidigeRonde($scope.huidigeRonde.volgendeRonde());
  }
  $scope.vorigeRonde= function() {
	$scope.setHuidigeRonde($scope.huidigeRonde.vorigeRonde());
  }
  $scope.setHuidigeRonde = function(nieuweRonde) {
	$scope.huidigeRonde = nieuweRonde;
	if ($scope.huidigeRonde.startRonde) {
		$scope.huidigeRonde.startRonde();
	}
  }
  
  $scope.startSpel();
  $scope.menuHidden = true;
  
  $scope.vorige = function() {
	if (this.isVorigeEnabled()) {
		$scope.huidigeRonde.vorige();
	}
  }
  $scope.volgende = function() {
	if (this.isVolgendeEnabled()) {
		$scope.huidigeRonde.volgende();
	}
  }
  $scope.isVorigeEnabled = function() {
	if (!$scope.huidigeRonde.vorige) {
		return false;
	}
	if ($scope.huidigeRonde.isVorigeEnabled) {
		return $scope.huidigeRonde.isVorigeEnabled();
	}
	return true;
  }
  $scope.isVolgendeEnabled = function() {
	if (!$scope.huidigeRonde.volgende) {
		return false;
	}
	if ($scope.huidigeRonde.isVolgendeEnabled) {
		return $scope.huidigeRonde.isVolgendeEnabled();
	}
	return true;
  }
  
  var geselecteerdeSpelerCountdown = null;
  $scope.isStartTimerEnabled = function() {
	if (geselecteerdeSpelerCountdown != null) {
		return false;
	}
	if (!$scope.spelers.isSpelerGeselecteerd()) {
		return false;
	}
	if ($scope.huidigeRonde.isStartTimerEnabled) {
		return $scope.huidigeRonde.isStartTimerEnabled();
	}
	return true;
  }
  $scope.startTimer = function() {
	if (!$scope.isStartTimerEnabled()) {
		return;
	}
	geselecteerdeSpelerCountdown = $timeout($scope.countDown,1000);
  }
  $scope.stopTimer = function(){
	if (geselecteerdeSpelerCountdown) {
		$timeout.cancel(geselecteerdeSpelerCountdown);
		geselecteerdeSpelerCountdown = null;
	}
  }
  $scope.countDown = function(){
	if ($scope.spelers.istGebeurd() || !$scope.spelers.isSpelerGeselecteerd()) {
		$scope.stopTimer();
	} else {
      $scope.addSeconds(-1);
      geselecteerdeSpelerCountdown = $timeout($scope.countDown,1000);
	}
  }
  $scope.timerIsRunning = function(){
	return geselecteerdeSpelerCountdown != null;
  }
  
  $scope.isAddSecondEnabled = function() {
	return $scope.spelers.isSpelerGeselecteerd();
  }
  $scope.isMinusSecondEnabled = function() {
	return $scope.spelers.isSpelerGeselecteerd();
  }
  $scope.addSecond = function() {
	$scope.addSeconds(1);
  }
  $scope.minusSecond = function() {
	$scope.addSeconds(-1);
  }
  $scope.addSeconds = function(punten) {
	$scope.spelers.voegPuntenToeVoorGeselecteerdeSpeler(punten);
  }
  
  $scope.spelerHeeftJuistGeantwoordIsEnabled = function() {
	return $scope.spelers.isSpelerGeselecteerd() && $scope.huidigeRonde.aantalSecondenVoorJuisteVraag != null;
  }
  
  $scope.spelerHeeftJuistGeantwoord = function() {
    if (!$scope.spelerHeeftJuistGeantwoordIsEnabled()) {
		return;
	}
	$scope.addSeconds($scope.huidigeRonde.aantalSecondenVoorJuisteVraag);
	if ($scope.huidigeRonde.juisteAntwoordGegeven) {
		$scope.huidigeRonde.juisteAntwoordGegeven();
	}
	$scope.huidigeRonde.volgende();
  }
  
  $scope.toAntwoorden = function(antwoorden) {
	var result = [];
	for (i =0;i < antwoorden.length;i++) {
		antwoord = {omschrijving: antwoorden[i], gevonden: false};
		result.push(antwoord);
	}
	return result;
  }
  $scope.bepaalPuntenVoor = function(antwoord, aantalPuntenVoorGevondenAntwoord) {
	if (antwoord.gevonden) {
		return aantalPuntenVoorGevondenAntwoord;
	} else {
		return -aantalPuntenVoorGevondenAntwoord;
	}
  }
  
  $scope.isSwitchSpelerEnabled = function() {
	return $scope.huidigeRonde != $scope.deSlimsteMensBegin;
  }
  $scope.switchSpeler = function() {
	if (!$scope.isSwitchSpelerEnabled()) {
		return;
	}
	$scope.spelers.switchSpeler();
  }
  $scope.isLinkEnabled = function() {
	if ($scope.huidigeRonde.getLink == null) {
		return false;
	}
	return $scope.huidigeRonde.getLink() != null;
  }
  $scope.openLink = function() {
    if (!$scope.isLinkEnabled()) {
		return;
	}
	window.open($scope.huidigeRonde.getLink());
  }

});
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
	aantalSecondenVoorJuisteVraag: 10,
	huidigeVraag: 1,
	vorigeRonde: function() {
		return $scope.deSlimsteMensBegin;
	},
	volgendeRonde: function() {
		return $scope.openDeurRonde;
	},
	vorige: function() {
		if (this.huidigeVraag != 1) {
			this.huidigeVraag--;
		}
	},
	volgende: function() {
		if (this.huidigeVraag != 15) {
			this.huidigeVraag++;
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
	}
  }
  $scope.openDeurRonde = {
	id: 'openDeur',
	title: 'Open deur',
	huidigeVraag: null,
	antwoorden: null,
	vorigeRonde: function() {
		return $scope.drieZesNegenRonde;
	},
	volgendeRonde: function() {
		return $scope.puzzelRonde;
	},
	toonAntwoorden: function(vraag) {
		this.huidigeVraag = vraag;
		this.antwoorden = $scope.toAntwoorden(vraag.antwoorden);
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
	aantalSecondenVoorJuisteVraag: 15,
	huidigeGalerij: null,
	startRonde: function() {
		var galerijen = this.getGalerijen();
		for (i=0;i < galerijen.length;i++) {
			if (!galerijen[i].naam) {
				galerijen[i].naam = 'Galerij ' + (i+1);
			}
		}
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
		$scope.startTimer();
		this.huidigeGalerij = galerij;
		this.indexHuidigeFoto = 1;
	},
	overloopGalerij: function(galerij) {
		this.huidigeGalerij = galerij;
		this.indexHuidigeFoto = 1;
	},
	isButtonModus: function() {
		return !this.isGalerijModus();
	},
	isGalerijModus: function() {
		return this.huidigeGalerij != null;
	},
	volgende: function() {
		if (this.indexHuidigeFoto == this.huidigeGalerij.fotos.length) {
			this.stopHuidigeGalerij();
		} else {
			this.indexHuidigeFoto++;
		}
	},
	vorige: function() {
		if (this.indexHuidigeFoto == 1) {
			this.stopHuidigeGalerij();
		} else {
			this.indexHuidigeFoto--;
		}
	},
	stopHuidigeGalerij: function() {
		$scope.stopTimer();
		this.huidigeGalerij = null;
		this.indexHuidigeFoto = 0;
	},
	urlHuidigeFoto: function() {
		if (!this.huidigeGalerij) {
			return 'geenHuidigeFoto.jpg';
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
		this.huidigeVideo = {
			antwoorden: $scope.toAntwoorden(video.antwoorden)
		};
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
		}
		var vraag = this.getVragen()[this.indexHuidigeVraag -1];
		this.huidigeVraag = {
			nummer: this.indexHuidigeVraag,
			vraag: vraag.vraag,
			antwoorden: $scope.toAntwoorden(vraag.antwoorden)
		};
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
  
  var geselecteerdeSpelerCountdown = null;
  $scope.startTimer = function() {
	if (geselecteerdeSpelerCountdown) {
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
  
  $scope.addSecond = function() {
	$scope.addSeconds(1);
  }
  $scope.minusSecond = function() {
	$scope.addSeconds(-1);
  }
  $scope.addSeconds = function(punten) {
	$scope.spelers.voegPuntenToeVoorGeselecteerdeSpeler(punten);
  }
  
  $scope.spelerHeeftJuistGeantwoord = function() {
	if ($scope.huidigeRonde.aantalSecondenVoorJuisteVraag) {
		$scope.addSeconds($scope.huidigeRonde.aantalSecondenVoorJuisteVraag);
		$scope.huidigeRonde.volgende();
	}
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
});
function Speler (naam) {
    this.name = naam;
    this.score = 60;
	this.geselecteerd = false;
}

Speler.prototype.addPunten = function(punten) {
    this.score += punten;
	if (this.score < 0) {
		this.score = 0;
	}
};

function Spelers() {
	this.spelers = [];
	this.geselecteerdeSpeler = null;
}

Spelers.prototype.selecteer = function(speler) {
	if (this.isSpelerGeselecteerd()) {
		this.geselecteerdeSpeler.geselecteerd = false;
	}
	if (this.geselecteerdeSpeler === speler) {
		this.geselecteerdeSpeler = null;
	} else {
		this.geselecteerdeSpeler = speler;
		this.geselecteerdeSpeler.geselecteerd = true;
	}
};

Spelers.prototype.isSpelerGeselecteerd = function() {
    return this.geselecteerdeSpeler != null;
};

Spelers.prototype.aantalSpelers = function() {
    return this.spelers.length;
};

Spelers.prototype.add = function(speler) {
    this.spelers.push(speler);
};

Spelers.prototype.verwijderGeselecteerdeSpeler = function() {
	if (this.geselecteerdeSpeler != null) {
		this.verwijderSpeler(this.geselecteerdeSpeler);
		executeCommandInChildWindow('updateSpelers', this);
	}
};

Spelers.prototype.verwijderSpeler = function(speler) {
	if (this.geselecteerdeSpeler === speler) {
		this.geselecteerdeSpeler = null;
	}
	if (speler != null) {
		this.spelers.remove(speler);
	}
};

Spelers.prototype.voegPuntenToeVoorNietGeselecteerdeSpelers = function(aantalPunten) {
	if (!this.isSpelerGeselecteerd()) {
		return;
	}
	for (i=0;i < this.spelers.length;i++) {
		if (!this.spelers[i].geselecteerd) {
			this.spelers[i].addPunten(aantalPunten);
		}
	}
};

Spelers.prototype.voegPuntenToeVoorGeselecteerdeSpeler = function(aantalPunten) {
	if (this.isSpelerGeselecteerd()) {
		this.geselecteerdeSpeler.addPunten(aantalPunten);
	}
};

Spelers.prototype.istGebeurd = function() {
	var aantalSpelersMetMeerDan0Punten = 0;
	for (i=0;i < this.spelers.length;i++) {
		if (this.spelers[i].score > 0) {
			aantalSpelersMetMeerDan0Punten++;
		}
	}
	return aantalSpelersMetMeerDan0Punten < 2;
};

Spelers.prototype.switchSpeler = function() {
	var indexTeSelecterenSpeler = this.bepaalIndexGeselecteerdeSpeler() + 1;
	if (indexTeSelecterenSpeler == this.spelers.length) {
		indexTeSelecterenSpeler--;
	}
	this.selecteer(this.spelers[indexTeSelecterenSpeler]);
};

Spelers.prototype.bepaalIndexGeselecteerdeSpeler = function() {
	for (i=0;i < this.spelers.length;i++) {
		if (this.spelers[i].geselecteerd) {
			return i;
		}
	}
	return -1;
}
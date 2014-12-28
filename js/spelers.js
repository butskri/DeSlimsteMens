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

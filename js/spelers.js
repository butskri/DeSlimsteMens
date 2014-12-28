function Speler (naam) {
    this.name = naam;
    this.score = 60;
}

Speler.prototype.addPunten = function(punten) {
    this.score += punten;
	if (this.score < 0) {
		this.score = 0;
	}
};
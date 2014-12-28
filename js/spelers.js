function Speler (naam) {
    this.name = naam;
    this.score = 60;
}
 
Speler.prototype.addPunten = function(punten) {
    this.score += punten;
};
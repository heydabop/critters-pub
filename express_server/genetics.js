function select_random(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}

var specs = ["ball", "ball2", "disk", "duck", "duck2", "plant-nin2", "plant1", "plant2"];


function new_genome(species) {
    return species;
}

function get_species(genome) {
    return genome;
}

function cross_genomes(gen1, gen2) {
    return select_random(specs);
}

function get_starter_species() {
    return ["plant1", "ball"];
}

function get_hue(genome) { return 0; }

function evolve_species(species) {
    var s;

    do {
        s = select_random(specs);
    } while (s === species);

    return s;
}

module.exports = { new_genome: new_genome,
                   get_species: get_species,
                   get_hue: get_hue,
                   cross_genomes: cross_genomes,
                   get_starter_species: get_starter_species,
                   evolve_species: evolve_species
                 }

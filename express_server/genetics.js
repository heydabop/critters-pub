function select_random(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}

function flipACoin() {
    return Math.floor(Math.random() * 2);
}

// The species are determined as follows:
//
// A and D are dominant, b c e f are recessive.
// The AD phenotype is illegal

// Therefore, the species are [A, b, c, bc] x [D, e, f, ef]

// A -> no type
// b -> fire
// c -> plant
// d -> chaos

// D -> no profession
// e -> ninja
// f -> ???
// g -> robot

function dominance(a) {
    if (a[0] == a[1])
        return a[0];
    
    var u1 = (a[0] == a[0].toUpperCase());
    var u2 = (a[1] == a[1].toUpperCase());
    if (u1 && u2)
        if (a[0] > a[1])
            return a[0] + a[1];
        else
            return a[1] + a[0];

    if (u1) return a[0];
    if (u2) return a[1];

    if (a[0] > a[1])
        return a[0] + a[1];
    else
        return a[1] + a[0];
}

var starters = ["fire1", "plant1", "ninja1"];

// fire1 = bbDf-HhHHHH
// plant1 = ccDf-HHHhHH
// ninja1 = Acgg-HHHHHh

function new_genome(species) { //here is a new thingy, make genome
    return {
        "fire1": {
            s0: ['b', 'b'],
            s1: ['D', 'f'],

            h0: ['H', 'h'],
            h1: ['H', 'H'],
            h2: ['H', 'H']
        },
        "plant1": {
            s0: ['c', 'c'],
            s1: ['D', 'f'],

            h0: ['H', 'H'],
            h1: ['H', 'h'],
            h2: ['H', 'H']
        },
        "ninja1": {
            s0: ['A', 'c'],
            s1: ['g', 'g'],

            h0: ['H', 'H'],
            h1: ['H', 'H'],
            h2: ['H', 'h']
        }
    }[species];
}

function get_species(genome) {
    var p0 = dominance(genome.s0);
    var p1 = dominance(genome.s1);
    var lookup0 = {'A':0, 'b':1, 'c':2, 'bc':3}[p0];
    var lookup1 = {'D':0, 'e':1, 'f':2, 'ef':3}[p1];
    // Species Matrix.
    // Row is notype/fire/plant/chaos
    // Col is noprof/ninja/???/robot
    return [
        [undefined, "ninja", "polit", "robot"],
        ["fire", "fire-ninja", "fire-polit", "fire-robot"],
        ["plant", "plant-ninja", "plant-polit", "plant-robot"],
        ["chaos", "chaos-ninja", "chaos-polit", "chaos-robot"]
    ][lookup0][lookup1];
}

function cross_genomes(n1, n2) {
    function cross_gene(g1, g2) {
        return [g1[flipACoin()], g1[flipACoin()]];
    }

    var result = {
        s0: cross_gene(n1.s0, n2.s0),
        s1: cross_gene(n1.s1, n2.s1),
        
        h0: cross_gene(n1.h0, n2.h0),
        h1: cross_gene(n1.h1, n2.h1),
        h2: cross_gene(n1.h2, n2.h2)
    };
    if (get_species(result) === undefined) {
        if (Math.random() >= 0.1)
            return cross_genomes(n1, n2);
        else
            return undefined;
    }

    return result;
}

function get_hue(genome) { return 0; } //return hue number

function evolve_species(species) {
    return species + '2';
    // var s;

    // do {
    //     s = select_random(specs);
    // } while (s === species);

    // return s;
}


module.exports = {
    new_genome: new_genome,
    get_species: get_species,
    get_hue: get_hue,
    cross_genomes: cross_genomes,
    get_starter_species: function () { return starters; },
    evolve_species: evolve_species
}

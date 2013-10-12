function select_random(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
}

function flipACoin() {
    return Math.floor(Math.random() * 2);
}

var specs = ["ball", "ball2", "disk", "duck", "duck2", "plant-nin2", "plant1", "plant2"];


function new_genome(species) { //here is a new thingy, make genome

    var trans = { "plant1": "AbDf",
		"plant2": "cbef" };
		
	var genome = { species : trans[species], hue: 0, colorPattern: 0 };
	genome.exprSpec = getPhenSpec(genome);
	genome.exprHue = getPhenHue(genome);
	genome.exprColorP = getPhenCP(genome);
	return genome;
}

function get_species(genome) { //make species number into string
	  switch(genome.exprSpec)
	  {
	  case 0:
	      return "eoo";
	      break;
	  case 1:
	      return "foo";
	      break;
	  case 2:
	      return "goo";
	      break;
	  case 3:
	      return "hoo";
	      break;
	  case 4:
	      return "ioo";
	      break;
	  case 5:
	      return "joo";
	      break;
	  case 6:
	      return "koo";
	      break;
	  case 7:
	      return "loo";
	      break;
	  case 8:
	      return "moo";
	      break;
	  case 9:
	      return "noo";
	      break;
	  case 10:
	      return "ooo";
	      break;
	  case 11:
	      return "poo";
	      break;
	  case 12:
	      return "qoo";
	      break;
	  case 13:
	      return "roo";
	      break;
	  case 14:
	      return "soo";
	      break;
	  case 15:
	      return "too";
	      break;
    }
}

function cross_spec(gen1, gen2) {
    loc1 = gen1.substr(0,2);
	loc2 = gen1.substr(2,2);
	loc3 = gen2.substr(0,2);
	loc4 = gen2.substr(2,2);
	allele1 = loc1.charAt(flipACoin());
	allele2 = loc2.charAt(flipACoin());
	allele3 = loc3.charAt(flipACoin());
	allele4 = loc4.charAt(flipACoin());
	if(allele1 == allele1.toUpperCase() && allele3 == allele3.toUpperCase())
	{
	if(allele2 == allele2.toUpperCase() && allele4 == allele4.toUpperCase())
	{
	cross_spec(gen1,gen2);
	}
	}
	specresult = allele1 + allele3 + allele2 + allele4;
	genome ={
	species : specresult,
	hue : 0,
	colorPattern : 0,
	exprSpec : 0,
	exprHue : 0,
	exprColorP : 0
	}
	genome.exprSpec = getPhenSpec(genome);
	genome.exprHue = getPhenHue(genome);
	genome.exprColorP = getPhenCP(genome);
	return genome;
}

// function cross_hue(gen1, gen2) {
// loc1 = gen1.substr(0,2);
// loc2 = gen1.substr(2,2);
// loc3 = gen2.substr(0,2);
// loc4 = gen2.substr(2,2);
// allele1 = loc1.charAt(flipACoin());
// allele2 = loc2.charAt(flipACoin());
// allele3 = loc3.charAt(flipACoin());
// allele4 = loc4.charAt(flipACoin());
// specresult = allele1 + allele2 + allele3 + allele4;
// }

// function cross_CP(gen1){
// loc1 = gen1.substr(0,2);
// loc2 = gen1.substr(2,2);
// loc3 = gen2.substr(0,2);
// loc4 = gen2.substr(2,2);
// allele1 = loc1.charAt(flipACoin());
// allele2 = loc2.charAt(flipACoin());
// allele3 = loc3.charAt(flipACoin());
// allele4 = loc4.charAt(flipACoin());
// specresult = allele1 + allele2 + allele3 + allele4;
// }

function get_starter_species() { //return list of starter species
    return ["plant1", "ball"];
}

function get_hue(genome) { return 0; } //return hue number

function getPhenSpec(gen)
{
    var loc1 = gen.species.substr(0,1);
    var loc2 = gen.species.substr(1,1);
    var gen1 = new Array(loc1, loc2);
    var loc3 = gen.species.substr(2,1);
    var loc4 = gen.species.substr(3,1);
    var gen2 = new Array(loc3, loc4);
    gen1.sort();
    gen2.sort();

    if(gen1[0] == gen1[0].toUpperCase())
    {
        phe1 = gen1[0];
    }
    else if(gen1[1] == gen1[1].toUpperCase())
    {
        phe1 = gen1[1];
    }
    else if(gen1[0] === gen1[1])
    {
        phe1 = gen1[0];
    }
    else
    {
        phe1 = gen1[0].concat(gen1[1]);
    }

    if(gen2[0] == gen2[0].toUpperCase())
    {
        phe2 = gen2[0];
    }
    else if(gen2[1] == gen2[1].toUpperCase())
    {
        phe2 = gen2[1];
    }
    else if(gen2[0] === gen2[1])
    {
        phe2 = gen2[0];
    }
    else
    {
        phe2 = gen2[0].concat(gen2[1]);
    }

    gentot=phe1.concat(phe2);
    console.log(gentot);

    switch(gentot)
    {
    case "AD":
        return 0;
        break;
    case "Ae":
        return 1;
        break;
    case "Af":
        return 2;
        break;
    case "Aef":
        return 3;
        break;
    case "bD":
        return 4;
        break;
    case "be":
        return 5;
        break;
    case "bf":
        return 6;
        break;
    case "bef":
        return 7;
        break;
    case "cD":
        return 8;
        break;
    case "ce":
        return 9;
        break;
    case "cf":
        return 10;
        break;
    case "cef":
        return 11;
        break;
    case "bcD":
        return 12;
        break;
    case "bce":
        return 13;
        break;
    case "bcf":
        return 14;
        break;
    case "bcef":
        return 15;
        break;
    default: return 0; break;
    }
}

function getPhenHue(genome)
{ 
    var loc1 = genome.hue.substr(0,1);
    var loc2 = genome.hue.substr(1,1);
    var gen1 = new Array(loc1, loc2);
    var loc3 = genome.hue.substr(2,1);
    var loc4 = genome.hue.substr(3,1);
    var gen2 = new Array(loc3, loc4);
    var loc5 = genome.hue.substr(4,1);
    var loc6 = genome.hue.substr(5,1);
    var gen3 = new Array(loc5, loc6);
    gen1.sort();
    gen2.sort();
    gen3.sort();
    var phe1;
    var phe2;
    if(gen1[0] == toUpperCase(gen1[0]))
    {
        phe1 = gen1[0];
    }
    else 
    {
        phe1 = gen1[1];
    }
    if(gen2[0] == toUpperCase(gen2[0]))
    {
        phe2 = gen2[0];
    }
    else 
    {
        phe2 = gen2[1];
    }if(gen3[0] == toUpperCase(gen3[0]))
    {
        phe3 = gen3[0];
    }
    else 
    {
        phe3 = gen3[1];
    }
    var gentot = phe1 + phe2 + phe3;
    switch(gentot)
    {
    case AAA:
        return 1;
        break;
    case AAa:
        return 2;
        break;
    case AaA:
        return 3;
        break;
    case Aaa:
        return 4;
        break;
    case aAA:
        return 5;
        break;
    case aAa:
        return 6;
        break;
    case aaA:
        return 7;
        break;
    case aaa:
        return 8;
        break;
    }
}


function getPhenCP(genome){ 
    var loc1 = genome.hue.substr(0,1);
    var loc2 = genome.hue.substr(1,1);
    if(loc1 !== loc2)
    {
        var phe =  'd'
    }
    else
    {
        var phe = loc1;
    }
    switch (phe)
    {
    case a:
        return 1;
        break;
    case b:
        return 2
        break;
    case c:
        return 3;
        break;
    case d:
        return 4;
        break;
    }
}

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
                   cross_genomes: cross_spec,
                   get_starter_species: get_starter_species,
                   evolve_species: evolve_species
                 }

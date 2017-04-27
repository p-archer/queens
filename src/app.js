const generationSize = 10;
const boardSize = 8*8;
const geneCount = 8;
const mutationFactor = 1; // 1/1000

let generation = [];

function start() {
	console.log('start clicked');
	console.log(JSON.stringify(initialiseGeneration(), null, 2));
}

function initialiseGeneration() {
	let result = [];
	const cols = Math.sqrt(boardSize); //assuming board is square

	for (let i=0; i<generationSize; i++) {
		let current = {
			genes: [],
			fitness: 0
		};

		for (let j=0; j<geneCount; j++) {
			current.genes.push(j * cols + j); //place queens on the main diagonal
		}

		for (let j=0; j<geneCount; j++) { //randomise queens' positions
			let aIndex = Math.floor(Math.random() * cols);
			let bIndex = Math.floor(Math.random() * cols); //can be the same queen, intentional

			let a = { x: current.genes[aIndex] % cols, y: Math.floor(current.genes[aIndex] / cols) };
			let b = { x: current.genes[bIndex] % cols, y: Math.floor(current.genes[bIndex] / cols) };

			current.genes[aIndex] = a.x + b.y * cols;
			current.genes[bIndex] = a.y * cols + b.x;
		}

		current.genes.sort((a, b) => {
			return a - b;
		});

		current.fitness = getFitness(current.genes);
		result.push(current);
	}

	result.sort((a, b) => {
		return b.fitness - a.fitness;
	});

	show(result[0].genes);
	return result;
}

function findParents(generation) {
}

function createChildren(parents) {
}

function mutate(genes) {
}

function getFitness(genes) {
	const cols = Math.sqrt(boardSize);
	let fitness = 0;

	let columns = []; //counter for columns occupied by queens
	let rows = []; //same for rows

	genes.forEach((g) => {
		columns[g % cols] = 1;
		rows[Math.floor(g / cols)] = 1;
	});

	fitness += Object.keys(columns).length;
	fitness += Object.keys(rows).length;

	//diagonals
	let diagonal = [];
	let counterdiagonal = [];
	for (let i=0; i<genes.length; i++) {
		let x = genes[i] % cols;
		diagonal = genes.filter((g) => {
			return Math.abs(g - x) % (cols + 1) === 0;
		});
		counterdiagonal = genes.filter((g) => {
			return Math.abs(g - x) % (cols - 1) === 0;
		});

		if (diagonal.length === 1) {
			fitness++;
		}
		if (counterdiagonal === 1) {
			fitness++;
		}
	}

	return fitness;
}

function show(genes) {
	const cols = Math.sqrt(boardSize);

	//clear board
	$('.table-container .table .row .tile').removeClass('queen');

	genes.forEach((g) => {
		let column = g % cols;
		let row = Math.floor(g / cols);

		let selector = '.table-container .table .row:nth-child(' + (row+1) + ') .tile:nth-child(' + (column+1) + ')';
		$(selector).addClass('queen');
	});
}

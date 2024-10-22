// DNA Base Array
const dnaBases = ['A', 'T', 'C', 'G'];

// Returns a random DNA base
const returnRandBase = (bases) => {
  return bases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase(dnaBases));
  }
  return newStrand;
};

// Factory Function Specimen Object
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    // Mutate DNA
    mutate() {
      const selectInt = Math.floor(Math.random() * this.dna.length);
      const dnaFiltered = [...new Set(this.dna.filter(
        (base) => base !== this.dna[selectInt]))];
      this.dna[selectInt] = dnaFiltered[Math.floor(
        Math.random() * dnaFiltered.length)];
      return this.dna;
    },
    // Compare DNA
    compareDNA(pAequor) {
      let count = 0;
      const dnaLength = this.dna.length;
      for (let i = 0; i < dnaLength; i++) {
        // console.log(`${i}: ${this.dna[i]} = ${pAequor[i]}: ${this.dna[i] === pAequor[i]}`)
        if (this.dna[i] === pAequor[i]) {
          count ++;
        }
      }
      // console.log(`Specimen #1 and specimen #2 have ${(count / dnaLength * 100).toFixed(2)}% DNA in common.`)
      return (count / dnaLength * 100).toFixed(2);
    },
    // Survivability Likelyhood
    willLikelySurvive() {
      let count = 0;
      for (let item of this.dna) {
        if (item === 'C' || item === 'G') {
          count++;
        }
      }
      if ((count / this.dna.length) >= 0.6) {
        return true;
      } else {
        return false;
      }
    },
    complementStrand() {
      complementArr = []
      for (let char of this.dna) {
        switch (char) {
          case 'A':
            complementArr.push('T');
            break;
          case 'T':
            complementArr.push('A');
            break;
          case 'C':
            complementArr.push('G');
            break;
          case 'G':
            complementArr.push('C');
            break;
          default:
            console.log('error');
        }
      }
      return complementArr;
    }
  }
};

// Create 30 Unique Instances That Will Likely Survive
const pInstances = []
const pUnique = []
let specimenCount = 0
do {
  const specimenObj = pAequorFactory(specimenCount, mockUpStrand());
  const willSurvive = specimenObj.willLikelySurvive();
  const strSpec = specimenObj.dna.join('')
  if (willSurvive) {
    if (!pUnique.includes(strSpec)) {
      pInstances.push(specimenObj)
      pUnique.push(strSpec)
    }
  }
} while (pInstances.length < 30);

// Find The Two Most Related
const twoMostRelated = (arr) => {
  const comparisonArr = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i !== j) {
        const result = arr[i].compareDNA(arr[j].dna);
        const obj = {i: i, j, compare: result};
        comparisonArr.push(obj);
      }
    }
  }
  comparisonArr.sort((a, b) => b.compare - a.compare);
  const mostRelated = comparisonArr[0];
  console.log(`The two most related DNA instances are:
    ${pInstances[mostRelated.i].dna},
    ${pInstances[mostRelated.j].dna},
    with a ${mostRelated.compare}% Match.`)
};

// Tests
console.log(`Unique DNA Instances w/High Survavibilty: ${pInstances.length}`)
twoMostRelated(pInstances);

console.log(`
  Tests:
  `);

const test = pAequorFactory(5, mockUpStrand());
const test2 = pAequorFactory(4, mockUpStrand());
test.compareDNA(test2.dna);
console.log(`DNA Strand: ${test.dna}`);
console.log(`Complementary Strand: ${test.complementStrand()}`);
console.log(`Will Likely Survive: ${test.willLikelySurvive()}`);
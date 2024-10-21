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

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      const selectInt = Math.floor(Math.random() * dna.length);
      let selectedBase = dna[selectInt];
      const dnaFiltered = dna.filter(base => base !== selectedBase)
      
    }
  }
}




console.log(mockUpStrand());




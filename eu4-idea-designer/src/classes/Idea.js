class Idea {
    constructor(nome, level, bonus, custo){
      this.nome = nome;
      this.level = level;
      this.bonus = bonus;
      this.custo = custo;
    }

    update(nome, level, bonus, custo){
      this.nome = nome;
      this.level = level;
      this.bonus = bonus;
      this.custo = custo;
    }

    levelUp(){
      this.level += 1;
    }

    levelDown(){
      this.level -= 1;
    }

    getLevel(){
      return this.level;
    }
}

export default Idea;
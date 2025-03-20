export { World, WorldConstructorParameters }

class WorldConstructorParameters {

    constructor(name) {
        this.name = name;
    }
}

class World {

    constructor(p = {}) {
        this.name = p.name;
    }
}

export default class AdminModel {
    constructor(localEventBus, globalEventBus) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener("AddFilmCheck", this.OnAddFilmCheck.bind(this));
    }

    OnAddFilmCheck(FilmInfo) {
        console.log("trying to add new film")
        const isNormal = true;
        if (isNormal) {
            this.localEventBus.callEvent("FilmAdded");
        } else {
            this.localEventBus.callEvent("FilmAddFailed");
        }
    }
}
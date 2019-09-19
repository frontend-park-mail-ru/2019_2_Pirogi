export default class FilmModel {
    constructor(localEventBus, globalEventBus) {
        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener("ReviewCheck", this.OnReviewCheck.bind(this));

    }

    OnReviewCheck(title, body) {
        console.log("checking review");
        this.localEventBus.callEvent("AddMyNewReview", title, body);
    }

}
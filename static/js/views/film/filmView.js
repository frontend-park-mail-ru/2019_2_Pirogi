import View from "../../libs/view";

export default class FilmView extends View {
    constructor(localEventBus, globalEventBus) {
        super(localEventBus);

        this.localEventBus = localEventBus;
        this.globalEventBus = globalEventBus;

        this.localEventBus.addEventListener("myReviewEvent", this.OnReview.bind(this));
        this.localEventBus.addEventListener("AddMyNewReview", this.AddMyReview.bind(this));
    }

    AddMyReview(title, body) {
        console.log("add new review")
    }

    OnReview() {
        console.log("read data for review");

        const title = "blablabla";
        const body = "blablablablablabla";
        this.localEventBus.callEvent("ReviewCheck", title, body);
    }

    render(root, data = {}) {
        console.log("render film page");

        super.render(root,data);

        document.getElementById('review-submit').addEventListener('click', this.localEventBus.callEvent('myReviewEvent'));
    }

}
import View from "../../libs/view.js"


export default class AdminView extends View {
    constructor(localEventBus, globalEventBus) {
        super(localEventBus);

        this.localEventBus = localEventBus;
        this.globalEvetBus = globalEventBus;

        this.localEventBus.addEventListener("myFilmAddEvent", this.OnFilmAdd.bind(this));
        this.localEventBus.addEventListener("FilmAdded", this.AddNewFilm.bind(this));
        this.localEventBus.addEventListener("FilmAddFailed", this.AddFilmFailed.bind(this));

    }

    AddNewFilm() {
        console.log("new film added");
    }

    AddFilmFailed() {
        console.log("Film adding failed");
    }

    OnFilmAdd() {
        console.log("on adding film");

        const FilmInfo = {
          year: 2019,
          genre:"romance",
        };

        this.localEventBus.callEvent("AddFilmCheck", FilmInfo);
    }

    render(root, data) {
        super.render(root,data);

        document.getElementById("admin-form__button").addEventListener('click', this.localEventBus.callEvent("myFilmAddEvent"));
    }
}
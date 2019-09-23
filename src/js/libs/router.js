export default class Router {
    constructor(root) {
        this.root = root;
        this.routes = new Map();
        this.currentPath = null;
    }

    start() {
        window.addEventListener('popstate', () => {
            this.route(window.location.pathname);
        });

        this.route(window.location.pathname);
    }

    add(path, view, data = {}) {
        this.routes.set(path, { view: view, data: data });
    }

    route(path) {
        if (!this.routes.has(path)) {
            console.log('404');
            this.currentPath = null;
            return;
        }

        if (this.currentPath === path) {
            return;
        }

        const currentData = this.routes.get(this.currentPath);
        if (currentData) {
            currentData.view.close();
            currentData.view.hide();
        }

        if (window.location.pathname !== path) {
            window.history.pushState(null, null, path);
        }

        let route = this.routes.get(path);
        route.view.render(route.data);
        this.currentPath = path;
    }
}

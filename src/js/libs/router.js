const Logger = require('./logger');

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

        this.root.addEventListener('click', (event) => {
            if (event.target.tagName === 'A' && event.target.hostname === location.hostname) {
                event.preventDefault();
                this.route(event.target.pathname);
            }
        });

        this.route(window.location.pathname);
    }

    add(path, view, data = {}) {
        this.routes.set(path, { view: view, data: data });
    }

    route(path) {
        if (!this.routes.has(path)) {
            const log = new Logger();
            log.logError(404, path);
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

        const route = this.routes.get(path);
        this.currentPath = path;
        route.view.render(route.data);
    }
}

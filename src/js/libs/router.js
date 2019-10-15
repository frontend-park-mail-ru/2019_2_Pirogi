const Logger = require('./logger');

/**
 * Creates a new Router
 * @class
 * @type {Router}
 */
export default class Router {
    /**
     * @constructor
     * @param {Element} root
     */
    constructor(root) {
        this.root = root;
        this.routes = new Map();
        this.currentPath = null;
    }

    /**
     * Starts the router
     * @method
     * @listens onclick
     * @listens onpopstate
     */
    start() {
        window.addEventListener('popstate', () => {
            this.route(window.location.pathname);
        });

        this.root.addEventListener('click', (event) => {
            if ((event.target.tagName === 'A') && event.target.hostname === location.hostname ) {
                event.preventDefault();
                const url = new URL(event.target);
                this.route(event.target.pathname, url.searchParams);
            }
        });

        this.route(window.location.pathname);
    }


    /**
     * Add new route to router
     * @method
     * @param {string} path
     * @param {View} view
     * @param {Object} data
     */
    add(path, view, data = {}) {
        this.routes.set(path, { view: view, data: data });
    }

    /**
     * Goes to route
     * @method
     * @param {string} path
     */
    route(path, searchParams = {}) {
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

        if (path === '/film/') {
            const route = this.routes.get(path);
            this.currentPath = path;
            route.view.render({filmID: searchParams.get('filmID')});
            return;
        }

        const route = this.routes.get(path);
        this.currentPath = path;
        route.view.render(route.data);
    }
}

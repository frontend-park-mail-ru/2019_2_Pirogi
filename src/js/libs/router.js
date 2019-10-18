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
            this.route(window.location.pathname, window.location.search);
        });

        this.root.addEventListener('click', (event) => {
            if (event.target.tagName === 'A' && event.target.hostname === location.hostname) {
                event.preventDefault();
                this.route(event.target.pathname, event.target.search);
            }
        });

        this.route(window.location.pathname, window.location.search);
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
    route(path, searchParams = '') {
        if (!this.routes.has(path)) {
            const log = new Logger();
            log.logError(404, path);
            this.currentPath = null;
            return;
        }

        if (this.currentPath === path + searchParams) {
            return;
        }

        const currentData = this.routes.get(this.currentPath);
        if (currentData) {
            currentData.view.close();
            currentData.view.hide();
        }

        if (window.location.href !== path + searchParams) {
            window.history.pushState(null, null, path + searchParams);
        }

        const route = this.routes.get(path);
        if (searchParams !== '') {
            route.data = {};
            const urlSearchRarams = new URLSearchParams(searchParams);
            urlSearchRarams.forEach((value, name) => {
                route.data[name] = value;
            });
        }

        /*if (path === '/film/') {
            const route = this.routes.get(path);
            this.currentPath = path;
            route.view.render({filmID: searchParams.get('filmID')});
            return;
        }*/

        debugger

        this.currentPath = path + searchParams;
        route.view.render(route.data);
    }
}

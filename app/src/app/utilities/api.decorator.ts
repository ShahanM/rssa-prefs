import {environment} from "../../environments/environment";

/***
 *
 * Decorate a class with this to wrap all methods with
 * http functionality. If method returns undefined,
 * arguments are passed directly to handler. Requires
 * an instance of `HttpClient` defined as`http` on target
 * class.
 *
 * @param routes - Object that maps function names to
 * a url path and method.
 *
 * Ex: {'getItems': ['/items', 'GET']}
 *
 */
export function api(routes: any) {
    return (cls: Function) => {
        // get all class methods
        Object.getOwnPropertyNames(cls.prototype)
            .filter((f) => f != 'constructor')
            .forEach((func) => {
                // save old function
                let funcOld = cls.prototype[func];
                // define new function
                cls.prototype[func] = function (...nargs: any) {
                    let [url, method] = routes[func];
                    let args = funcOld(...nargs)
                    // for functions with no body
                    args = args == undefined ? nargs[0] : args[0];
                    // handle parameter based on request type
                    let data = args ? (method == 'GET' ?
                        {'params': args} : {'body': args}) : {};
                    // send http request
                    return this.http.request(method,
                        environment.server + url, data);
                }
            })
    }
}

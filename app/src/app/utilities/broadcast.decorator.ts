/**
 *
 * Decorate a function with this to emit its
 * return values to the emitter defined by
 * `emitterKey`.
 *
 * @param emitterKey - name of the emitter defined
 * in the class.
 *
 */
import {environment} from "../../environments/environment";


export function broadcast(emitterKey: string) {

    return function (
        target: Object, propertyKey: string,
        propertyDescriptor: TypedPropertyDescriptor<any>
    ) {

        let oldFunc = propertyDescriptor.value;
        propertyDescriptor.value = function (...args: any[]) {
            let value = oldFunc.call(this, ...args)
            // only emit if function returns
            if (value) {
                let emitter = (this as any)[emitterKey];
                if (!emitter) {
                    throw new Error(`EmitterKey \"${emitterKey}\" is invalid!
                     ${JSON.stringify(target)}`);
                }

                if (!environment.production) {
                    console.log(value);
                }

                // emit value
                emitter.emit(value);
            }
        }

        return propertyDescriptor;
    }
}
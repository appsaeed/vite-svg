import fs from 'fs';
import path from 'path';

export function toJson(id: string) {
    const filepath = String(id).replace(/\?.*$/, "");
    const content = fs.readFileSync(filepath, "utf-8");
    const attributeRegex = /([^\s=]+)\s*=\s*"(.*?)"/g;
    // Object to store attributes
    const attributes: { [key: string]: any } = {};

    // Match attributes and values using regex
    let match;
    while ((match = attributeRegex.exec(content)) !== null) {
        const attributeName = match[1];
        const attributeValue = match[2];
        attributes[attributeName] = attributeValue;
    }
    return {
        code: `export default ${JSON.stringify(attributes)}`,
        map: null,
    };
}

export function toRaw(id: string) {
    const filepath = String(id).replace(/\?.*$/, "");
    const content = fs.readFileSync(filepath, "utf-8");
    return {
        code: `export default ${JSON.stringify(content)}`,
        map: null,
    };
}

export function toBox(id: string) {
    const filepath = String(id).replace(/\?.*$/, "");
    const content = fs.readFileSync(filepath, "utf-8");
    const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
    const idMatch = content.match(/id="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : "";
    const idAttribute = idMatch ? idMatch[1] : "";
    const url = `${path.basename(filepath)}#${idAttribute}`;

    return {
        code: `export default ${JSON.stringify({
            id: idAttribute,
            viewBox: viewBox,
            url,
        })}`,
        map: null,
    };
}
type Options = {
    default?: 'raw' | 'json' | 'box'
}
export function viteSvg(options: Options = {}) {
    const _default = options?.default || 'json';
    return {
        name: "vite-svg-extract",
        async transform(_src: any, id: string) {

            if (id.endsWith('.svg?json')) {

                return toJson(id)

            } else if (id.endsWith(".svg?raw")) {

                return toRaw(id)

            } else if (id.endsWith(".svg?box")) {

                return toBox(id)

            } else if (id.endsWith('.svg')) {

                switch (_default) {

                    case "json":

                        return toJson(id)

                    case 'box':

                        return toBox(id)

                    case 'raw':

                        return toRaw(id)

                    default:
                        return toBox(id)
                }
            }
        },
    }
}
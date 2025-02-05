import { Tags } from '@babylonjs/core';
import { Selection } from './selection/index';
/**
 * Select all nodes from the scene graph matching the indicator and return it as a
 * instance of Selection.
 *
 * @param name The prefix and text of the selection, selection types include: .\<name>, #\<id>, $\<tags>.
 * @param scene The babylon scene the to select from.
 * @returns an instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export function select(name, scene) {
    let indicator = name[0];
    let text = name.slice(1);
    let selected = [];
    if (indicator === '.') {
        selected = scene.getNodes().filter((node) => node.name == text);
        return new Selection(selected, scene);
    }
    else if (indicator === '#') {
        selected = scene.getNodes().filter((node) => node.id == text);
        return new Selection(selected, scene);
    }
    else if (indicator === '$') {
        selected = scene.getNodes().filter((node) => Tags.MatchesQuery(node, text) == true);
        return new Selection(selected, scene);
    }
    return new Selection([], scene);
}
export function selectName(name, scene) {
    let selected = [];
    Array.isArray(name)
        ? name.forEach((e, i) => (selected = [...selected, ...scene.getNodes().filter((node) => node.name == e)]))
        : (selected = scene.getNodes().filter((node) => node.name == name));
    return new Selection(selected, scene);
}
export function selectId(id, scene) {
    let selected = [];
    Array.isArray(id)
        ? id.forEach((e, i) => (selected = [...selected, ...scene.getNodes().filter((node) => node.name == e)]))
        : (selected = scene.getNodes().filter((node) => node.id == id));
    return new Selection(selected, scene);
}
export function selectTag(tag, scene) {
    let selected = [];
    Array.isArray(tag)
        ? tag.forEach((e, i) => (selected = [...selected, ...scene.getNodes().filter((node) => Tags.MatchesQuery(node, e) == true)]))
        : (selected = scene.getNodes().filter((node) => Tags.MatchesQuery(node, tag) == true));
    return new Selection(selected, scene);
}
export function selectData(key, value, scene) {
    let selected = [];
    Array.isArray(key) && Array.isArray(value)
        ? key.forEach((e, i) => (selected = [
            ...selected,
            ...scene
                .getNodes()
                .filter((node) => node.metadata != null)
                .filter((node) => node.metadata.data[e] == value[i]),
        ]))
        : (selected = scene
            .getNodes()
            .filter((node) => node.metadata != null)
            .filter((node) => node.metadata.data.key == value));
    return new Selection(selected, scene);
}

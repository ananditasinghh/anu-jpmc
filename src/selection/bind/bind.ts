// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import { Node, ActionManager, Tags, Mesh, InstancedMesh } from '@babylonjs/core';
import { Selection } from '../index';
import { create } from '../../create';

/**
 * Take a selection, a shape type, and data. For each index in the data create a new mesh for each node in the selection as the parent.
 * The data index of the mesh is also attached to the mesh node object under the metadata property.
 *
 * @param shape A string of the type of the mesh geometry being created.
 * @param options A object containing the initial mesh parameters for the selected geometry, can be either values or functions.
 * @param data The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data.
 * @returns An instance of Selection, a class containing a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export function bind(this: Selection, shape: string, options: object = {}, data: Array<object> = [{}]): Selection {
  let meshes: Node[] = [];
  this.selected.forEach((node) => {
    data.forEach((element, i) => {
      var mesh = create(shape, shape, options, element, this.scene);
      mesh.setParent(node);
      meshes.push(mesh as Mesh);
    });
  });

  return new Selection(meshes, this.scene);
}

/**
 * Take a selection, a shape type, and data. For each index in the data create a new mesh for each node in the selection as the parrent.
 * The data index of the mesh is also attached to the mesh node object under the metadate property.
 *
 * @param mesh The mesh to create instances from.
 * @param data The data to bind elements too, must be passed as a list of objects where each object represents a row of tabular data.
 * @returns An instance of Selection, a class contating a array of selected nodes, the scene, and the functions of the class Selection,
 * or undefined if a selection could not be made.
 */
export function bindInstance(this: Selection, mesh: Mesh, data: Array<object> = [{}]): Selection {
  let meshes: Node[] = [];
  this.selected.forEach((node) => {
    data.forEach((element, i) => {
      var instance = mesh.createInstance(mesh.name + '_' + i);
      if (mesh instanceof InstancedMesh) mesh.actionManager = new ActionManager(this.scene);
      Tags.EnableFor(instance);
      instance.parent = node;
      instance.metadata = { ...mesh.metadata, data: element };
      meshes.push(instance as InstancedMesh);
    });
  });

  return new Selection(meshes, this.scene);
}

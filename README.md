# Binary Search Trees

Implementación en JavaScript de un Árbol Binario de Búsqueda (BST).

Incluye:
- `Node` y `Tree` clases
- `buildTree(array)` — construye un árbol balanceado desde un array (elimina duplicados y ordena)
- `insert`, `find`, `delete`
- Recorridos: `levelOrder`, `inOrder`, `preOrder`, `postOrder` y sus variantes `*ForEach(callback)` que aceptan callbacks
- `height(node)`, `depth(node)`
- `isBalanced()` y `rebalance()`
- `prettyPrint()` utilidad para visualizar el árbol en consola

Prueba rápida:

```bash
node main.js
```

Esto genera un array aleatorio, construye el árbol, muestra recorridos, añade valores para desbalancearlo y luego rebalancea.

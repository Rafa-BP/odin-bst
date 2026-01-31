function node(data, left, right) {
  return {
    data,
    left,
    right,
  };
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

function tree() {
  return {
    root: null,
    buildTree(array, og) {
      let middle = Math.floor(array.length / 2);
      if (og == undefined) {
        og = array.map((e) => e);
      }
      if (array.length == 0) return;

      let left = this.buildTree(array.splice(0, middle), og);
      let right = this.buildTree(array.splice(1, array.length - 1), og);

      if (og[middle] == array[0]) {
        this.root = node(array[0], left, right);
      }
      return node(array[0], left, right);
    },
    includes(val) {
        return "not now";
    },
    insert(value, node = this.root) {
        if (value == node.data) return false;
        if (value < node.data) {
            if (node.left != undefined) {
                return this.insert(value, node.left);
            };
            node.left = node(value);
        } else if (value > node.data) {
            if (node.right != undefined) {
                return this.insert(value, node.right);
            };
            node.right = node(value);
        }
    },
  };
}

let test = tree();

test.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(test.root);

test.insert("10");

prettyPrint(test.root);
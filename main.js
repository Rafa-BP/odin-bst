function node(data, left, right) {
  return {
    data,
    left,
    right,
  };
}

function removeDuplicates(arr) {
  for (let i = 0; i < arr.length; i++) {
     for (let j = 0; j < arr.length - 1; j++) {
      if (arr[i] == arr[j] && i != j) {
        arr.splice(j, 1);
      };
    }; 
  };
  return arr;
};

function sort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp;
      };
    }; 
  };
  return arr;
};

queue = [];

function tree() {
  return {
    root: null,
    buildTree(array, og) {
      array = sort(removeDuplicates(array));
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
    includes(val, test = this.root) {
      if (test.data == val) return true;
      if ((test.data == undefined) || (test.left == undefined || test.right == undefined)) return;

      let left = this.includes(val, test.left);
      let right = this.includes(val, test.right);

      if (left == true || right == true) return true 
      else return false
    },
    insert(value, test = this.root) {
        if (value == test.data) return false;
        if (value < test.data) {
            if (test.left != undefined) {
                return this.insert(value, test.left);
            };
            test.left = node(value);
        } else if (value > test.data) {
            if (test.right != undefined) {
                return this.insert(value, test.right);
            };
            test.right = node(value);
        }
    },
    deleteItem(value, test = this.root, parent) {
      if (test.data == value) {
        if (test.left == undefined && test.right == undefined) {
          if (parent.left.data == value) return parent.left = undefined;
          if (parent.right.data == value) return parent.right = undefined;
        };
        if (test.left && test.right == undefined) {
          return parent.left = test.left;
        };
        if (test.right && test.left == undefined) {
          return parent.right = test.right;
        };
        copy = test.right;
        parent = test;
        while (copy.left != undefined) {
          parent = copy;
          copy = copy.left;
        };
        test.data = copy.data;
        if (parent.right != undefined)
          if (parent.right.data == copy.data) return parent.right = undefined;
        if (parent.left != undefined)
          if (parent.left.data == copy.data) return parent.left = undefined;
      };
      if (test.left != undefined) {
        this.deleteItem(value, test.left, test);
      } if (test.right != undefined) {
        this.deleteItem(value, test.right, test);
      };
      return;
    },
    levelOrderForEach(callback, test = this.root, debounce = 1) {
      if (!callback) throw new Error("Need callback function!");
      if (debounce == 1) {
        callback(test);
      }
      if (test.left != undefined) queue.push(test.left);
      if (test.right != undefined) queue.push(test.right);

      if (queue.length == 0) return;

      test = queue[0];
      callback(test);
      queue.splice(0, 1);
      this.levelOrderForEach(callback, test, 0);
    },
    preOrderForEach(callback, test = this.root) {
      callback(test)
      if (test.left) this.preOrderForEach(callback, test.left);
      if (test.right) this.preOrderForEach(callback, test.right);
      return;
    },
    inOrderForEach(callback, test = this.root) {
      if (test.left) this.inOrderForEach(callback, test.left);
      callback(test)
      if (test.right) this.inOrderForEach(callback, test.right);
      return;
    },
    postOrderForEach(callback, test = this.root) {
      if (test.left) this.postOrderForEach(callback, test.left);
      if (test.right) this.postOrderForEach(callback, test.right);
      callback(test)
      return;
    },
    height(value, test = this.root, height = 0) {

    },
    depth(value, test = this.root, depth = 0, result = false) {
      if (test.data == value || result == true) return depth, result = true;

      if (test.left && result == false) this.depth(value, test.left, ++depth, false)
      if (test.right && result == false) this.depth(value, test.right, ++depth, false)

      return depth;
    },
  };
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

let test = tree();

test.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);



prettyPrint(test.root)

console.log(test.depth(324))
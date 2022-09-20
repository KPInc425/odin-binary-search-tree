const node = (data) => {
  return {
    root: data,
    leftNode: null,
    rightNode: null,
  }
} 

const tree = (array) => {
  let sortedArray = initializeSortedArray(array);
  // console.log(sortedArray);
  let root = buildTree(sortedArray);

  return root;
}

const buildTree = (array) => {
  // console.log(array);
  // let length = array.length;
  let start = 0;
  let end = array.length;
  let mid = Math.floor(end / 2);
  // Make sure mid selection never goes negative
  if (mid < 0) {
    mid = 0;
  }

  // console.log("Length: " + length);
  // console.log("Start: " + start);
  // console.log("Mid: " + mid);
  // console.log("End: " + end);

  if (start == end) {
    // console.log("Null");
    return null;
  }
  // console.log(array[mid]);
  let root = node(array[mid]);
  // console.log(root);

  let tmpLeftArray = array.slice(start, mid);
  // console.log(tmpLeftArray);

  root.leftNode = buildTree(tmpLeftArray);

  let tmpRightArray = array.slice(mid + 1, end);
  // console.log(tmpRightArray);

  root.rightNode = buildTree(tmpRightArray);

  return root;
}

const insertNode = (tree, value) => {
  // TESTING 
  // console.log("Tree");
  // console.log(tree);
  // console.log("Value: " + value);
  // TESTING

  // reference current node for position
  let currentNode = tree;
  // console.log(currentNode);

  // Base Case if end of BST is reach
  if (tree === null) {
    return tree = node(value);
  }

  // Traverse to left node if value is lower
  if (value < currentNode.root) {
    // Insert into leftNode with null
    currentNode.leftNode = insertNode(currentNode.leftNode, value);
  // Traverse to right node otherwise
  } else {
    // Insert into rightNode with null
    currentNode.rightNode = insertNode(currentNode.rightNode, value);
  } 
  
  // return the tree
  return tree;
}

const deleteNode = (tree, value) => {
  let currentNode = tree;
  // if Value doesn't exist return error
  if (currentNode === null) {
    return console.error("There is no node with that value!");
  // if Match found > check children  
  } else if (currentNode.root === value) {
    // if no children return null
    if (currentNode.leftNode === null && currentNode.rightNode === null) {
      // console.log("No Children");
      return null;
    // if no left children return right child
    } else if (currentNode.leftNode === null) {
      // console.log("1 Child");
      currentNode = currentNode.rightNode;
    // if no right children return left child
    } else if (currentNode.rightNode === null) {
      // console.log("1 Child");
      currentNode = currentNode.leftNode; 

    // if 2 children > find successor(min value on right side node);
    } else {
      // console.log("2 Children");
      // console.log(currentNode.rightNode.root);
      // get min value node on right side of remaining tree
      let successor = getMin(currentNode.rightNode); 
      
      // replace root with successor root
      currentNode.root = successor.root;

      // delete successor node
      successor = deleteNode(currentNode.rightNode, currentNode.root);
    }

    return currentNode;
  
  } else if (value < currentNode.root){
    // if value is lower than current root > traverse down left of BST
    currentNode.leftNode = deleteNode(currentNode.leftNode, value);
  } else {
    // else traverse down right of BST  
    currentNode.rightNode = deleteNode(currentNode.rightNode, value);
  }

  return tree;

}

const find = (tree, value) => {
  let currentNode = tree;
  // console.log("Tree");
  // console.log(currentNode);
  let found = null;
  if (currentNode.root === value) {
    return currentNode;
  }
  if (value < currentNode.root) {
    found = find(currentNode.leftNode, value);
  } else {
    found = find(currentNode.rightNode, value);
  }
  

  return found;
}

const levelOrder = (tree, cb) => {
  let discoveredNodes = [];
  if (tree === null) {
    return null;
  }

  // recursive function to group level values
  const group = (node, level) => {
    // Base condition if node != null
    if (!node) {
      return;
    }

    if (discoveredNodes[level]) {
      // if array already exists > push
      discoveredNodes[level].push(node.root);
    } else {
      // Else set element at level index to new array with node root value
      discoveredNodes[level] = [node.root];
    }
    // Group values recursively
    group(node.leftNode, level + 1);
    group(node.rightNode, level + 1);
  }

  group(tree, 0);

  // Iterative WORKING!
  // let currentNode = tree;
  // let que = queue();
  // que.enqueue(currentNode);
  // while(!que.isEmpty()) {
  //   let current = que.front();
  //   console.log(current);
  //   if (current.leftNode) {
  //     que.enqueue(current.leftNode);
  //   }
  //   if (current.rightNode) {
  //     que.enqueue(current.rightNode);
  //   }
  //   discoveredNodes.push(que.dequeue().root);
  // }

  if (cb) {
    cb();
  } else {
    return discoveredNodes;
  }

}

// Helper functions
const getMin = (tree) => {
  let currentNode = tree;
  if (currentNode.leftNode === null) {
    return currentNode;
  } else {
    currentNode = getMin(currentNode.leftNode);
  }

  return currentNode;
}

const queue = () => {
  let que = [];

  const enqueue = (quedNode) => {
    que.push(quedNode);
    return que;
  }

  const dequeue = () => {
    let dequedNode = que.shift();
    return dequedNode;
  }

  const getQue = () => {
    return que;
  }

  const isEmpty = () => {
    if (getQue().length === 0) {
      return true;
    } else {
      return false;
    }
  }

  const front = () => {
    return getQue()[0];
  }

  return {
    enqueue,
    dequeue,
    getQue,
    isEmpty,
    front,
  }
}

const acending = (a, b) => {
  return a - b;
}

const initializeSortedArray = (array) => {
    // sort array
    let sortedArray = array.sort(acending);
    // convert to set to remove duplicates
    let tmpSet = new Set(sortedArray);
    // Convert back to array
    sortedArray = Array.from(tmpSet); 

    return sortedArray;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.rightNode !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.root}`);
  if (node.leftNode !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// console.log(testTree);

let testTree = tree(testArray);
// console.log(testTree);
// prettyPrint(testTree);

let insertedTree = insertNode(testTree, 52);
insertedTree = insertNode(insertedTree, 4269);
insertedTree = insertNode(insertedTree, 4280);
insertedTree = insertNode(insertedTree, 5269);
insertedTree = insertNode(insertedTree, 6269);


// prettyPrint(insertedTree);

let deletedTree = deleteNode(insertedTree, 4280);

prettyPrint(deletedTree);

// console.log(find(deletedTree, 23));

console.log(levelOrder(deletedTree));
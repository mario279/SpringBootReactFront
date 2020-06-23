import java.lang.*;
class Program {
  public static int findClosestValueInBst(BST tree, int target) {
		int result = helper(tree, target);
    return result;
  }

	public static int helper(BST tree, int target){
		   // Write your code here.
		System.out.println("this is tree value: "+ tree.value);
			System.out.println("this is the target: "+ target);
		
		int cVTC = Math.abs(tree.value-target);
		int cVTL = Math.abs(tree.left.value - target);
		int cVTR = Math.abs(tree.right.value - target);
		int closesValue = tree.value;
		
		System.out.println("this is cVTC: "+ cVTC);
		System.out.println("this is tree.left.value: "+ tree.left.value);
		System.out.println("this is tree.right.value: "+ tree.right.value);
		
		if(target<tree.value && tree.left!=null && cVTL<cVTC){
			helper(tree.left, target);
			System.out.println("im here on left");
		}
		if(target>tree.value && tree.right!=null && cVTR<cVTC){
			helper(tree.right, target);
		}
	
	  System.out.println("returning this: "+ tree.value);
    return (int) tree.value;
	}
  static class BST {
    public int value;
    public BST left;
    public BST right;

    public BST(int value) {
      this.value = value;
    }
  }
}

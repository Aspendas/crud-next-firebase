import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const updatedProduct = await request.json();
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updatedProduct);
    return new Response(JSON.stringify({ id, ...updatedProduct }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update product" }), {
      status: 500,
    });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await deleteDoc(doc(db, "products", id));
    return new Response(JSON.stringify({ id }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete product" }), {
      status: 500,
    });
  }
}

import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

export async function GET(request) {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const newProduct = await request.json();
    const docRef = await addDoc(collection(db, "products"), newProduct);
    return new Response(JSON.stringify({ id: docRef.id, ...newProduct }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to add product" }), {
      status: 500,
    });
  }
}

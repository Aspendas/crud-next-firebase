import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET(request) {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function POST(request) {
  try {
    const newProduct = await request.json();
    const docRef = await addDoc(collection(db, "products"), newProduct);
    return new Response(
      JSON.stringify({ id: docRef.id, createdAt: Date.now(), ...newProduct }),
      {
        status: 201,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return new Response(JSON.stringify({ error: "Failed to add product" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

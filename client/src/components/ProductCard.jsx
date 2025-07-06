export default function ProductCard({ product, onDelete }) {
  return (
    <div className="border p-4 rounded shadow">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-32 w-full object-cover"
      />
      <h2 className="font-bold">{product.name}</h2>
      <p>Price: ₹{product.price}</p>
      <p className="text-xs text-gray-500">Added by: {product.addedBy}</p>
      <button
        className="text-red-600 mt-2"
        onClick={() => onDelete(product.id)}
      >
        Delete
      </button>
    </div>
  );
}

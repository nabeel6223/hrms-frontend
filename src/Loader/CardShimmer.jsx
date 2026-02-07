import "./styles.css";

export function CardShimmer() {
  return (
    <div className="card-shimmer w-full">
      <div className="line title shimmer" />
      <div className="line shimmer" />
      <div className="line small shimmer" />
    </div>
  );
}

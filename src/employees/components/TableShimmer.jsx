const TableShimmer = ({ rows = 5, columns = 5 }) => {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr key={rowIdx} className="animate-pulse">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <td key={colIdx} className="px-4 py-3">
              <div className="h-4 bg-gray-200 rounded w-full" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableShimmer;
